export interface Article {
  id: string;
  userId: string;
  title: string;
  content: string;
  banner: string;
  categoryId: string;
  readingTime: number;
  publicationTimestamp: Date | null;
  resume?: string | null;
  status: "pending" | "accepted" | "rejected";
}
