import Image from "next/image"

interface UezerCardProps {
  imageUrl: string
  profession: string
  speciality: string
  name: string
}

export function UezerCardExplore({ profession, imageUrl, speciality, name }: UezerCardProps) {
  return (
    <div className="flex w-full min-w-[39%] items-center gap-5 rounded-3xl border border-black/20 bg-white py-8 pl-10 pr-4 shadow-lg">
      <div className="flex h-full items-center justify-center">
        <Image
          src={imageUrl}
          alt="profile"
          width={200}
          height={200}
          className="aspect-square w-28 rounded-full bg-slate-300 md:hidden lg:block"
        />
      </div>
      <div className="flex h-full flex-col justify-center">
        <div className="-mt-3 mb-3 flex w-fit items-center justify-center space-x-2 rounded-lg border bg-primary-purple p-1 px-4">
          <Image
            src="/images/icons/categorias/programacao.png"
            width={120}
            height={120}
            alt={profession}
            className="w-4"
          />
          <span className="text-xs text-white">{speciality}</span>
        </div>

        <h1 className="text-xl font-semibold">{name}</h1>
        <h2 className="text-md -mt-1 font-light">Mobile, Front-End</h2>
        <div className="mt-3 flex items-center gap-2">
          <button className="rounded-lg bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 shadow">React</button>
          <button className="rounded-lg bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 shadow">
            React Native
          </button>
        </div>
      </div>
    </div>
  )
}
