#!/bin/bash
# ロボットレンタル本番セットアップ(検証強化版)
# usage: run-stripe-setup.sh <key-file>
set -euo pipefail
REPO="/Users/user/Desktop/スクリーンショット/clearai-corporate"
KEY_FILE="${1:?usage: run-stripe-setup.sh <key-file>}"
K=$(tr -d ' \r\n' < "$KEY_FILE")
api() {
  local m="$1" p="$2"
  shift 2
  if [ "$#" -gt 0 ]; then
    local args=()
    for d in "$@"; do args+=(-d "$d"); done
    curl -s -X "$m" "https://api.stripe.com/v1/$p" -u "$K:" "${args[@]}"
  else
    curl -s -X "$m" "https://api.stripe.com/v1/$p" -u "$K:"
  fi
}
ok() { python3 -c "import json,sys;d=json.load(sys.stdin);sys.exit(1 if 'error' in d else 0)"; }

echo "=== 1) キー権限のカナリア検証 ==="
CU=$(api POST customers "description=perm-canary")
echo "$CU" | ok || { echo "customers.write NG: $CU"; exit 1; }
CID=$(echo "$CU" | python3 -c "import json,sys;print(json.load(sys.stdin)['id'])")
echo "customers.write OK ($CID)"

VS=$(api POST identity/verification_sessions "type=document" "related_customer=$CID")
echo "$VS" | ok || { api DELETE "customers/$CID" >/dev/null; echo "identity.write NG: $VS"; exit 1; }
VSID=$(echo "$VS" | python3 -c "import json,sys;print(json.load(sys.stdin)['id'])")
api POST "identity/verification_sessions/$VSID/cancel" >/dev/null
echo "identity.write OK ($VSID → canceled)"

CS=$(api POST checkout/sessions \
  "mode=payment" \
  "customer=$CID" \
  "line_items[0][quantity]=1" \
  "line_items[0][price_data][currency]=jpy" \
  "line_items[0][price_data][unit_amount]=100" \
  "line_items[0][price_data][product_data][name]=permission-canary" \
  "success_url=https://clearai.jp/robot-rental" \
  "cancel_url=https://clearai.jp/robot-rental")
echo "$CS" | ok || { api DELETE "customers/$CID" >/dev/null; echo "checkout.sessions.write NG: $CS"; exit 1; }
CSID=$(echo "$CS" | python3 -c "import json,sys;print(json.load(sys.stdin)['id'])")
api POST "checkout/sessions/$CSID/expire" >/dev/null
api DELETE "customers/$CID" >/dev/null
echo "checkout.sessions.write OK (カナリアは期限切れ・顧客削除済み)"

echo "=== 2) Webhookエンドポイント作成(重複排除) ==="
EXIST=$(api GET "webhook_endpoints?limit=100")
echo "$EXIST" | ok || { echo "webhook_endpoints.read NG: $EXIST"; exit 1; }
for old in $(echo "$EXIST" | python3 -c "
import json,sys
for e in json.load(sys.stdin)['data']:
    if e['url']=='https://clearai.jp/api/stripe/webhook': print(e['id'])"); do
  echo "既存の同一URL endpoint $old を削除"
  api DELETE "webhook_endpoints/$old" >/dev/null
done
WH=$(api POST webhook_endpoints \
  "url=https://clearai.jp/api/stripe/webhook" \
  "enabled_events[]=identity.verification_session.verified" \
  "enabled_events[]=checkout.session.completed" \
  "description=clearai.jp robot rental")
WHSEC=$(echo "$WH" | python3 -c "import json,sys;print(json.load(sys.stdin).get('secret',''))")
[ -n "$WHSEC" ] || { echo "Webhook作成失敗: $WH"; exit 1; }
echo "webhook作成 OK"

echo "=== 3) Vercel環境変数 ==="
cd "$REPO"
for v in STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET NEXT_PUBLIC_ROBOT_RENTAL_APPLICATION_ENABLED; do
  vercel env rm "$v" production --yes 2>/dev/null || true
done
printf '%s' "$K" | vercel env add STRIPE_SECRET_KEY production
printf '%s' "$WHSEC" | vercel env add STRIPE_WEBHOOK_SECRET production
printf 'true' | vercel env add NEXT_PUBLIC_ROBOT_RENTAL_APPLICATION_ENABLED production
echo "env 3件設定 OK"

echo "=== 4) 本番デプロイ ==="
vercel --prod --yes
echo "=== 完了 ==="
