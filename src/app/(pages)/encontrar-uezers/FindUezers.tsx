import { Uezer } from "@/types/entities/Uezer"
import React from "react"
import Search from "./Search"
import UezerContainer from "./UezerContainer"
import { Meta } from "@/types/utils/WithPagination"
import { Pagination } from "@/components/sections/Pagination"

interface FindUezersProps {
  uezers: Uezer[]
  meta: Meta
}

export default function FindUezers({ uezers, meta }: FindUezersProps) {
  return (
    <div className="mt-20 flex min-h-screen w-full flex-col items-center">
      <div className="relative flex w-10/12 flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
        <Search />
      </div>
      <UezerContainer uezers={uezers} />
      {uezers.length > 0 && (
        <div className="relative flex w-10/12 flex-col items-center justify-center gap-4">
          <Pagination totalPages={meta.totalPages} />
        </div>
      )}
    </div>
  )
}
