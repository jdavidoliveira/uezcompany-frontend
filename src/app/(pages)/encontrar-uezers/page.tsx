import { api } from "@/lib/serverapi"
import NotSession from "@/components/NotSession"
import FindUezers from "./FindUezers"
import { Uezer } from "@/types/entities/Uezer"
import { WithPagination } from "@/types/utils/WithPagination"

interface PageProps {
  searchParams: Record<string, string>
}

export default async function Page({ searchParams, ...props }: PageProps) {
  const { search, orderByProfession, page } = searchParams

  const params = new URLSearchParams({
    search: search || "",
    orderByProfession: orderByProfession || "default",
    ...(page && { page, pageSize: "20" }),
  })

  const { data: searchByUezers } =
    (await api.get<WithPagination<Uezer[]>>(`/uezers?${params.toString()}`, { cache: "no-cache" })) || []
  return (
    <>
      <main className="w-full">
        <div className="flex flex-col items-center justify-center gap-2 px-20 pt-20">
          <h1 className="text-center text-4xl font-semibold">Uezers</h1>
          <p className="text-center text-base text-[#6A6A6A]">
            Encontre o profissional ideal para o seu projeto em poucos cliques – conecte-se com talentos <br />{" "}
            qualificados e transforme suas ideias em realidade!
          </p>
        </div>
        <FindUezers uezers={searchByUezers.data} meta={searchByUezers.meta} />
      </main>
      <NotSession />
    </>
  )
}
