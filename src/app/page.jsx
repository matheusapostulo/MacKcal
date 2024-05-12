"use client"
import styles from './styles/Inicio.module.css'
import DestaqueDegrade from './components/DestaqueDegrade'
import BotaoPrincipal from './components/BotaoPrincipal'
import CardRefeicao from './components/CardRefeicao'
import InformacoesConsumo from './components/InformacoesConsumo'
import { useState, useEffect } from "react"


const getAlimentos = async function () {
  try {
      let response = await fetch(`http://localhost:8000/alimentos`);
      let data = await response.json();

      if( data && data.length > 0 ) {
          let alimentosManha = data.filter((alimento) => { return alimento.periodo == "manhã"} )
          let alimentosTarde = data.filter((alimento) => { return alimento.periodo == "tarde"} )
          let alimentosNoite = data.filter((alimento) => { return alimento.periodo == "noite"} )

          let refeicoes = [
              {
                  id: 1,
                  periodo: "manhã",
                  alimentos: alimentosManha,
                  totalAlimento: alimentosManha.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 ) + " Kcal"
              } ,
              {
                  id: 2,
                  periodo: "tarde",
                  alimentos: alimentosTarde,
                  totalAlimento: alimentosTarde.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 ) + " Kcal"
              },
              {
                  id: 3,
                  periodo: "noite",
                  alimentos: alimentosNoite,
                  totalAlimento: alimentosNoite.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 ) + " Kcal"
              }    
          ]
          return refeicoes;
      } else {
          return [];
      }
  } catch (e) {
      console.error("Erro na função App::getAlimentos: ", e);
  }
}


export default function Home() {
  // Criando variável para simular como vamos identificar que o usuário já tem um objetivo setado
  const temObjetivo = true

  const [refeicoes, setRefeicoes] = useState([]);
    
    useEffect(() => {
        getAlimentos().then((alimento) => setRefeicoes(alimento))
    },[refeicoes])

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
