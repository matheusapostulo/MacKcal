'use client'
import styles from "../styles/CardRefeicao.module.css"
import { GiSlicedBread } from "react-icons/gi";
import { GiSausage } from "react-icons/gi";
import { GiChickenLeg } from "react-icons/gi";
import { useState } from "react";
import ModalRefeicoes from "./ModalRefeicoes";

export default function CardRefeicao({periodo, alimentos, totalAlimento}){

// State que controla a abertura do modal
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
      setOpen(true)
  }

  const handleClose = () => {
      setOpen(false)
  }
    return(
        <>
        <main onClick={handleOpen} className={styles.mainContainer}>
            <section className={styles.containerConteudo}>
                <section>
                    {periodo == "manhã" ? (
                        <GiSlicedBread
                            size={"100%"}
                            style={{
                                color: "#333333",
                            }}
                        />
                    ):(
                       periodo == "tarde" ? (
                            <GiSausage
                                size={"100%"}
                                style={{
                                color: "#333333",
                                }}
                            />
                       ) : (
                            <GiChickenLeg 
                                size={"100%"}
                                style={{
                                color: "#333333",
                                }}
                            />
                       ))}                    
                </section>

                <h1>{periodo}</h1>

                <section className={styles.listaItens}>
                    <ul>
                        {alimentos.map((alimento) => {
                            return(
                               <li key={alimento.alimentoId}>
                                    <div>
                                        <p>{alimento.alimentoNome}</p>
                                        <p>{alimento.alimentoCaloriaNumber}</p>
                                    </div>
                                </li> 
                            )
                        })}                     
                    </ul>
                </section>
                    
                <section className={styles.caloriasCard}>
                    <p>{totalAlimento}</p>
                </section>
            </section>
        </main>
        <ModalRefeicoes open={open} handleClose={handleClose} totalAlimento={totalAlimento} alimentos={alimentos} periodo={periodo}/>
        </>
    )
}