import styles from './styles/Inicio.module.css'
import DestaqueDegrade from './components/DestaqueDegrade'
import BotaoPrincipal from './components/BotaoPrincipal'
import CardRefeicao from './components/CardRefeicao'
import InformacoesConsumo from './components/InformacoesConsumo'

const refeicoes = [
  {id: 1, periodo: "manhã", alimentos:[{nomeAlimento:"Alimento manhã", quantidade:"100g", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", quantidade:"200g", caloria:500}], totalAlimento:"550"},
  {id: 2, periodo: "tarde", alimentos:[{nomeAlimento:"Alimento tarde", quantidade:"200g", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", quantidade:"200g", caloria:200},], totalAlimento:"250"},
  {id: 3, periodo: "noite", alimentos:[{nomeAlimento:"Alimento noite", quantidade:"200g", caloria:50},{nomeAlimento:"Lorem ipsum dolor sit amet.", quantidade:"200g", caloria:300},], totalAlimento:"350"},
]

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
          <InformacoesConsumo type={"Inicial"}/>
          <section className={styles.containerRefeicoesCards}>
            {refeicoes.map((periodo) => {
                return(
                  <CardRefeicao key={periodo.id} {...periodo}/>
                )
            })}  
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
