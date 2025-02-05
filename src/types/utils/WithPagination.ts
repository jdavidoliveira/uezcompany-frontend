export type WithPagination<T> = {
  data: T
  meta: Meta
}

export type Meta = {
  total: number
  page: number
  pageSize: number
  totalPages: number
}
