import { deleteAlimento } from "@/utils/api";
import styles from "../styles/CardAlimentoUsuario.module.css"
import { FaRegTrashCan } from "react-icons/fa6";

export default function CardAlimentoUsuario({id, alimentoNome, alimentoQuantidade, alimentoCaloriaNumber, atualizarModal}){
    // Deletar um alimento
    const handleDeleteAlimento = async () => {
        let resp = await deleteAlimento(id)
        if(resp.ok){
            // Vamos fazer o fetch dos novos alimentos do componente pai
            atualizarModal()
        }
    }

    return(
        <main className={styles.mainContainer}>
            <section className={styles.containerInfoAlimentos}>
                <p>{alimentoNome}</p>
                <div className={styles.quantidadeECaloria}>
                    <p>{alimentoQuantidade}</p>
                    <p>{alimentoCaloriaNumber} Kcal</p>
                </div>
            </section>
            <button onClick={handleDeleteAlimento} className={styles.iconDelete}>
                <FaRegTrashCan
                    fill="#E4022D"
                />
            </button>
        </main>
    )
}