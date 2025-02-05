import { STATUS, USERTYPE } from "../enums"

export type User = {
  id: string
  username: string
  name: string
  email: string
  usertype: USERTYPE
  status: STATUS
  block_reason?: string
  image: string
  banner?: string
  bio?: string
  phone?: string
  birth_date: string
  last_online?: Date
  last_login?: Date
  created_at: Date
  orders_amount?: number
  completed_orders_amount?: number
  speciality?: Speciality
  specialityId?: string
  rating: number
  ratings: number[]
  owner_orders: Order[]
  assigned_orders: Order[]
  chats: Chat[]
  notifications: Notification[]
  password?: string
}

export interface Speciality {
  id: string
}

export interface Order {
  id: string
}

export interface Chat {
  id: string
}

export interface Notification {
  id: string
}
