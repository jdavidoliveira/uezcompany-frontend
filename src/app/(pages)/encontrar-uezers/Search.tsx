"use client"

import { getProfessionsWithSpecialities } from "@/actions/getProfessions"
import { Profession } from "@/types/entities/Speciality"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function Search() {
  const form = useForm()
  const searchParams = useSearchParams()
  const [professions, setProfessions] = useState<Profession[]>([])

  useEffect(() => {
    const orderByProfession = searchParams.get("orderByProfession")
    const search = searchParams.get("search")

    if (orderByProfession) form.setValue("orderByProfession", orderByProfession)
    if (search) form.setValue("search", search)
  }, [searchParams, form.setValue])

  useEffect(() => {
    async function fetchProfessions() {
      const { professions } = await getProfessionsWithSpecialities()
      setProfessions(professions)
    }
    fetchProfessions()
  }, [])

  const handleSubmit = form.handleSubmit(async (data) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })
    const queryString = params.toString()
    const newUrl = `${window.location.pathname}?${queryString}`
    window.history.pushState(null, "", newUrl)
    window.location.reload()
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-fit w-full flex-col-reverse items-center justify-center overflow-x-hidden rounded-lg border shadow-sm md:w-1/2 md:flex-row"
    >
      <div className="relative w-full md:w-auto">
        <select
          className="h-full w-full rounded border-4 border-primary-gray bg-primary-gray px-2 py-1 text-xl font-medium"
          {...form.register("orderByProfession")}
        >
          <option value="default">Ordenar</option>
          {professions.map((profession) => (
            <option key={profession.id} value={profession.name}>
              {profession.name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full flex-1 md:w-auto">
        <input
          {...form.register("search")}
          type="text"
          className="w-full flex-1 px-3 py-1.5 text-xl outline-none"
          placeholder="Search..."
        />
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="size-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  )
}
