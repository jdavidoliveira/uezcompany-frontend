"use client"

import api from "@/lib/api"
import { USERTYPE } from "@/types/entities/enums"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"
import { ExternalToast, toast } from "sonner"

type ContactUserButtonProps = ComponentProps<"button"> & {
  usertype: USERTYPE
  userid: string
}

export function ContactUserButton(props: ContactUserButtonProps) {
  const router = useRouter()

  async function handleContactUser() {
    // const { status, data } = await api
    //   .post(`/chat/create/${id}`)
    //   .then((res) => res)
    //   .catch((err: AxiosError) => ({ ...err, data: err.response?.data }))

    // if (status !== 201) return router.push(`/chat?userChatId=${id}`)

    // return router.push(`/chat?userChatId=${data.id}`)
    toast("Em breve")
  }

  return (
    <button
      onClick={handleContactUser}
      {...props}
      title="Contate este usuário"
      className="h-full rounded-lg bg-[#535FFF] px-24 text-xl font-semibold text-white"
    >
      Contate já
    </button>
  )
}

export function ContactUserButtonStyle({
  text = "Faça login para contatar este usuário",
  data,
}: {
  text?: string | React.ReactNode
  data?: ExternalToast
}) {
  const router = useRouter()

  async function handleContactUser() {
    toast(
      text,
      !data ? { action: { label: "Logar", onClick: () => router.push("/login?redirectToLastPage=true") } } : data,
    )
  }

  return (
    <button
      onClick={handleContactUser}
      title="Contate este usuário"
      className="h-full rounded-lg bg-[#535FFF] px-24 text-xl font-semibold text-white"
    >
      Contate já
    </button>
  )
}
