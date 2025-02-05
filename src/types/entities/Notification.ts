export interface Notification {
  id: string
  type: string
  content: string
  created_at: string | Date
  readed: boolean
  receiverId: string
}
