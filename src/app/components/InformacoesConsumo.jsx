import styles from '../styles/InformacoesConsumo.module.css'

export default function InformacoesConsumo({type, totalAlimento}){
    return(
        <section className={styles.containerRefeicoesConsumo}>
            <div>
                { type == "Inicial" ? (
                        <p> Você está consumindo
                            <span className={styles.quantidadesCaloria}> 2925/
                                <span>3012</span>
                            </span>
                        </p>
                ):(
                    <p> Sua refeição possui
                        <span className={styles.quantidadesCaloria}>
                            <span> {totalAlimento} </span>
                        </span>
                    </p>
                )} 
                    
            </div>
            <div> <p className={styles.refeicoesConsumoKcal}>Kcal</p> </div>
        </section>
    )
}