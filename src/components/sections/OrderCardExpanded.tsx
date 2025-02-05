import React, { ComponentProps } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Order, OrderWithClient } from "@/types/entities/Order"
import Image from "next/image"
import { getProfessionIconByName } from "@/utils/getProfessionIconByName"
import { twMerge } from "tailwind-merge"
import { translateOrderStatus } from "@/utils/translateOrderStatus"
import Rating from "../layout/Rating"

interface CommonComponent {
  children: React.ReactNode
}

const Container = ({
  children,
  onClose,
  order,
}: CommonComponent & { onClose: () => void; order: Order | OrderWithClient }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65"
    >
      <div className="relative flex min-h-[50%] w-11/12 flex-col items-center justify-center gap-8 rounded-lg bg-white p-8 md:h-[50%] md:flex-row md:gap-0">
        <button
          onClick={onClose}
          className="absolute right-2 top-2  text-black hover:text-gray-700 md:right-4 md:top-4"
        >
          <X className="size-10 md:size-6" />
        </button>
        <div className="flex h-full w-full flex-col gap-2 pr-4 md:w-[60%] lg:w-[70%]">
          <h1 className="text-xl font-bold">{order.title}</h1>
          <p className="text-lg font-bold text-black/50">R${order.value.toFixed(2)}</p>
          <div className="flex w-fit items-center justify-center gap-2">
            <Image
              src={getProfessionIconByName(order.speciality.profession.name, true)}
              alt={order.speciality.profession.name}
              width={120}
              height={120}
              className="w-8"
              title={order.speciality.profession.name}
            />
            <p className="text-lg">{order.speciality.name}</p>
          </div>
          <div className="mt-6 flex flex-col">
            <h2 className="mb-2 text-lg font-bold">Descrição</h2>
            <p className="text-md max-h-60 overflow-y-auto px-2 font-medium md:max-h-40">{order.description}</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-start border-t pt-8 md:w-[40%] md:border-l md:border-t-0 md:pt-0 lg:w-[30%]">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

const Aside = ({ children, order }: CommonComponent & { order: OrderWithClient }) => {
  return (
    <>
      <div className="mb-4 flex w-3/4 items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={order.client.image}
            alt={order.client.name}
            width={120}
            height={120}
            className="w-16 rounded-full border"
          />
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold">{order.client.name}</h3>
            <span className="text-md flex items-center justify-center gap-2">
              {order.client.rating ? order.client.rating.toFixed(1) : 0}
              <Rating rating={order.client.rating} size={16} showRating={false} />
            </span>
          </div>
        </div>
      </div>
      <span
        className={twMerge(
          "mb-10 flex w-3/4 items-center justify-center rounded-xl px-2.5 py-1 text-center font-medium",
          `text-status-${order.status}`,
          `bg-status-${order.status}/30`,
        )}
      >
        {translateOrderStatus(order.status)}
      </span>
      {children}
    </>
  )
}

const Button = ({ children, ...props }: CommonComponent & ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={twMerge(
        "w-3/4 rounded-xl bg-primary-purple p-2.5 text-lg text-white transition-colors hover:bg-primary-purple/75",
        props.className,
      )}
    >
      {children}
    </button>
  )
}

export const OrderCardExpanded = { Container, Aside, Button }
