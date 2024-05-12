"use client"
import Breadcrumbs from "../components/Breadcrumbs";
import CardRefeicao from "../components/CardRefeicao";
import InformacoesConsumo from "../components/InformacoesConsumo";
import styles from "../styles/Refeicao.module.css"
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { useEffect, useState } from "react";


/*const refeicoes = [
    {id: 1, periodo: "manhã", alimentos:[{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:200}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:300}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:450}], totalAlimento:"1000 Kcal"},
    {id: 2, periodo: "tarde", alimentos:[{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:200}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:300}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:450}], totalAlimento:"1000 Kcal"},
    {id: 3, periodo: "noite", alimentos:[{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:200}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:300}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:450}], totalAlimento:"1000 Kcal"},
]*/

const getAlimentos = async function () {
    try {
        let response = await fetch(`http://localhost:8000/alimentos`);
        let data = await response.json();

        if( data && data.length > 0 ) {
            let alimentosManha = data.filter((alimento) => { return alimento.periodo == "manhã"} )
            let alimentosTarde = data.filter((alimento) => { return alimento.periodo == "tarde"} )
            let alimentosNoite = data.filter((alimento) => { return alimento.periodo == "noite"} )

            let refeicoes = [
                {
                    id: 1,
                    periodo: "manhã",
                    alimentos: alimentosManha,
                    totalAlimento: alimentosManha.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 ) + " Kcal"
                } ,
                {
                    id: 2,
                    periodo: "tarde",
                    alimentos: alimentosTarde,
                    totalAlimento: alimentosTarde.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 ) + " Kcal"
                },
                {
                    id: 3,
                    periodo: "noite",
                    alimentos: alimentosNoite,
                    totalAlimento: alimentosNoite.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 ) + " Kcal"
                }    
            ]
            return refeicoes;
        } else {
            return [];
        }
    } catch (e) {
        console.error("Erro na função Refeicoes::getAlimentos: ", e);
    }
}

export default function Refeicoes() {
    const [refeicoes, setRefeicoes] = useState([]);
    
    useEffect(() => {
        getAlimentos().then((alimento) => setRefeicoes(alimento))
    },[refeicoes])

    return(
        <>
            <Breadcrumbs pages={[
                {id: 1, link: "/", pageName: "Início"},
                {id: 2, link: "/Refeicoes", pageName: "Refeições"},
            ]}/>

            <main>
                <section className={styles.tituloDescricao}>
                    <h1>Refeições</h1>
                    <p>Monte refeições a partir do seu objetivo.</p>
                </section>
                <section className={styles.controleRefeicoes}>
                    <section className={styles.searchBar}>
                        <div>
                            <input placeholder="Digite o elemento que deseja adicionar..."/>
                        </div>
                        <div className={styles.icon}>
                            <AiOutlineSearch
                                style={{
                                    color: "#333333",
                                }}
                            />
                        </div>
                    </section>
                    <section className={styles.controleRefeicoesPeriodoBotoes}>
                        <section className={styles.selectContainer}>
                            <div>
                                <p>Tarde</p>
                            </div>
                            <div className={styles.icon}>
                                <IoIosArrowDown
                                    size={"120%"}
                                    style={{
                                        color: "#333333",
                                    }}
                                />
                            </div>
                        </section>
                        <section className={styles.addOrRemove}>
                            <button>+</button>
                            <button>-</button>
                        </section>
                    </section>
                </section>
                <section className={styles.containerComObjetivo}>
                    <section className={styles.containerRefeicoes}>
                        <InformacoesConsumo/>
                        <section className={styles.containerRefeicoesCards}>
                            {refeicoes.map((periodo) => {
                                return(
                                    <CardRefeicao key={periodo.id} {...periodo}/>
                                )
                            })}
                        </section>
                    </section>
                </section>

            </main>  
        </>
    )
}