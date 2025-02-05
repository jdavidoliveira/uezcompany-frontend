import * as React from "react"
import { SlidersHorizontalIcon } from "lucide-react"
const FilterButton: React.FC = () => {
  return (
    <button className="text-md flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 shadow-md shadow-gray-300 transition-colors hover:bg-gray-50 hover:text-gray-900">
      <SlidersHorizontalIcon className=" w-5 border-l-black" />
      <span className="font-bold text-black">Filtro</span>
    </button>
  )
}

export default FilterButton
