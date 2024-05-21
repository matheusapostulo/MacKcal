"use client"

import styles from '../styles/Objetivo.module.css'
import Breadcrumbs from "../components/Breadcrumbs";
import DestaqueVermelho from "../components/DestaqueVermelho";
import { useEffect, useState } from 'react';
import { getUser } from '@/utils/api';
import { MdEdit } from "react-icons/md";


export default function Objetivo(){
  // States para verificar se há um usuário ou não
  const [usuario, setUsuario] = useState()
  
  // States para as informações do usuário
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [peso, setPeso] = useState()
  const [altura, setAltura] = useState()
  const [imc, setImc] = useState()
  const [objetivo, setObjetivo] = useState()

  const checkAndSetUser = async function () {
    let user = await getUser()
    setUsuario(user)
  }

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

  const editNameLastName = async (typeElement) => {
    let nomeUser = {
      nome: nome
    }
    let sobrenomeUser = {
      sobrenome: sobrenome
    }

    try {
      let options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: typeElement === "nome" ? JSON.stringify(nomeUser) : JSON.stringify(sobrenomeUser)
      }
      await fetch(`http://localhost:8000/usuarios/${usuario[0].id}`, options)

    } catch (error) {
      console.log(error)
    }
  }

  const editName = async (typeElement) => {
    if(typeElement == "nome" && nome){
      await editNameLastName(typeElement)
    } else if(typeElement == "sobrenome" && sobrenome){
      await editNameLastName(typeElement)
    }
  }

  // UseEffect que verifica e obtem um usuário
  useEffect(() => {
    checkAndSetUser()
  },[])

  useEffect(() => {
    // Vamos verificar se já existe um usuário e editar suas informações, se não existe, vamos pegar tudo agora criar um usuário  
    const createOrEditUser = async () => {
      /* Caso exista um usuário */
      // if(usuario){
      //   /* Aqui tem uma lógica de dar um PATCH nas informações que vai mudar */
      //   return
      // }
      /* Caso não exista um usuário */
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
      createOrEditUser()
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
        
        <p className={styles.descricaoSemObjetivo}>Seu objetivo atual é <DestaqueVermelho>{usuario && usuario[0].objetivo ? usuario[0].objetivo + " peso!" : (objetivo != "" ? objetivo + " peso!" : "Não Definido!") }</DestaqueVermelho></p>

        <p className={styles.tituloObjetivo}>Informações básicas</p>
        <p className={styles.descricaoObjetivo}>Por favor, informe seu nome e sobrenome para que possamos identificá-lo.</p>
        <section className={styles.inputContainer}>
            <div className={styles.inputGroup}>
                <label className={styles.descContainer}>Nome</label>
                <div>
                  <input onChange={(e) => setNome(e.target.value)} type="text" id="nome" name="nome" placeholder={usuario && usuario[0].nome} />
                  { usuario &&
                    <button onClick={() => editName("nome")} className={styles.buttonEdit}>
                      <MdEdit fill="white" />
                    </button>
                  }
                  
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.descContainer}>Sobrenome</label>
                <div>
                  <input onChange={(e) => setSobrenome(e.target.value)} type="text" id="sobrenome" name="sobrenome" placeholder={usuario && usuario[0].sobrenome}/>
                  {
                    usuario &&
                      <button onClick={() => editName("sobrenome")} className={styles.buttonEdit}>
                        <MdEdit fill="white" />
                      </button>
                  }
                  
                </div>
            </div>
        </section>

        <p className={styles.tituloObjetivo}>IMC</p>
        <p className={styles.descricaoObjetivo}>Vamos calcular seu IMC para descobrir se você precisa perder, manter ou ganhar peso.</p>
        <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
            <label className={styles.descContainer}>{"Peso (em KG)"}</label>
                <input onChange={(e) => setPeso(Number(e.target.value))} type="number" id="peso" name="peso" placeholder={usuario && usuario[0].peso}/>
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.descContainer}>{"Altura (em centímetros)"}</label>
                <input onChange={(e) => setAltura(Number(e.target.value))} type="number" id="altura" name="altura" placeholder={usuario && usuario[0].altura}/>
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
