import AgentTrainingPage, { agentTrainingMetadata } from "@/components/AgentTrainingPage";

export const metadata = agentTrainingMetadata("claude-code");

export default function ClaudeCodeTrainingPage() {
  return <AgentTrainingPage tool="claude-code" />;
}
