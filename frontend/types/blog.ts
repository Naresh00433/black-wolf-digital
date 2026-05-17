export interface Blog {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  content: string;
  featuredImage?: string | null;
  category?: string | null;
  tags?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}