import Breadcrumbs from "../components/Breadcrumbs";
import CardRefeicao from "../components/CardRefeicao";
import InformacoesConsumo from "../components/InformacoesConsumo";
import styles from "../styles/Refeicao.module.css"
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

const refeicoes = [
    {id: 1, periodo: "manhã", alimentos:[{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:200}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:300}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:450}], totalAlimento:"1000 Kcal"},
    {id: 2, periodo: "tarde", alimentos:[{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:200}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:300}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:450}], totalAlimento:"1000 Kcal"},
    {id: 3, periodo: "noite", alimentos:[{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:200}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:300}, {nomeAlimento:"Lorem ipsum dolor sit amet.", caloria:450}], totalAlimento:"1000 Kcal"},
]

export default function Refeicoes(){
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