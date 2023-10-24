"use client"

import { Loader2, Pencil, Save } from 'lucide-react'
import Link from 'next/link'
import PortfolioCard from './PortfolioCard'
import Image from 'next/image'
import UzerInterface from '@/types/Uzer'
import ConfirmModal from './ConfirmModal'
import { useState } from 'react'
import { useFetch as myUseFetch } from '@/hooks/useFetch'
import { parseCookies } from 'nookies'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

export default function Editpage({ uzerData: { photoUrl, nome, servicosPrestados, bannerImage, portfolio, _id } }: { uzerData: UzerInterface }) {

  const [nomeValue, setNomeValue] = useState<string>(nome)
  const [photoUrlValue, setPhotoUrlValue] = useState<string>(photoUrl)

  function changePhoto() {
    setModalInfo({
      title: "Mudar foto de perfil",
      label: "Escreva o endereço da imagem:",
      valueSetter: setPhotoUrlValue,
      prevValue: photoUrl
    })
    setShowModal(true);
  }

  function changeName() {
    setModalInfo({
      title: "Mudar nome",
      label: "Novo nome:",
      valueSetter: setNomeValue,
      prevValue: nome
    })
    setShowModal(true);
  }

  const [modalInfo, setModalInfo] = useState<any>({
    title: "Escolha um",
    label: "Digite aqui:",
    valueSetter: "",
    prevValue: "",
  })

  async function saveData() {
    setIsSaving(true)
    if (nomeValue !== nome) {
      await myUseFetch(`/uzers/${_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${parseCookies().uezaccesstoken}`
        },
        body: JSON.stringify({
          nome: nomeValue
        })
      }).then((res) => {
        setIsSaving(false)
        alert("Nome atualizado!")
        console.log(res)
      }).catch(error => {
        setIsSaving(false)
        console.error(error)
      })
    }
    if (photoUrlValue !== photoUrl) {
      await myUseFetch(`/uzers/${_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${parseCookies().uezaccesstoken}`
        },
        body: JSON.stringify({
          photoUrl: photoUrlValue
        })
      }).then((res) => {
        setIsSaving(false)
        alert("Foto atualizada!")
        console.log(res)
      }).catch(error => {
        setIsSaving(false)
        console.error(error)
      })
    }
    setIsSaving(false)

  }

  const [showModal, setShowModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  return (
    <>
      {showModal && <ConfirmModal title={modalInfo.title} label={modalInfo.label} valueSetter={modalInfo.valueSetter} closeButtonFunction={() => setShowModal(false)} prevValue={modalInfo.prevValue} />}
      <section className="w-2/3 mobile:w-full desktop:w-full mdscreen:w-full h-full flex flex-col items-center justify-center animate-transitionY">
        <div className="bg-cinzero w-10/12 mobile:w-full desktop:w-full mdscreen:w-full relative">
          <div
            className="w-full h-44 flex flex-col items-center justify-center gap-1 bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition relative"
          >
            <Image
              fill
              src={bannerImage}
              className="transition object-cover object-center rounded-xl" alt="Imagem ilustrativa"
            />
            <h1 className="hidden font-medium z-40 group-hover:block transition text-base px-3 py-1 rounded bg-white text-black">Ver projeto</h1>
          </div>
          <div title='Mudar foto de perfil' onClick={changePhoto} className='w-32 h-32 rounded-full bg-cinzero absolute -bottom-10 left-5 shadow-lg group flex items-center justify-center transition-colors cursor-pointer'>
            <Image fill src={photoUrl} className="rounded-full object-cover group-hover:opacity-30 transition-colors bg-cinzero" alt="Imagem de perfil" />
            <Pencil size={30} className="hidden group-hover:block transition-colors z-50 text-azulao" />
          </div>
        </div>
        <div className="w-10/12 flex items-center mt-24 mb-24 mobile:mb-4 justify-between desktop:flex-col mobile:flex-col mdscreen:flex-col">
          <div className="flex-1 flex flex-col items-start self-start pl-2">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2" title='Mudar nome' onClick={changeName}>{nome} <Pencil size={20} className="text-azulao cursor-pointer" /></h1>
            <h2 className="font-normal text-lg">Habilidade: <strong>{servicosPrestados[0].nomeServico}</strong> </h2>
            <h2 className="font-normal text-base"><strong>{servicosPrestados[0].tipoServico === 'ambos' ? "Online e Presencial" : servicosPrestados[0].tipoServico.toUpperCase()}</strong> </h2>
            {(servicosPrestados[0].tipoServico === 'presencial') || (servicosPrestados[0].tipoServico === 'ambos') && <h2 className="font-medium text-base">Área de atuação: <strong>{servicosPrestados[0].areaAtuacao}km</strong> </h2>}
          </div>
          <Link href="/uzers" className="text-xl font-bold bg-azulao rounded-xl p-3 px-6 text-white flex items-center mt-10 justify-center">
            Enviar Mensagem
          </Link>
        </div>
      </section>
      <section className="flex-1 mobile:w-10/12 desktop:w-10/12 mdscreen:w-10/12 h-full flex flex-col items-center justify-center py-10 mobile:py-1">
        <h1 className="text-4xl font-bold h-1/6 flex justify-center items-center w-full">Portfólio</h1>
        <div className="w-full grid grid-cols-2 p-6 gap-4">
          {portfolio.slice(0, 6).map((item, index) => (
            <PortfolioCard key={index} image={item.image} title={item.title} description={item.description} />
          ))}

        </div>
        <Link href={`/uzers/${_id}/portfolio`} className="text-xl font-bold my-8 flex justify-center items-center hover:underline">Ver Mais</Link>
      </section>
      {(nome !== nomeValue || photoUrl !== photoUrlValue) && <div className="group fixed bottom-5 left-10 rounded-full bg-azulao p-4 cursor-pointer animate-bounce" title='Salvar alterações' onClick={saveData}>
        {isSaving ? <Loader2 size={30} color="white" className="text-azulao mx-auto animate-spin" /> : <>
          <div className="hidden font-bold text-base group-hover:flex flex-col items-center p-2 text-white">
            <h1 className="font-bold text-base">Alterações:</h1>
            {nome !== nomeValue && <h1 className="font-bold text-base text-yellow-300">Nome</h1>}
            {photoUrl !== photoUrlValue && <h1 className="font-bold text-base text-yellow-300">Foto</h1>}
          </div>
          <Save size={30} color="white" className="text-azulao mx-auto group-hover:hidden" />
        </>}
      </div>}
    </>
  )
}
