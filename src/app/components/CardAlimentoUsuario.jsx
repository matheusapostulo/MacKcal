import styles from "../styles/CardAlimentoUsuario.module.css"
import { FaRegTrashCan } from "react-icons/fa6";

export default function CardAlimentoUsuario({alimentoNome, alimentoQuantidade, alimentoCaloriaNumber}){
    return(
        <main className={styles.mainContainer}>
            <section className={styles.containerInfoAlimentos}>
                <p>{alimentoNome}</p>
                <div className={styles.quantidadeECaloria}>
                    <p>{alimentoQuantidade}</p>
                    <p>{alimentoCaloriaNumber} Kcal</p>
                </div>
            </section>
            <button className={styles.iconDelete} onClick={() => console.log("Delete")}>
                <FaRegTrashCan
                    fill="#E4022D"
                />
            </button>
        </main>
    )
}