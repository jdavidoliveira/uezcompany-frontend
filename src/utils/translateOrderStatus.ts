import { OrderStatus } from "@/types/entities/Order"

export function translateOrderStatus(status: OrderStatus): string {
  switch (status) {
    case "COMPLETED":
      return "Concluido"

    case "CANCELLED":
      return "Cancelado"

    case "IN_PROGRESS":
      return "Em andamento"

    case "OPEN":
      return "Aberto"

    case "WAITING_EVALUATION":
      return "Aguardando avaliação"

    default:
      return status
  }
}
