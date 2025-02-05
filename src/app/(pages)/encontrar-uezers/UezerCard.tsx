import { getProfessionsWithSpecialities } from "@/actions/getProfessions"
import Rating from "@/components/layout/Rating"
import { SimpleUezer } from "@/types/entities/Uezer"
import { getProfessionIconByName } from "@/utils/getProfessionIconByName"
import Image from "next/image"
import Link from "next/link"

interface UezerCardProps {
  uezer: SimpleUezer
}

export default async function UezerCard({ uezer }: UezerCardProps) {
  const { data } = await getProfessionsWithSpecialities()

  const professionBySpeciality = data.find((tuple) => {
    return tuple.specialities.some((speciality) => speciality.id === uezer.speciality.id)
  })?.profession

  return (
    <Link
      href={`/usuarios/${uezer.username}`}
      title={`Acessar o perfil de ${uezer.username}`}
      className="flex w-full flex-col items-center justify-between gap-4 rounded-3xl border border-black/20 bg-white p-4 shadow-lg duration-300 hover:scale-[102%] md:flex-row md:py-4 md:pl-8 md:pr-4"
    >
      <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
        <div className="flex min-w-fit items-center justify-center">
          <Image
            src={uezer.image}
            alt="profile"
            width={200}
            height={200}
            className="size-24 rounded-full border border-black/30 bg-slate-300"
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
          <h1 className="text-lg font-semibold leading-5">{uezer.name}</h1>
          <h2 className="-mt-1 text-base font-light">@{uezer.username}</h2>
          <div className="flex items-center gap-1">
            <span>{uezer.rating.toFixed(1)}</span>
            <Rating rating={uezer.rating} showRating={false} size={16} />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-auto">
        <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-primary-purple px-3 py-2 text-white">
          <Image
            src={
              professionBySpeciality?.name
                ? getProfessionIconByName(professionBySpeciality.name, false)
                : "/images/icons/categorias/programacao.png"
            }
            width={120}
            height={120}
            alt={professionBySpeciality?.name || "Profissão"}
            className="w-6"
          />
          <span className="text-center text-sm font-medium text-white">{uezer.speciality.name}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm">Pedidos Realizados</p>
          <h1 className="text-lg font-bold">34</h1>
        </div>
      </div>
    </Link>
  )
}
