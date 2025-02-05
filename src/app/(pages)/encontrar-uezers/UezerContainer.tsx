import { Uezer } from "@/types/entities/Uezer"
import React from "react"
import UezerCard from "./UezerCard"
import RemoveFiltersButton from "./RemoveFiltersButton"

interface UezerContainerProps {
  uezers: Uezer[]
}

export default function UezerContainer({ uezers }: UezerContainerProps) {
  return uezers.length > 0 ? (
    <div className="my-10 grid w-full grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3 xl:px-12">
      {uezers.map((uezer) => (
        <UezerCard uezer={uezer} key={uezer.id} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-medium">Não há uezers que correspondam a esse filtro 😭</h1>
      <RemoveFiltersButton />
    </div>
  )
}
