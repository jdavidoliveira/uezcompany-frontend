import { api } from "@/lib/serverapi"
import SearchBox from "./SearchBox"
import { UezerCard } from "./UezerCard"
import { Uezer } from "@/types/entities/Uezer"
import { ChevronRight } from "lucide-react"

export default async function UezersSection() {
  const { data } = await api.get<Uezer[]>(`/uezers`, {
    next: { revalidate: 60 * 1 },
  })

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="relative flex w-10/12 items-center justify-center">
        <h1 className="absolute left-0 text-3xl font-semibold">Uezers</h1>
        <SearchBox />
      </div>
      <div className="mt-10 flex w-full items-center px-28">
        <DivOfColsOfUezerCardsWithHorizontalScroll uezersData={data} />
        <div className="group flex size-10 items-center justify-center rounded-full border border-black transition-all hover:border-black/60">
          <ChevronRight className="w-10 transition-all group-hover:opacity-75" />
        </div>
      </div>
    </section>
  )
}

//Isso aqui é uma gambiarra das braba, depois tem que ver se dá pra melhorar
function DivOfColsOfUezerCardsWithHorizontalScroll({ uezersData }: { uezersData: Uezer[] }) {
  const arrayOfUezers1 = uezersData.slice(0, uezersData.length / 2)
  const arrayOfUezers2 = uezersData.slice(uezersData.length / 2, uezersData.length)

  return (
    <div className="flex w-full items-center gap-4 overflow-x-scroll p-2 scrollbar-hide">
      {Array.from({ length: uezersData.length / 2 }).map((_, index) => {
        let count = 0
        const uezer1 = arrayOfUezers1[count]
        const uezer2 = arrayOfUezers2[count]
        count++
        return (
          <div key={index} className="flex min-w-[30%] flex-col items-center gap-6">
            <UezerCard
              imageUrl={uezer1.image}
              profession={uezer1.speciality.profession.name}
              username={uezer1.username}
              name={uezer1.name}
              speciality={uezer1.speciality.name}
            />

            <UezerCard
              imageUrl={uezer2.image}
              profession={uezer2.speciality.profession.name}
              username={uezer2.username}
              name={uezer2.name}
              speciality={uezer2.speciality.name}
            />
          </div>
        )
      })}
    </div>
  )
}
