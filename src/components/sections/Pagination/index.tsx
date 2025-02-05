"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface PaginationProps {
  totalPages: number
  currentPage?: number
}

export function Pagination({ totalPages, currentPage = 1 }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 size-9 rounded-full p-1 text-lg ${
            i === currentPage ? "bg-primary-purple text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>,
      )
    }

    return pages
  }

  return (
    <div className="my-4 flex items-center justify-center space-x-1">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center justify-center rounded px-3 py-1 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <ArrowLeft />
        Volt
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center rounded px-3 py-1 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
      >
        Volt
        <ArrowRight />
      </button>
    </div>
  )
}
