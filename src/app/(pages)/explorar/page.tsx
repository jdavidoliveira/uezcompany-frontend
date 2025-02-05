"use client"

import React from "react"
import UezersSection from "./UezersSectionExplore"
import Image from "next/image"
import { motion } from "framer-motion"
import ServicesPage from "./ServiceCard"
import FilterButton from "./FilterButton"
export default function Explorar() {
  return (
    <main className="flex w-full flex-col items-center justify-center bg-white">
      <div className="flex w-full items-center justify-center px-8 py-56">
        <h1 className="w-full px-28 text-center text-3xl font-semibold">
          Explore um <span className=" text-primary-purple">mundo</span> de possibilidades!
        </h1>
        <Image
          src="/elementos/halfpadrao-circulo.png"
          alt="Elemento"
          width={600}
          height={600}
          className="top-30 absolute left-0 w-60 -translate-x-1/4 rotate-90 "
        />
        <Image
          src="/elementos/bolinhas.png"
          alt="Elemento"
          width={600}
          height={600}
          className="absolute right-24 top-48 w-6"
        />
        <Image
          src="/elementos/bolinhas.png"
          alt="Elemento"
          width={600}
          height={600}
          className="absolute left-144 top-96 hidden w-6 rotate-90 overflow-hidden lg:block "
        />
      </div>
      <UezersSection />
      <div className=" flex w-full items-start pl-96">
        <Image
          src="/elementos/bolinhas.png"
          width={600}
          height={600}
          alt="Elemento"
          className="-mt-10 hidden w-6 rotate-90 md:block"
        />
        <button className="font-xl my-10 mr-44 w-full text-right text-lg font-medium">Ver mais</button>
      </div>

      <div className="relative w-full overflow-hidden bg-primary-purple py-10">
        <h2 className="mb-5 ml-40 text-left text-2xl font-semibold text-white">Nossos Serviços</h2>

        <div className="absolute left-0 top-0 z-20 h-full w-36 bg-primary-purple"></div>
        <div className="top-35 absolute left-0 z-10 h-48 w-36 bg-primary-purple shadow-2xl"></div>
        <div className="absolute right-0 top-0 z-20 h-full w-36 bg-primary-purple"></div>
        <div className="top-35 absolute right-0 z-10 h-48 w-36 bg-primary-purple shadow-2xl"></div>

        <div className="w-[4000px] overflow-hidden">
          <Image
            src="/elementos/padroes/padrao-branco.png"
            alt="Elemento"
            width={800}
            height={800}
            className="absolute right-0 top-0 z-30 w-40"
          />
          <Image
            src="/elementos/chunck-circulo-azulao.png"
            alt="Elemento"
            width={800}
            height={800}
            className="absolute bottom-0 left-0 z-30 w-32 -rotate-90 opacity-70 saturate-200"
          />
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            <Image
              src="/images/pages/explorar/services.svg"
              alt="Elemento"
              width={800}
              height={800}
              className="h-auto w-auto"
            />
            <Image
              src="/images/pages/explorar/services.svg"
              alt="Elemento"
              width={800}
              height={800}
              className="h-auto w-auto"
            />
          </motion.div>
        </div>
      </div>
      <div className="align-center relative flex w-full justify-center">
        <Image
          src="/elementos/halfpadrao-circulo.png"
          alt="Elemento"
          width={800}
          height={800}
          className="absolute bottom-24 left-0 z-10 w-72 -translate-x-12 rotate-90 overflow-hidden"
        />
        <Image
          src="/elementos/twochunks-circulo.png"
          alt="Elemento"
          width={800}
          height={800}
          className="absolute right-0 z-10 w-52 rotate-90"
        />
        <section className="z-20 flex w-11/12 flex-col items-center justify-center pt-40">
          <div className="relative flex w-11/12 items-center justify-between">
            <h1 className="relative left-0 pb-5 text-left text-3xl font-semibold">Serviços</h1>
            <div className="w-18 right-0">
              <FilterButton />
            </div>
          </div>
          <ServicesPage />
        </section>
      </div>

      <div className="align-center relative flex w-full justify-center">
        <Image
          src="/elementos/halfpadrao-circulo.png"
          height={800}
          width={800}
          alt="Elemento"
          className="absolute bottom-32 right-0 z-10 w-72 translate-x-12 -rotate-90"
        />
        <section className="relative z-20 flex  w-11/12 flex-col items-center justify-center pt-40">
          <div className="relative  flex w-11/12 items-center justify-between">
            <h1 className="relative left-0 pb-5 text-left text-3xl font-semibold">Portifólios</h1>
            <div className="w-18 right-0">
              <FilterButton />
            </div>
          </div>
          <div className="pb-20">   
            <ServicesPage />
          </div>
        </section>
      </div>
    </main>
  )
}
