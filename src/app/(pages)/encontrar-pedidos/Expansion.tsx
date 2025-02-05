"use client"

import { OrderWithClient } from "@/types/entities/Order"
import { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import LoadingSpinner from "@/components/layout/LoadingSpinner"
import Rating from "@/components/layout/Rating"
import { translateOrderStatus } from "@/utils/translateOrderStatus"
import { twMerge } from "tailwind-merge"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { OrderCardExpanded } from "@/components/sections/OrderCardExpanded"

interface OrderCardExpandedProps {
  onClose: () => void
  order: OrderWithClient
}

export default function Expansion({ onClose, order }: OrderCardExpandedProps) {
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()

  async function handleCallClient(e: FormEvent) {
    e.preventDefault()
    if (session.data?.user.usertype === "CLIENT") {
      return toast("Somente um uezer pode chamar um cliente.")
    }
    toast("Cliente chamado")
    //chamar cliente
  }

  return (
    <>
      <OrderCardExpanded.Container onClose={onClose} order={order}>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <OrderCardExpanded.Aside order={order}>
            {order.status === "OPEN" && session.status === "authenticated" && (
              <OrderCardExpanded.Button
                onClick={handleCallClient}
                className="disabled:cursor-not-allowed disabled:grayscale disabled:hover:bg-primary-purple"
                title={
                  session.data?.user.usertype === "CLIENT"
                    ? "Somente um uezer pode chamar um cliente."
                    : "Chamar pedido"
                }
                disabled={session.data?.user.usertype === "CLIENT"}
              >
                Chamar Cliente
              </OrderCardExpanded.Button>
            )}
          </OrderCardExpanded.Aside>
        )}
      </OrderCardExpanded.Container>
    </>
  )
}
