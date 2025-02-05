import { ChildProcessWithoutNullStreams } from "child_process"
import { STATUS, USERTYPE } from "./enums"
import { SimpleSpeciality } from "./Speciality"

export interface Client {
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
  address: string | ChildProcessWithoutNullStreams
  rating: number
  created_at: string
}

export interface SimpleClient
  extends Pick<Client, "id" | "username" | "name" | "usertype" | "status" | "image" | "rating"> {
  speciality: SimpleSpeciality
}
