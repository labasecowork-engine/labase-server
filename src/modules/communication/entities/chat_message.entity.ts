export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  created_at: Date;
}

export interface ChatMessageWithUser extends ChatMessage {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
    user_type: string | null;
  };
}