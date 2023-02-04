export type TMessage = {
  user: TUser
  content: string
}

export type TUser = {
  name: string
}

export type TInbox = {
  subject: string
  is_unread: boolean
  participants: TUser[]
  latest_message: TMessage
  date: number
}
