"use client"
import styles from './styles/Inicio.module.css'
import DestaqueDegrade from './components/DestaqueDegrade'
import BotaoPrincipal from './components/BotaoPrincipal'
import CardRefeicao from './components/CardRefeicao'
import InformacoesConsumo from './components/InformacoesConsumo'
import { useState, useEffect } from "react"
import { getAllAlimentos, getUser } from '@/utils/api'

export default function Home() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [usuario, setUsuario] = useState(null)
  const [caloriaConsumida, setCaloriaConsumida] = useState(null)
  
  // Vamos colocar um isLoading para não dar tempo de aparecer a tela quando não tem usuário
  const [isLoading, setIsLoading] = useState(true)

  // Setando um timeout para dar tempo de carregar o authState
  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  const checkAndSetUserApi = async () => {
    let user = await getUser()
    if(user.length !== 0){
      setUsuario(user)
    } else {
      setUsuario(null)
    }
  }

  const getAllAlimentosApi = async () => {
    let refeicoes = await getAllAlimentos()
    setRefeicoes(refeicoes)
  }

  // useEffect para buscar usuário
  useEffect(() => {
    checkAndSetUserApi()
  },[])
  
  // useEffect para buscar refeições 
  useEffect(() => {
      if(usuario){
        getAllAlimentosApi()
      }
  },[usuario])

  // useEffect para setar as calorias consumidas
  useEffect(() => {
    if(refeicoes){
      // Calculando o total consumido de todas as refeições de todos os períodos
      let totalConsumidoRefeicoes = refeicoes.reduce((soma, refeicao) => {
        let refeicaoTotalAlimento = refeicao.totalAlimento
        return soma + refeicaoTotalAlimento
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
          <InformacoesConsumo type={"Inicial"} alertCaloria={caloriaConsumida && caloriaConsumida > usuario[0].limite_calorias ? true : false} caloriaConsumida={caloriaConsumida ? caloriaConsumida : 0} limiteCaloria={usuario[0].limite_calorias}/>
          <section className={styles.containerRefeicoesCards}>
            {refeicoes.map((periodo) => <CardRefeicao key={periodo.id} {...periodo} atualizarAlimentos={getAllAlimentosApi}/>)}  
          </section>
        </section> 
      </main>
    )
  } else if(!isLoading) {
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
}
