"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SliderProps {
  images: string[]
}

const SliderContent: React.FC<SliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = images.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-lg">
      <div
        className="flex h-64 transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="h-64 w-full flex-shrink-0 flex-grow-0 basis-full">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              width={288}
              height={256}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            // Caso a imagem tenha tons escuros, essa estilização seria a mais adequada
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white hover:bg-black/50"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            // De acordo com as especificações do figma
            className="absolute right-2 top-1/2 -translate-y-1/2 text-black"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-1 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SliderContent
