import { api } from "@/lib/serverapi"
import { Client } from "@/types/entities/Client"
import { Uezer } from "@/types/entities/Uezer"
import type { MetadataRoute } from "next"

const defaultSitemap: MetadataRoute.Sitemap = [
  {
    url: "https://uezcompany.com/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: "https://uezcompany.com/sobre",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "https://uezcompany.com/login",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.3,
  },
  {
    url: "https://uezcompany.com/cadastro",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.3,
  },
  {
    url: "https://uezcompany.com/cadastro/uez",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.3,
  },
  {
    url: "https://uezcompany.com/sobre/termos-de-uso",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: "https://uezcompany.com/sobre/politica-de-privacidade",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const searchOfUsers = await api.get<Uezer[] | Client[]>("/users", {
    next: {
      revalidate: 60 * 60 * 24 * 1, // 1 day in seconds
    },
  })

  if (!searchOfUsers.ok) return defaultSitemap

  const usersSitemap: MetadataRoute.Sitemap = searchOfUsers.data.map((user) => ({
    url: `https://uezcompany.com/usuarios/${user.username}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...defaultSitemap, ...usersSitemap]
}
