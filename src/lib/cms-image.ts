/** Resize at the existing CMS CDN so the app does not fetch the original first. */
export function cmsImage(url: string, width: number) {
  try {
    const image = new URL(url);
    if (image.hostname !== "images.microcms-assets.io" || image.pathname.toLowerCase().endsWith(".svg")) return url;
    image.searchParams.set("w", String(width));
    image.searchParams.set("fm", "webp");
    image.searchParams.set("q", "80");
    return image.toString();
  } catch { return url; }
}
