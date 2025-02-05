import ReactDOM from "react-dom"
import Image from "next/image"
import { CircleHelp, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { getProfessionsWithSpecialities } from "@/actions/getProfessions"
import { Profession, Speciality } from "@/types/entities/Speciality"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "@/lib/api"
import { getProfilePageURL } from "@/utils/getProfilePageURL"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

function CreateOrderOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [solicitacoes, setSolicitacoes] = useState<{ nome: string; especialidade: string }[]>([])
  const [professions, setProfessions] = useState<Profession[]>()
  const [specialities, setSpecialities] = useState<Speciality[]>()
  const [aCombinar, setACombinar] = useState(false)
  const [selectedProfession, setSelectedProfession] = useState("")
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { professions, specialities } = await getProfessionsWithSpecialities()
        setProfessions(professions)
        setSpecialities(specialities)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])

  const orderFormSchema = z.object({
    title: z.string().min(6, "O titulo do pedido precisa ter no mínimo 6 caracteres."),
    description: z.optional(z.string()),
    profession: z.enum(professions?.map((profession) => profession.name) as [string, ...string[]]),
    speciality: z.enum(specialities?.map((speciality) => speciality.name) as [string, ...string[]]),
    value: z.coerce.number(),
  })

  const form = useForm<z.infer<typeof orderFormSchema>>({ resolver: zodResolver(orderFormSchema) })

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      Object.keys(form.formState.errors).forEach((item) => {
        // @ts-ignore
        item === "speciality"
          ? // @ts-ignore
            toast.warning("Você precisa escolher alguma especialidade")
          : // @ts-ignore
            item === "profession"
            ? toast.warning("Você precisa escolher alguma profissão")
            : // @ts-ignore
              toast.warning(form.formState.errors[item].message)
      })
    }
  }, [form.formState.errors])

  if (!professions || !specialities) {
    return <div>Loading...</div>
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    const { title, value, profession, speciality, description } = data
    const body = {
      specialityId: specialities.find((speciality) => speciality.profession.name === profession)!.id,
      value,
      title,
      description,
    }

    setIsCreatingOrder(true)

    try {
      const newOrder = await api.post("/orders", body)
      toast.success(`O seu pedido foi criado, acesse o perfil e veja mais detalhes por lá!`, {
        action: {
          label: "Acessar",
          onClick: async () => {
            const url = await getProfilePageURL()
            router.push(url)
          },
        },
      })
      form.reset()
      onClose()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      setIsCreatingOrder(false)
    }
  })

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 md:overflow-hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest(".close-overlay") || target.closest(".overlay-container")) return
        onClose()
      }}
    >
      <div className="overlay-container relative w-[90%] max-w-7xl rounded-2xl bg-white p-6 shadow-lg md:p-10 lg:p-14">
        <button
          onClick={onClose}
          className="close-overlay absolute right-4 top-4 text-2xl font-extrabold text-black hover:text-gray-700 md:right-6 md:top-6"
        >
          ✕
        </button>

        <h2 className="mb-2 text-center text-2xl font-extrabold md:text-3xl lg:text-4xl">Criar pedido</h2>
        <p className="mb-8 text-center text-black md:mb-12 lg:mb-16">
          Preencha os campos para lançar seu pedido na nossa plataforma
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          <div className="lg:ml-14">
            <div>
              <label className="block items-center pb-2 text-base font-semibold text-primary-dark-blue">
                Título do pedido
              </label>
              <input
                {...form.register("title")}
                type="text"
                placeholder="Ex: Eu preciso de uma logo para minha padaria"
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between pb-2">
                <label className="flex items-center text-base font-semibold text-primary-dark-blue">Descrição</label>
                <span className="text-sm text-gray-500">0/600</span>
              </div>
              <textarea
                {...form.register("description")}
                placeholder="Ex: Preciso de um logotipo para minha padaria chamada 'Padaria Felicidade' com as cores marrom e branco, estilo minimalista."
                maxLength={600}
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10}
              ></textarea>
            </div>
          </div>

          <div>
            <div className="mb-4 lg:mb-14">
              <label className="flex items-center pb-2 text-base font-semibold text-primary-dark-blue">
                Profissão
                <div className="group relative">
                  <CircleHelp size={18} className="ml-2 cursor-pointer text-gray-400" />
                  <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                    Área profissional que melhor descreve o serviço que você está solicitando.
                  </div>
                </div>
              </label>
              <input
                {...form.register("profession")}
                type="text"
                onChange={(e) => setSelectedProfession(e.target.value)}
                placeholder="Ex: Design"
                list="professions-list"
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="professions-list">
                {professions.map((profession) => (
                  <option key={profession.id} value={profession.name} />
                ))}
              </datalist>
            </div>

            <div className="mb-4 lg:mb-14">
              <label className="flex items-center pb-2 text-base font-semibold text-primary-dark-blue">
                Especialidade
                <div className="group relative">
                  <CircleHelp size={18} className="ml-2 cursor-pointer text-gray-400" />
                  <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                    A habilidade ou ramo dentro da profissão que você deseja para o serviço.
                  </div>
                </div>
              </label>
              <input
                {...form.register("speciality")}
                type="text"
                placeholder="Ex: Criação de logo"
                list="specialities-list"
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="specialities-list">
                {specialities
                  .filter((speciality) => speciality.profession.name === selectedProfession)
                  .map((speciality) => (
                    <option key={speciality.id} value={speciality.name} />
                  ))}
              </datalist>
            </div>

            <div className="mt-6">
              <label className="block pb-2 text-base font-semibold text-primary-dark-blue">Preço</label>
              <div className="flex flex-col items-start space-y-2">
                <div className="flex w-full items-center space-x-2">
                  <span className="text-gray-500">R$</span>
                  <input
                    disabled={aCombinar}
                    {...form.register("value")}
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-black/10"
                  />
                </div>
                <label className="flex items-center space-x-1 self-end">
                  <input
                    type="checkbox"
                    onChange={() => setACombinar((prev) => !prev)}
                    className="form-checkbox rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">A combinar</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="-mt-1 mb-2 flex items-center text-base font-semibold text-primary-dark-blue">
              Suas solicitações ({solicitacoes.length}/5)
              <div className="group relative">
                <CircleHelp size={18} className="ml-2 cursor-pointer text-gray-400" />
                <div className=" absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  Adicione até cinco solicitações ao seu pedido para detalhar suas necessidades.
                </div>
              </div>
            </h3>

            {solicitacoes.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-gray-300 p-4 py-20 shadow-lg lg:max-w-64">
                <Image
                  src="/images/icons/request-verification.png"
                  alt="profile"
                  width={200}
                  height={200}
                  className="w-20 md:w-28"
                />
                <p className="text-center text-sm text-gray-500">
                  Atualmente, você não tem nenhuma solicitação adicionada.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:max-w-64 lg:grid-cols-1">
                {solicitacoes.map((solicitacao, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start rounded-lg border-2 border-gray-300 p-4 shadow-lg"
                  >
                    <h4 className="text-base font-semibold text-primary-dark-blue">{solicitacao.nome}</h4>
                    <p className="text-sm text-gray-500">{solicitacao.especialidade}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="relative rounded-lg bg-primary-blue px-10 py-2 font-semibold text-white transition hover:bg-secondary-blue md:px-16 md:py-3"
            >
              {isCreatingOrder ? <Loader2 className="size-10 animate-spin" /> : "Solicitar"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}

export default CreateOrderOverlay
