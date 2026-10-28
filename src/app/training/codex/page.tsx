import { agentTrainingMetadata } from "@/components/AgentTrainingPage";

import CodexTrainingPage from "@/components/CodexTrainingPage";

export const metadata = agentTrainingMetadata("codex");

export default function Page() {
  return <CodexTrainingPage />;
}
