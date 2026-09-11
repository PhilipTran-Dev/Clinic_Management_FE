import { useState, useCallback } from "react";
import type { KnowledgeDocument } from "../data/adminMockData";
import { MOCK_KNOWLEDGE_BASE } from "../data/adminMockData";

export function useKnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(MOCK_KNOWLEDGE_BASE);
  const [isReindexing, setIsReindexing] = useState(false);
  const [reindexProgress, setReindexProgress] = useState(0);

  const addDocument = useCallback((doc: KnowledgeDocument) => {
    setDocuments((prev) => [...prev, doc]);
  }, []);

  const deleteDocument = useCallback((docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  }, []);

  const triggerReindex = useCallback(() => {
    setIsReindexing(true);
    setReindexProgress(0);
    const interval = setInterval(() => {
      setReindexProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReindexing(false);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 400);
  }, []);

  return {
    documents,
    isReindexing,
    reindexProgress: Math.min(reindexProgress, 100),
    addDocument,
    deleteDocument,
    triggerReindex,
  };
}
