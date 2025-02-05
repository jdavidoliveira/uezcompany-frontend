"use client"

import { Order, OrderDetailed } from "@/types/entities/Order"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import EditOrderOverlay from "./EditOrder"
import { X } from "lucide-react"
import Image from "next/image"
import api from "@/lib/api"
import LoadingSpinner from "@/components/layout/LoadingSpinner"
import Rating from "@/components/layout/Rating"
import { translateOrderStatus } from "@/utils/translateOrderStatus"
import { twMerge } from "tailwind-merge"
import { OrderCardExpanded } from "@/components/sections/OrderCardExpanded"

interface OrderCardExpandedProps {
  onClose: () => void
  order: Order
}

export default function Expansion({ onClose, order }: OrderCardExpandedProps) {
  const [showEditOrderOverlay, setShowEditOrderOverlay] = useState(false)

  const [orderDetailed, setOrderDetailed] = useState<OrderDetailed>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await api(`/orders/${order.id}`)
        setOrderDetailed(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrderDetails()
  }, [])

  return (
    <>
      <OrderCardExpanded.Container onClose={onClose} order={order}>
        {isLoading || !orderDetailed ? (
          <div className="flex h-full w-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <OrderCardExpanded.Aside order={orderDetailed}>
            {order.status === "OPEN" && (
              <button
                onClick={() => setShowEditOrderOverlay(true)}
                className="w-3/4 rounded-xl bg-primary-purple p-2.5 text-lg text-white transition-colors hover:bg-primary-purple/75"
                title="Editar pedido"
              >
                Editar pedido
              </button>
            )}
          </OrderCardExpanded.Aside>
        )}
      </OrderCardExpanded.Container>
      {showEditOrderOverlay && <EditOrderOverlay order={order} onClose={() => setShowEditOrderOverlay(false)} />}
    </>
  )
}
