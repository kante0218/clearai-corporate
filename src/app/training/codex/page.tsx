import AgentTrainingPage, { agentTrainingMetadata } from "@/components/AgentTrainingPage";

export const metadata = agentTrainingMetadata("codex");

export default function CodexTrainingPage() {
  return <AgentTrainingPage tool="codex" />;
}
