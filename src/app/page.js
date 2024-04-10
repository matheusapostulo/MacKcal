import styles from './styles/Inicio.module.css'
import DestaqueDegrade from './components/DestaqueDegrade'
import BotaoPrincipal from './components/BotaoPrincipal'
import CardRefeicao from './components/cardRefeicao'

export default function Home() {
  // Criando variável para simular como vamos identificar que o usuário já tem um objetivo setado
  const temObjetivo = true

  // Se tem objetivo retornamos uma tela personalizada
  if(temObjetivo){
    return(
      <main className={styles.containerComObjetivo}>
        <section className={styles.containerInfoUsuario}>
          <h1>
            Olá, <DestaqueDegrade>Matheus</DestaqueDegrade>
          </h1>
          <p>
            Essas são suas refeições para <span>Manter Peso!</span>
          </p>
        </section>
        <section className={styles.containerRefeicoes}>
          <section className={styles.containerRefeicoesConsumo}>
            <div><p>Você está consumindo <span className={styles.quantidadesCaloria}>2925/<span>3012</span></span></p></div>
            <div> <p className={styles.refeicoesConsumoKcal}>Kcal</p> </div>
          </section>
          <section className={styles.containerRefeicoesCards}>
            <CardRefeicao/>  
            <CardRefeicao/>  
            <CardRefeicao/>  
          </section>
        </section>
      </main>
    )
  }
  // Se não tem objetivo retornamos a tela que vai levar o user a criar um objetivo
  return (
    <main className={styles.containerSemObjetivo}>
      <h1 className={styles.titleSemObjetivo}>Defina seu <DestaqueDegrade>Objetivo</DestaqueDegrade> e crie <DestaqueDegrade>Refeições</DestaqueDegrade></h1>
      <p className={styles.descricaoSemObjetivo}>Com MacKcal você recebe um objetivo baseado em sua atual condição e cria refeições otimizadas para alcança-lo.</p>
      <section className={styles.botaoSemObjetivo}>
        <BotaoPrincipal>
          Comece já
        </BotaoPrincipal>
      </section>
    </main>
  )
}
