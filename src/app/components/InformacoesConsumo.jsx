import styles from '../styles/InformacoesConsumo.module.css'

export default function InformacoesConsumo({type, totalAlimento, limiteCaloria, caloriaConsumida, alertCaloria}){
    return(
        <section className={styles.containerRefeicoesConsumo}>
            <div>
                { type == "Inicial" ? (
                        <p> Você está consumindo
                            <span className={alertCaloria ? styles.caloriaConsumidaAlert : styles.caloriaConsumida}> {caloriaConsumida}
                                <span className={styles.limiteCaloria}>/{limiteCaloria}</span>
                            </span>
                        </p>
                ):(
                    <p> Sua refeição possui
                        <span className={styles.caloriaConsumida}>
                            <span className={styles.limiteCaloria}> {totalAlimento} </span>
                        </span>
                    </p>
                )} 
                    
            </div>
            <div> <p className={styles.refeicoesConsumoKcal}>Kcal</p> </div>
        </section>
    )
}