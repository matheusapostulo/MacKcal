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
  const [refeicoes, setRefeicoes] = useState([]);
  const [usuario, setUsuario] = useState(null)
  const [caloriaConsumida, setCaloriaConsumida] = useState(null)

  const getUsuario = async function () {
    try {
      let data = await fetch("http://localhost:8000/usuarios")
      let dataJson = await data.json()
      if(dataJson.length != 0){
        setUsuario(dataJson)  
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect para buscar usuário
  useEffect(() => {
    getUsuario()
  }, [])
  
  // useEffect para buscar refeições 
  useEffect(() => {
      if(usuario){
        getAlimentos().then((alimento) => setRefeicoes(alimento))
      }
  },[usuario])

  // useEffect para buscar usuário
  useEffect(() => {
    if(refeicoes.length != 0){
      // Calculando o total consumido de todas as refeições de todos os períodos
      let totalConsumidoRefeicoes = refeicoes.reduce((soma, refeicao) => {
        let refeicaoSplit = refeicao.totalAlimento.split(" ")
        let refeicaoTotalAlimentoNumber = parseInt(refeicaoSplit[0])
        return soma + refeicaoTotalAlimentoNumber
      }, 0)
      
      // Setando o resultado em um state
      setCaloriaConsumida(totalConsumidoRefeicoes)
    }
  }, [refeicoes])

  // Se tem objetivo retornamos uma tela personalizada
  if(usuario){
    return(
      <main className={styles.containerComObjetivo}>
        <section className={styles.containerInfoUsuario}>
          <h1>
            Olá, <DestaqueDegrade>{usuario[0].nome}</DestaqueDegrade>
          </h1>
          <p>
            Essas são suas refeições para <span>{usuario[0].objetivo} peso!</span>
          </p>
        </section>
        <section className={styles.containerRefeicoes}>
          {caloriaConsumida &&
            <InformacoesConsumo type={"Inicial"} alertCaloria={caloriaConsumida > usuario[0].limiteCaloria ? true : false} caloriaConsumida={caloriaConsumida ? caloriaConsumida : 0} limiteCaloria={usuario[0].limite_calorias}/>
          }
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
