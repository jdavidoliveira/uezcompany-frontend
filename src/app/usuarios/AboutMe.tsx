"use client"

import api from "@/lib/api"
import { USERTYPE } from "@/types/entities/enums"
import { AxiosError } from "axios"
import { Pencil, Check } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"

interface AboutMeProps {
  bio: string
  isOwner: boolean
  usertype: USERTYPE
  userId: string
}

export default function AboutMe({ bio, isOwner, usertype, userId }: AboutMeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedBio, setEditedBio] = useState(bio)

  function handleEdit() {
    setIsEditing(true)
  }

  async function handleSave() {
    try {
      toast.loading("Atualizando...")
      const response = await api.patch(`/${usertype.toLowerCase()}s/${userId}`, {
        bio: editedBio,
      })
      setIsEditing(false)
      toast.dismiss()
      toast.success("Bio editada com sucesso.", {
        description: "Pode demorar até as alterações aparecerem.",
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">Sobre mim</h1>
        {isOwner && (
          <button onClick={isEditing ? handleSave : handleEdit} className="text-gray-600 hover:text-gray-900">
            {isEditing ? <Check size={24} /> : <Pencil size={20} />}
          </button>
        )}
      </div>
      {isEditing ? (
        <textarea
          className="w-full rounded border border-gray-300 p-2 text-xl font-normal"
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
        />
      ) : (
        <p className="text-xl font-normal">{bio}</p>
      )}
      <hr className="w-full" />
    </div>
  )
}
