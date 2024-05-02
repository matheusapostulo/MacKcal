import styles from "../styles/CardAlimentoUsuario.module.css"
import { FaRegTrashCan } from "react-icons/fa6";

export default function CardAlimentoUsuario({nomeAlimento, quantidade, caloria}){
    return(
        <main className={styles.mainContainer}>
            <section className={styles.containerInfoAlimentos}>
                <p>{nomeAlimento}</p>
                <div className={styles.quantidadeECaloria}>
                    <p>{quantidade}</p>
                    <p>{caloria} Kcal</p>
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