"use client"

import React, { useState } from "react"
import Image from "next/image"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { Star, PlayCircle, HandHelping } from "lucide-react"
import SliderContent from "./SliderContent"

interface User {
  name: string
  image: string
}

interface ServiceCardProps {
  title: string
  description?: string
  type: string
  rating: number
  user: User
  link?: string
  images?: string[]
  model: "carrousel" | "video" | "link" | "text"
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, type, rating, user, link, model, images }) => {
  const renderModelContent = () => {
    switch (model) {
      case "carrousel":
        return images ? (
          <SliderContent images={images} />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-gray-300 text-gray-500">
            Nenhuma imagem disponível
          </div>
        )
      case "video":
        return <PlayCircle size={50} style={{ strokeWidth: 1 }} className="text-4xl text-gray-700" />
      case "link":
        return (
          <div className="h-full w-full overflow-hidden rounded-t-lg bg-gray-300">
            <iframe
              src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(link || "")}`}
              className="h-64 w-full"
              allowFullScreen
              allow="clipboard-write"
            />
          </div>
        )

      case "text":
        return (
          <div className="h-64 w-72 rounded-t-lg border bg-white">
            <ScrollArea.Root className="h-64 w-full rounded-t-lg p-2">
              <ScrollArea.Viewport className="h-full w-full overflow-hidden">
                <div className="p-4">
                  <p className="whitespace-pre-line break-all text-left text-sm">{description}</p>
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex touch-none select-none bg-gray-100 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-200 data-[orientation=vertical]:w-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-400 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        )
      default:
        return null
    }
  }
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={i < rating ? "fill-primary-purple text-primary-purple" : "fill-gray-300 text-gray-300"}
        size={16}
      />
    ))
  }

  return (
    <div className="h-[420px] w-72 rounded-lg border bg-white shadow-xl ">
      <div className="relative flex h-64 items-center justify-center rounded-t-lg bg-gray-300">
        {renderModelContent()}
      </div>
      <div className="p-4">
        <h3 className="text-base ">{title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className=" px-2 py-1 text-xs">{type}</span>
          <div className="flex items-center">{renderStars()}</div>
        </div>
      </div>
      <div className="border-grey-500 mx-4 flex-1 border-t-2" />
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Image src={user.image} width={32} height={32} alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="text-sm font-semibold text-gray-700">{user.name}</span>
        </div>
        <button className="flex items-center gap-2">
          <HandHelping size={22} className="text-primary-purple" />
        </button>
      </div>
    </div>
  )
}

const Services: React.FC = () => {
  const cards = [
    {
      title: "Branding empresarial",
      description: "",
      type: "Brand identity",
      rating: 2,
      user: { name: "Username user", image: "/images/pages/sobre/velhinho.png" },
      images: [
        "/images/pages/sobre/velhinho.png",
        "/images/pages/sobre/velhinho.png",
        "/images/pages/sobre/velhinho.png",
      ],
      model: "carrousel" as const,
    },
    {
      title: "Corte de podcast",
      description: "",
      type: "Edição de vídeos",
      rating: 4,
      user: { name: "Username user", image: "/images/pages/sobre/velhinho.png" },
      model: "video" as const,
    },
    {
      title: "Descrição de produto",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum rhoncus neque. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      type: "Copywriting",
      rating: 5,
      user: { name: "Username user", image: "/images/pages/sobre/velhinho.png" },
      model: "text" as const,
    },
    {
      title: "UEZ Website - Figma",
      description: "",
      type: "Web",
      rating: 5,
      user: { name: "Username user", image: "/images/pages/sobre/velhinho.png" },
      link: "https://www.figma.com/design/eFzvI4OaSfLt9NeCVvueba/UEZ-WebSite-2.0?node-id=962-367&p=f&t=JJyhJzPXADBEFaxU-0",
      model: "link" as const,
    },
    {
      title: "UEZ Website - Figma",
      description: "",
      type: "Web",
      rating: 5,
      user: { name: "Username user", image: "/images/pages/sobre/velhinho.png" },
      link: "https://www.figma.com/link",
      model: "link" as const,
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 15
  const totalPages = Math.ceil(cards.length / cardsPerPage)

  const startIndex = (currentPage - 1) * cardsPerPage
  const visibleCards = cards.slice(startIndex, startIndex + cardsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 4

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 2) {
        pages.push("...")
      }
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 1) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {visibleCards.map((card, index) => (
          <ServiceCard key={index} {...card} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center">
        {renderPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => handlePageChange(page)}
                className={`rounded px-2 py-0.5 ${
                  currentPage === page ? "bg-gray-200 text-lg font-bold text-black" : " text-lg font-bold text-black"
                }`}
              >
                {page}
              </button>
            ) : (
              <span className="px-2 text-black">{page}</span>
            )}

            {index < renderPageNumbers().length - 1 && <span className=" font-bold text-black">|</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Services
