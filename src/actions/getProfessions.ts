"use server"

import { api } from "@/lib/serverapi"
import { Profession, Speciality } from "@/types/entities/Speciality"

export async function getProfessionsWithSpecialities() {
  try {
    const [specialitiesResponse, professionsResponse] = await Promise.all([
      api.get<Speciality[]>("/specialities", {
        next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
      }),
      api.get<Profession[]>("/professions", {
        next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
      }),
    ])

    if (!specialitiesResponse.ok || !professionsResponse.ok) {
      throw new Error("Failed to fetch professions or specialities")
    }

    const specialities = specialitiesResponse.data
    const professions = professionsResponse.data

    // Combine professions with their respective specialities
    const data = professions.map((profession) => ({
      profession,
      specialities: specialities.filter((speciality) => speciality.profession.id === profession.id),
    }))

    return { data, specialities, professions }
  } catch (error) {
    console.error("Error fetching professions or specialities:", error)
    throw error
  }
}
