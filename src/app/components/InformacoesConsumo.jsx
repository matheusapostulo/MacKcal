import styles from '../styles/InformacoesConsumo.module.css'

export default function InformacoesConsumo(){
    return(
        <section className={styles.containerRefeicoesConsumo}>
            <div><p>Você está consumindo <span className={styles.quantidadesCaloria}>2925/<span>3012</span></span></p></div>
            <div> <p className={styles.refeicoesConsumoKcal}>Kcal</p> </div>
        </section>
    )
}