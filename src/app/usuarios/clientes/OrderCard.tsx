"use client"

import { Order } from "@/types/entities/Order"
import { Megaphone } from "lucide-react"
import { useState } from "react"
import OrderCardExpanded from "./Expansion"

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  return (
    <>
      <div
        onClick={() => setShowOrderDetails(true)}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border bg-white p-4 shadow-md duration-200 hover:scale-105"
      >
        <div>
          <h3 className="text-sm font-bold">{order.title}</h3>
          <p className="pb-4 text-sm text-gray-500">{order.speciality.name}</p>
          <span className="mt-1 inline-flex items-center rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
            <Megaphone size={18} className="mr-1" />
            {order.speciality.profession.name}
          </span>
        </div>
        <div className="mt-16 flex gap-2">
          <span className="font-semibold text-gray-700">R$ {order.value.toFixed(2)}</span>
        </div>
      </div>
      {showOrderDetails && <OrderCardExpanded order={order} onClose={() => setShowOrderDetails(false)} />}
    </>
  )
}
