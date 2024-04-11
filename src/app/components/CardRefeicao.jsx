import styles from "../styles/CardRefeicao.module.css"
import { GiSlicedBread } from "react-icons/gi";
import { GiSausage } from "react-icons/gi";
import { GiChickenLeg } from "react-icons/gi";

export default function CardRefeicao({periodo, alimentos, totalAlimento}){
    return(
        <main className={styles.mainContainer}>
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
                               <li key={alimento.caloria}>
                                    <div>
                                        <p>{alimento.nomeAlimento}</p>
                                        <p>{alimento.caloria}</p>
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
    )
}