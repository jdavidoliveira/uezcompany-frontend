import { Client } from "./Client"
import { Speciality } from "./Speciality"
import { Uezer } from "./Uezer"

export type Order = {
  id: string
  specialityId: string
  title: string
  description: string
  status: OrderStatus
  available: boolean
  created_at: string
  end_date: string | null
  value: number
  images: string[]
  rating: number
  rated: boolean
  clientId: string
  uezerId: string
  speciality: Speciality
}

export type OrderWithClient = {
  id: string
  specialityId: string
  title: string
  description: string
  status: OrderStatus
  available: boolean
  created_at: string
  end_date: string | null
  value: number
  images: string[]
  rating: number
  rated: boolean
  clientId: string
  uezerId: string
  speciality: Speciality
  client: Client
}

export type OrderDetailed = Order & {
  client: Client
  uezer: Uezer
}

export type OrderStatus = "OPEN" | "CANCELLED" | "IN_PROGRESS" | "WAITING_EVALUATION" | "COMPLETED"
