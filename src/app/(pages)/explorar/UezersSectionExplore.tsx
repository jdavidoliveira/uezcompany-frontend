import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import SearchBox from "./SearchBox"
import { UezerCardExplore } from "./UezerCardExplore"
import React from "react"

interface Uezer {
  image: string
  name: string
  username: string
  speciality: {
    name: string
    profession: {
      name: string
    }
  }
}

const mockUezers: Uezer[] = Array.from({ length: 40 }, (_, index) => ({
  image: "/images/pages/sobre/velhinho.png",
  name: `Uezer ${index + 1}`,
  username: `uezer${index + 1}`,
  speciality: {
    name: `Speciality ${index + 1}`,
    profession: {
      name: `Profession ${index + 1}`,
    },
  },
}))

export default function UezersSection() {
  const data = mockUezers
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const newScrollPos = container.scrollLeft + scrollOffset

      container.scrollTo({
        left: newScrollPos,
        behavior: "smooth",
      })

      setTimeout(() => {
        const atStart = container.scrollLeft <= 0
        const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth

        setShowLeftArrow(!atStart)
        setShowRightArrow(!atEnd)
      }, 300)
    }
  }

  const handleScrollUpdate = (atStart: boolean, atEnd: boolean) => {
    setShowLeftArrow(!atStart)
    setShowRightArrow(!atEnd)
  }

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="relative flex w-10/12 items-center justify-center">
        <h1 className="absolute left-0 text-3xl font-semibold">Uezers</h1>
        <SearchBox />
      </div>
      <div className="relative mt-10 flex w-full items-center px-28">
        {showLeftArrow && (
          <div className="group absolute left-14 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-white p-2 transition-all hover:border-black/60">
            <ChevronLeft
              className="w-6 cursor-pointer transition-all group-hover:opacity-75"
              onClick={() => handleScroll(-scrollContainerRef.current!.clientWidth)}
            />
          </div>
        )}

        <DivOfColsOfUezerCardsWithHorizontalScroll
          uezersData={data}
          ref={scrollContainerRef}
          onScrollUpdate={handleScrollUpdate}
        />

        {showRightArrow && (
          <div className="group absolute right-14 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-white p-2 transition-all hover:border-black/60">
            <ChevronRight
              className="w-6 cursor-pointer transition-all group-hover:opacity-75"
              onClick={() => handleScroll(scrollContainerRef.current!.clientWidth)}
            />
          </div>
        )}
      </div>
    </section>
  )
}

interface DivOfColsOfUezerCardsWithHorizontalScrollProps {
  uezersData: Uezer[]
  onScrollUpdate: (atStart: boolean, atEnd: boolean) => void
}

const DivOfColsOfUezerCardsWithHorizontalScroll = React.forwardRef<
  HTMLDivElement,
  DivOfColsOfUezerCardsWithHorizontalScrollProps
>(({ uezersData, onScrollUpdate }, ref) => {
  const arrayOfUezers1 = uezersData.slice(0, Math.ceil(uezersData.length / 2))
  const arrayOfUezers2 = uezersData.slice(Math.ceil(uezersData.length / 2))

  return (
    <div
      ref={ref}
      className="flex w-full items-center gap-4 overflow-x-scroll p-2 scrollbar-hide"
      onScroll={(e) => {
        const target = e.currentTarget
        const atStart = target.scrollLeft <= 0
        const atEnd = target.scrollLeft + target.clientWidth >= target.scrollWidth

        onScrollUpdate(atStart, atEnd)
      }}
    >
      {arrayOfUezers1.map((uezer1, index) => {
        const uezer2 = arrayOfUezers2[index]

        return (
          <div key={index} className="flex min-w-[30%] flex-col items-center gap-6">
            <UezerCardExplore
              imageUrl={uezer1.image}
              profession={uezer1.speciality.profession.name}
              name={uezer1.name}
              speciality={uezer1.speciality.name}
            />
            {uezer2 && (
              <UezerCardExplore
                imageUrl={uezer2.image}
                profession={uezer2.speciality.profession.name}
                name={uezer2.name}
                speciality={uezer2.speciality.name}
              />
            )}
          </div>
        )
      })}
    </div>
  )
})

DivOfColsOfUezerCardsWithHorizontalScroll.displayName = "DivOfColsOfUezerCardsWithHorizontalScroll"
