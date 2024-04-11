import styles from "../styles/CardRefeicao.module.css"
import { GiSlicedBread } from "react-icons/gi";

export default function CardRefeicao(){
    return(
        <main className={styles.mainContainer}>
            <section className={styles.containerConteudo}>
                <section>
                    <GiSlicedBread
                        size={"100%"}
                        style={{
                            color: "#333333",
                        }}
                    />
                </section>

                <h1>MANHÃ</h1>

                <section className={styles.listaItens}>
                    <ul>
                        <li>
                            <div>
                                <p>Pão sovado com blá blá blásdfsdf</p>
                                <p>100g</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Pão sovado com blá blásdfsdf blásdfsdf</p>
                                <p>100g</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Pão sovado com blá</p>
                                <p>100g</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Pão sovado com blá</p>
                                <p>100g</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Pão sovado com blá</p>
                                <p>100g</p>
                            </div>
                        </li>
                        
                    </ul>
                </section>
                    
                <section className={styles.caloriasCard}>
                    <p>1201 Kcal</p>
                </section>
            </section>
        </main>
    )
}