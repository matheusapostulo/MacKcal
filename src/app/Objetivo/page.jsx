"use client"

import styles from '../styles/Objetivo.module.css'
import Breadcrumbs from "../components/Breadcrumbs";
import DestaqueVermelho from "../components/DestaqueVermelho";
import { useEffect, useState } from 'react';


export default function Objetivo(){
  // States para as informações do usuário
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [peso, setPeso] = useState()
  const [altura, setAltura] = useState()
  const [imc, setImc] = useState()
  const [objetivo, setObjetivo] = useState()

  const calcularObjetivoImc = async () => {
    // Vamos calcular o IMC
    let alturaEmCm = altura/100
    let imcCalculado = peso/(alturaEmCm*alturaEmCm)
    setImc(imcCalculado.toFixed(2))

    // Vamos definir o objetivo com o IMC calculado
    if(imcCalculado > 0 && imcCalculado < 18.5){
      setObjetivo("ganhar")
    } else if(imcCalculado > 18.5 && imcCalculado < 24.9){
      setObjetivo("manter")
    } else if(imcCalculado > 25.0) {
      setObjetivo("perder")
    }
  }
  
  const handleClickObjetivo = async (e) => {
    e.preventDefault()

    // Verificando se os campos estão preenchidos
    if(nome != "" && sobrenome != "" && peso != "" && altura != ""){
      // Chamando a função para calcular o IMC e objetivo e setar os states
      await calcularObjetivoImc()
    }
  }

  useEffect(() => {
    // Vamos pegar tudo agora e criar o usuário
    const createUser = async () => {
      // Criando um objeto com os dados para mandar para o post
      let dados = {
        nome: nome,
        sobrenome: sobrenome,
        peso: peso,
        altura: altura,
        imc: imc,
        objetivo: objetivo,
        limite_calorias: objetivo === "perder" ? 1500 : (objetivo === "manter" ? 2000 : (objetivo === "ganhar" ? 2500 : null))
      }
  
      try {
        let options = {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
        }
        await fetch("http://localhost:8000/usuarios", options)
  
      } catch (error) {
        console.log(error)
      }
    }

    // Se tiver um objetivo, cria o usuário
    if(objetivo){
      createUser()
    }
  }, [objetivo])
  
  return (
    <div>
      <Breadcrumbs
        pages={[
          { id: 1, link: "/", pageName: "Início" },
          { id: 2, link: "/Objetivo", pageName: "Objetivo" },
        ]}
      />
      <main className={styles.containerSemObjetivo}>
        <section className={styles.tituloDescricao}>
            <h1 className={styles.titleSemObjetivo}>Objetivo</h1>
            <p className={styles.mensagemObjetivo}>Insira suas informações, receba um objetivo.</p>
        </section>
        
        <p className={styles.descricaoSemObjetivo}>Seu objetivo atual é <DestaqueVermelho>{objetivo != "" ? objetivo + " peso!" : "Não Definido!"}</DestaqueVermelho></p>

        <p className={styles.tituloObjetivo}>Informações básicas</p>
        <p className={styles.descricaoObjetivo}>Por favor, informe seu nome e sobrenome para que possamos identificá-lo.</p>
        <section className={styles.inputContainer}>
            <div className={styles.inputGroup}>
            <label className={styles.descContainer}>Nome</label>
                <input onChange={(e) => setNome(e.target.value)} type="text" id="nome" name="nome" />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.descContainer}>Sobrenome</label>
                <input onChange={(e) => setSobrenome(e.target.value)} type="text" id="sobrenome" name="sobrenome" />
            </div>
        </section>

        <p className={styles.tituloObjetivo}>IMC</p>
        <p className={styles.descricaoObjetivo}>Vamos calcular seu IMC para descobrir se você precisa perder, manter ou ganhar peso.</p>
        <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
            <label className={styles.descContainer}>{"Peso (em KG)"}</label>
                <input onChange={(e) => setPeso(Number(e.target.value))} type="number" id="peso" name="peso" />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.descContainer}>{"Altura (em centímetros)"}</label>
                <input onChange={(e) => setAltura(Number(e.target.value))} type="number" id="altura" name="altura" />
            </div>
        </div>
        <div className={styles.buttonContainer}>
        <button onClick={handleClickObjetivo} className={styles.botaoObjetivo}>
            Definir Objetivo
        </button>
        </div>
      </main>
    </div>
  );
}
