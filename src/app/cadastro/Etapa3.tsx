"use client"

import { useEffect, useState } from "react"
import { Check, ChevronLeft } from "lucide-react"
import "animate.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signUpSchema, useSignupData } from "@/contexts/Signup"
import { twMerge } from "tailwind-merge"
import api from "@/lib/api"
import Image from "next/image"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"
import { Profession, Speciality } from "@/types/entities/Speciality"
import { signIn } from "next-auth/react"

interface Etapa3Props {
  back: () => void
  etapa: number
  professions: Profession[]
  specialities: Speciality[]
}

const userFormSchema = z.object({
  specialityId: z.string().uuid("O serviço é obrigatório"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Etapa3({ back, etapa, professions, specialities }: Etapa3Props) {
  const pathname = usePathname()
  const router = useRouter()
  const { watch, register, handleSubmit } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })
  const { signupData, setSignupData } = useSignupData()

  const [availableSpecialities, setAvailableSpecialities] = useState<Speciality[] | null>(null)
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null)

  async function updateSpecialityId(specialityId: string) {
    setSignupData((prev) => ({ ...prev, specialityId: specialityId }))
  }

  async function finish() {
    const validationResult = signUpSchema.safeParse(signupData)
    if (!validationResult.success) {
      return toast(validationResult.error.issues.map((issue) => issue.message).join(", "))
    }

    if (pathname.includes("uez")) {
      try {
        const registerData = await api.post("/register", signupData)
        if (registerData.status !== 201) {
          return toast(registerData.data.message || "Erro ao registrar")
        }

        toast.success("Cadastro concluído com sucesso!")

        router.push(`/login?userEmail=${signupData.email}`)
      } catch (error) {
        toast.error("Erro ao registrar. Tente novamente.")
        console.error(error)
      }
    } else if (pathname.includes("google")) {
      try {
        const registerData = await api.post("/complete-register", signupData)
        if (registerData.status !== 201) {
          return toast(registerData.data.message || "Erro ao registrar")
        }

        toast.success("Cadastro concluído com sucesso!")

        // Aqui entra a atualização da sessão com 'signIn' para atualizar a sessão com os dados do google
        const signInResponse = await signIn("credentials", {
          email: signupData.email,
          password: signupData.password,
          redirect: false,
        })

        if (signInResponse?.error) {
          toast.error("Erro ao fazer login após completar cadastro.")
        } else {
          router.push("/")
        }
      } catch (error) {
        toast.error("Erro ao registrar. Tente novamente.")
        console.error(error)
      }
    }
  }

  async function fetchSpecialitiesByProfession() {
    if (!selectedProfession) return

    specialities.filter((speciality) => speciality.profession.id === selectedProfession.id)
    setAvailableSpecialities(specialities.filter((speciality) => speciality.profession.id === selectedProfession.id))
  }

  useEffect(() => {
    fetchSpecialitiesByProfession()
  }, [selectedProfession])

  const specialityId = watch("specialityId")

  return (
    <div className="animate__animated animate__fadeIn flex w-full flex-col items-center justify-center gap-10 px-2 sm:w-10/12 sm:px-5">
      <h1 className="text-3xl font-semibold">Cadastre-se</h1>
      <form onSubmit={handleSubmit(finish)} className="flex w-10/12 flex-col gap-8 sm:w-10/12">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <label htmlFor="professions" className="w-full text-center font-medium">
            Escolha seu cargo
          </label>
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-6">
            {professions.map((profession) => (
              <ProfessionButton
                key={profession.id}
                professionName={profession.name}
                isSelected={selectedProfession?.id === profession.id}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedProfession(profession)
                  updateSpecialityId(profession.id)
                }}
              />
            ))}
          </div>
        </div>

        {availableSpecialities && (
          <div className="animate__animated animate__fadeIn flex w-full flex-col gap-2">
            <label htmlFor="servico" className="w-full font-medium">
              Qual serviço você oferece?
            </label>
            <select
              id="servico"
              {...register("specialityId", {
                onChange: (e) => updateSpecialityId(e.target.value),
              })}
              className="w-full rounded-md bg-primary-gray p-2"
            >
              {availableSpecialities.map((speciality) => (
                <option key={speciality.id} value={speciality.id}>
                  {speciality.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mx-auto flex w-fit items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault()
              back()
            }}
            className="mx-auto flex w-fit items-center justify-between rounded-lg bg-primary-purple p-2"
          >
            <ChevronLeft color="white" />
          </button>
          <span className="mx-6 text-lg font-medium">{etapa}</span>
          {specialityId && (
            <button
              type="submit"
              className="mx-auto flex w-fit items-center justify-between gap-1 rounded-lg bg-primary-purple p-2"
            >
              <span className="text-lg font-medium text-white">Concluído</span>
              <Check color="white" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

interface ProfessionButtonProps {
  onClick: (e?: any) => void
  professionName: string
  isSelected: boolean
}

function ProfessionButton({ onClick, professionName, isSelected }: ProfessionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex items-center justify-center rounded-md bg-primary-purple",
        isSelected && "bg-primary-dark-blue",
      )}
    >
      <div className="flex h-full w-full items-center justify-center gap-2 px-6 py-3 text-white">
        <Image
          width={100}
          height={100}
          src={`/images/icons/categorias/${professionName
            .toLowerCase()
            .replace(" ", "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")}.png`}
          alt="Imagem ilustrativa"
          className="h-10 w-10"
        />
        <span className="text-lg font-medium">{professionName}</span>
      </div>
    </button>
  )
}
