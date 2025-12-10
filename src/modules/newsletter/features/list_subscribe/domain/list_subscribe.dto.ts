export interface SubscriberDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface ListSubscribeResponseDTO {
  subscribers: SubscriberDTO[];
  total: number;
  count: number;
}
