"use client"

import Input from '@/components/Forms/Input/Input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react'

export default function AsideFilters() {
    return (
        <aside className="w-2/12 h-full flex flex-col gap-4 p-2 items-center mobile:w-full desktop:w-4/12">
            <form className="flex flex-col w-full items-center gap-4">
                <h3 className="font-medium text-center">Qual profissional você procura?</h3>
                <div className="flex w-full max-w-[350px] items-center justify-around gap-2 desktop:flex-col">
                    <div className="flex items-center justify-center gap-1">
                        <Input
                            type={"checkbox"}
                            id="online"
                            noLabel
                            label={"Online"}
                            handleChange={() => alert("Teste")}
                        />
                        <label htmlFor="online">Online</label>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <Input
                            type={"checkbox"}
                            id="presencial"
                            label={"Presencial"}
                            noLabel
                            handleChange={() => alert("Teste")}
                        />
                        <label htmlFor="presencial">Presencial</label>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="cargo" title="Cargo" className="self-start text-base font-medium">
                        Cargo:
                    </label>
                    <div className="flex items-center w-full h-10">
                        <input
                            className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none`}
                            type="text"
                            id="cargo"
                            maxLength={200}
                            placeholder="Ex: Designer"
                        />
                        <button
                            title="Buscar"
                            type="button"
                            className="bg-cinzero hover:bg-[#e9e9e9] border-none py-2 px-3 h-full cursor-pointer flex items-center justify-center"
                            onClick={(e) => {
                                e.preventDefault();
                                alert("Teste");
                            }}
                        >
                            <MagnifyingGlassIcon width={20} height={20} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="nome" title="Nome" className="self-start text-base font-medium">
                        Nome:
                    </label>
                    <div className="flex items-center w-full h-10">
                        <input
                            className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none`}
                            type="text"
                            id="nome"
                            maxLength={200}
                            placeholder="Ex: Fulano de tal"
                        />
                        <button
                            title="Buscar"
                            type="button"
                            className="bg-cinzero hover:bg-[#e9e9e9] border-none py-2 px-3 h-full cursor-pointer flex items-center justify-center"
                            onClick={(e) => {
                                e.preventDefault();
                                alert("Teste");
                            }}
                        >
                            <MagnifyingGlassIcon width={20} height={20} />
                        </button>
                    </div>
                </div>
                <button
                    className="px-4 py-2 text-sm font-medium text-center text-white bg-azulao rounded-lg hover:bg-roxazul focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={(e) => {
                        e.preventDefault();
                        alert("Filtro Aplicado");
                    }}
                >Aplicar</button>
            </form>
        </aside>
    )
}
