import { api } from "@/lib/serverapi"
import SearchBox from "./SearchBox"
import { UzerCard } from "./UzerCard"
import { Uzer } from "@/types/Uzer"
import { ChevronRight } from "lucide-react"

export default async function UzersSection() {
  const { data } = await api.get<Uzer[]>(`/uzers`, {
    next: { revalidate: 60 * 1 },
  })

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="relative flex w-10/12 items-center justify-center">
        <h1 className="absolute left-0 text-3xl font-semibold">Uzers</h1>
        <SearchBox />
      </div>
      <div className="mt-10 flex w-full items-center px-28">
        <DivOfColsOfUzerCardsWithHorizontalScroll uzersData={data} />
        <div className="group flex size-10 items-center justify-center rounded-full border border-black transition-all hover:border-black/60">
          <ChevronRight className="w-10 transition-all group-hover:opacity-75" />
        </div>
      </div>
    </section>
  )
}

//Isso aqui é uma gambiarra das braba, depois tem que ver se dá pra melhorar
function DivOfColsOfUzerCardsWithHorizontalScroll({ uzersData }: { uzersData: Uzer[] }) {
  const arrayOfUzers1 = uzersData.slice(0, uzersData.length / 2)
  const arrayOfUzers2 = uzersData.slice(uzersData.length / 2, uzersData.length)

  return (
    <div className="flex w-full items-center gap-4 overflow-x-scroll p-2 scrollbar-hide">
      {Array.from({ length: uzersData.length / 2 }).map((_, index) => {
        let count = 0
        const uzer1 = arrayOfUzers1[count]
        const uzer2 = arrayOfUzers2[count]
        count++
        return (
          <div key={index} className="flex min-w-[30%] flex-col items-center gap-6">
            <UzerCard
              imageUrl={uzer1.image}
              category={uzer1.service.category.name}
              username={uzer1.username}
              name={uzer1.name}
              service={uzer1.service.name}
            />

            <UzerCard
              imageUrl={uzer2.image}
              category={uzer2.service.category.name}
              username={uzer2.username}
              name={uzer2.name}
              service={uzer2.service.name}
            />
          </div>
        )
      })}
    </div>
  )
}
