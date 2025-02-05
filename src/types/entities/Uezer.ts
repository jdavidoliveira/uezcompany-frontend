import { STATUS, USERTYPE } from "./enums"
import { Speciality, SimpleSpeciality } from "./Speciality"

export interface Uezer {
  id: string
  username: string
  name: string
  email: string
  usertype: USERTYPE
  status: STATUS
  block_reason: string | null
  image: string
  banner: string
  bio: string
  phone: string | null
  birth_date: string
  last_online: string
  last_login: string
  address: string | null
  orders_amount: number | null
  completed_orders_amount: number | null
  rating: number
  created_at: string
  speciality: Speciality
}

export interface SimpleUezer
  extends Pick<
    Uezer,
    | "id"
    | "username"
    | "name"
    | "usertype"
    | "status"
    | "image"
    | "orders_amount"
    | "completed_orders_amount"
    | "rating"
  > {
  speciality: SimpleSpeciality
}
