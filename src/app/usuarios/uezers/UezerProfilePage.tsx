import ReturnButton from "@/components/layout/buttons/Return"
import { api } from "@/lib/serverapi"
import { Uezer } from "@/types/entities/Uezer"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ContactUserButton, ContactUserButtonStyle } from "../ContactUserButton"
import ShareButton from "./ShareButton"
import { USERTYPE } from "@/types/entities/enums"
import { toast } from "sonner"
import { EditImageButton } from "../EditButton"
import { timeFromNow } from "@/utils/dayjs"
import { Calendar, Pencil } from "lucide-react"
import AboutMe from "../AboutMe"

type Props = {
  uezerData: Uezer
  permissions: {
    isOwner: boolean
    isLogged: boolean
    isSameUsertype: boolean
  }
}

export async function UezerProfilePage({ uezerData, permissions }: Props) {
  if (!uezerData) return notFound()

  const searchPortfolioResponse = await api.get<any[]>(`/portfolios/${uezerData.username}`)

  const created_at = timeFromNow(uezerData.created_at)

  return (
    <main className="relative min-h-screen w-full bg-white">
      <ReturnButton classname="fixed top-10 left-10 z-50" />
      <section className="relative w-full">
        <div className="group relative h-96 w-full">
          <Image
            src={uezerData.banner}
            alt="banner"
            priority
            fill
            className="object-cover duration-300 group-hover:brightness-50"
          />
          {permissions.isOwner && <EditImageButton userId={uezerData.id} />}
        </div>
        <div className="absolute -bottom-64 left-1/2 flex w-10/12 -translate-x-1/2 flex-col items-center justify-center gap-5 md:left-[10%] md:mx-auto md:w-auto md:-translate-x-0">
          <div className="group flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-md ">
            <div className="relative aspect-square w-full rounded-full md:w-[80%]">
              <Image
                src={uezerData.image}
                alt="profile"
                fill
                className="rounded-full object-cover transition duration-300 group-hover:brightness-75"
              />
              {permissions.isOwner && <EditImageButton isImage userId={uezerData.id} />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">{uezerData.name}</h1>
            <h2 className="text-lg">@{uezerData.username}</h2>
            <h3 className="text-xl font-medium">{uezerData.speciality.name}</h3>
            <div className="mt-6 grid grid-cols-3 gap-6 md:gap-0">
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{uezerData.completed_orders_amount ?? 0}</h1>
                <h2 className="text-center text-lg font-medium">Pedidos feitos</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{uezerData.rating.toFixed(1)}</h1>
                <h2 className="text-center text-lg font-medium">Avaliação</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{4}</h1>
                <h2 className="text-center text-lg font-medium">Favoritados</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mt-20 h-56 w-full px-20 md:grid md:grid-cols-2">
        {/* {!isOwner && <RateButton />} */}
        <div className="mt-80 flex flex-col gap-2 pb-20 md:mt-60">
          <AboutMe
            usertype={uezerData.usertype}
            userId={uezerData.id}
            bio={uezerData.bio}
            isOwner={permissions.isOwner}
          />
          <div className="flex flex-col gap-6 p-4">
            <h1 className="text-2xl font-semibold">Outras informações</h1>
            <ul className="flex flex-col gap-6 pl-4">
              <li className="flex items-center justify-start gap-4">
                <Calendar size={40} />
                <span className="text-xl font-normal">
                  Entrou <strong className="font-bold">{created_at}</strong>
                </span>
              </li>
              {/* <li className="flex items-center justify-start gap-4">
                <Handshake size={40} />
                <span className="text-xl font-normal">
                  Fecha com <strong className="font-bold">77%</strong> dos clientes que contata
                </span>
              </li>
              <li className="flex items-center justify-start gap-4">
                <LineChart size={40} />
                <span className="text-xl font-normal">
                  Indicado por <strong className="font-bold">100%</strong> dos clientes
                </span>
              </li> */}
            </ul>
            <hr className="w-full" />
          </div>
          {/* {!isOwner && (
            <div className="flex flex-col gap-6 p-4">
              <ReportButton />
            </div>
          )} */}
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* {session?.user.usertype !== "UEZER" && ( */}
          {
            <div className="flex w-full items-center justify-center pb-20 pt-10">
              <div className="flex h-16 items-center justify-center gap-2">
                {permissions.isLogged && !permissions.isSameUsertype ? (
                  <ContactUserButton userid={uezerData.id} usertype={USERTYPE.UEZER} />
                ) : permissions.isSameUsertype ? (
                  <ContactUserButtonStyle text="Somente um cliente pode contatar um uezer." data={{}} />
                ) : (
                  <ContactUserButtonStyle />
                )}
                <ShareButton />
              </div>
            </div>
          }
          <div className="mb-20 flex flex-col items-center justify-between gap-10 md:mb-0">
            <h1 className="text-3xl font-semibold">Portfolio</h1>
            <div
              className={`${searchPortfolioResponse.data.length > 0 ? "grid grid-cols-2 gap-6" : "flex items-center justify-center"}`}
            >
              {searchPortfolioResponse.data.length > 0 ? (
                searchPortfolioResponse.data.map((portfolio) => (
                  <PortfolioCard key={portfolio.id} image={portfolio.imagemUrl} />
                ))
              ) : (
                <h1 className="mx-auto text-center text-2xl font-normal">
                  O usuário ainda não possui nenhum item no portfolio
                </h1>
              )}
            </div>
            {searchPortfolioResponse.data.length > 0 && (
              <Link
                href="/usuarios/[username]/portfolio"
                as={`/usuarios/${uezerData.username}/portfolio`}
                className="rounded-full bg-primary-blue px-4 py-1 font-bold text-white transition hover:scale-105"
              >
                Ver mais
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function PortfolioCard({ image }: { image: string }) {
  return (
    <div className="group relative flex aspect-square w-72 flex-col justify-center rounded-lg bg-primary-gray hover:cursor-pointer">
      <div className="relative h-full w-full">
        <Image src={image} alt="profile" fill className="rounded-lg object-cover" />
      </div>
      <div className="absolute bottom-0 hidden h-1/5 w-full animate-upEntranceInTheCard rounded-b-lg bg-white p-4 group-hover:flex">
        a
      </div>
    </div>
  )
}
