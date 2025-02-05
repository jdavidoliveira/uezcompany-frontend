export interface Speciality {
  id: string
  name: string
  type: "ONLINE"
  description: string
  default_tax: number
  completed_orders_amount: number
  profession: Profession
}

export interface Profession {
  id: string
  name: string
}

export interface SimpleSpeciality {
  id: string
  name: string
}
