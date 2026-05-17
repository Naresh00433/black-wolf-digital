export interface DashboardStats {
  blogs: {
    total: number;
    published: number;
    draft: number;
  };
  services: {
    total: number;
    active: number;
  };
  leads: {
    total: number;
    new: number;
    contacted: number;
    converted: number;
  };
}