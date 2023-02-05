export type TMessage = {
  user: TUser;
  content: string;
  is_unread: boolean;
  date: number;
};

export type TUser = {
  name: string;
};

export type TInbox = {
  subject: string;
  participants: TUser[];
  latest_message: TMessage;
};

export type TConversationHistory = TMessage[];
