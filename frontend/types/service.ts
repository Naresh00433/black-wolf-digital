export interface Service {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  content: string;
  icon?: string | null;
  image?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}