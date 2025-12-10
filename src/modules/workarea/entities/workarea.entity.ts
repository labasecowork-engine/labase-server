export interface WorkAreaEntity {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  created_at: Date;
  updated_at: Date;
}
