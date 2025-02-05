import { Order, OrderWithClient } from "@/types/entities/Order"
import React from "react"
import { OrderCard } from "./OrderCard"

interface OrderContainerProps {
  orders: OrderWithClient[]
}

export default function OrderContainer({ orders }: OrderContainerProps) {
  return (
    <div className="my-10 grid w-full grid-cols-1 gap-4 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:px-28">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  )
}
