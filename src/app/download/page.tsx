import DownloadPageContent from "@/components/DownloadPageContent";
import { DOCUMENT_KEYS } from "@/lib/validators";

export default async function DownloadPage({ searchParams }: { searchParams: Promise<{ document?: string }> }) {
  const { document } = await searchParams;
  const initialDocument = DOCUMENT_KEYS.find(key => key === document);
  return <DownloadPageContent initialDocument={initialDocument} />;
}
