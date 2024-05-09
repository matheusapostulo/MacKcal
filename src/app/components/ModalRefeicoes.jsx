"use client"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';    
import styles from '../styles/ModalRefeicoes.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import InformacoesConsumo from './InformacoesConsumo';
import CardAlimentoUsuario from './CardAlimentoUsuario';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce'

export default function ModalRefeicoes({open, handleClose, alimentos, totalAlimento}){
    // State relacionado ao input do search
    const [valueInput, setValueInput] = useState("")
    // State da lib use-debounce para colocar um delay no nosso nome de produto do search
    const [valueDebounce] = useDebounce(valueInput, 600)
    // State relacionado aos resultados da pesquisa
    const [alimentosSearch, setAlimentosSearch] = useState(null)
    console.log("Esse é alimentos:",alimentosSearch)

    // State relacionado à abertura da caixa de resultados da pesquisa
    const [openSearchResults, setOpenSearchResults] = useState(false)

    // Função para setar o que foi digitado no input no state
    const handleInput = (e) => {
        setValueInput(e.target.value)
    }

    // Função que vai fazer o fetch dos alimentos e colocar no array de alimentos
    const fetchAlimentos = async (valueDebounce) => {
        try {
            // Fetch do alimento com o nome
            const res = await fetch(`/api/alimentos/?query=${valueDebounce}`);
            // Convertendo para json
            const alimentosArrayRes = await res.json()

            console.log(alimentosArrayRes)

            setAlimentosSearch(alimentosArrayRes)
            
        } catch (error) {
            console.log("Error:", error)
        }
    }

    // Sempre que o valueInput for maior que 3, vamos fazer a requisição do alimento e obter os resultados
    useEffect(() => {
        // Só faremos a requisição quando o tamanho do input for maior que 3
        if(valueDebounce.length >= 3){
            // Fazendo a requisição e setando o resultado em um state de resultados
            fetchAlimentos(valueDebounce)
        } else if(valueDebounce.length == 0){
            setOpenSearchResults(false)
            setAlimentosSearch(null)
        }
    }, [valueDebounce])

    // UseEffect que verifica se tem resultado no nosso array de alimentos, se tiver, vamos abrir o container dos resultados
    useEffect(() => {
        if(alimentosSearch){
            setOpenSearchResults(true)
        }
    }, [alimentosSearch])

    // Função que verifica se há algo no valueInput e abre a caixa dos resultados da pesquisa
    const handleClickInput = () => {
        if(valueDebounce.length >= 3){
            setOpenSearchResults(true)
        }
    }

    /* 
        A função abaixo vai ser responsável por lidar com o fechamento do modal, ela será responsável 
        por zerar os states de input e dos controles de abertura dos elementos da tela.
    */ 
    const handleCloseModal = () => {
        setValueInput("")
        setOpenSearchResults(false)
        // Chamando a função handleClose que vem nos parâmetros e é chamada no componente pai do ModalRefeicoes
        handleClose()
    }
    
    return(
        <Dialog
            open={open}
            onClose={handleCloseModal}
            maxWidth={'xl'}
            fullWidth={true}
        >
            <main className={styles.mainContainer}> 
                <DialogActions className={styles.areaFechar}>
                    <button className={styles.botaoFecharDrawer} onClick={handleCloseModal}>
                        <IoCloseOutline color={"#333333"}/>
                    </button>
                </DialogActions>
                <DialogContent className={styles.contentContainer}>
                    <section className={styles.searchBar}>
                            <div>
                                <input onClick={handleClickInput} onChange={handleInput} placeholder="Pesquisar alimento"/>
                            </div>
                            {
                                !openSearchResults ? (
                                    <div className={styles.iconSearch}>
                                        <AiOutlineSearch
                                            style={{
                                                color: "#333333",
                                            }}
                                        />
                                    </div>
                                ):(
                                    <div onClick={() => setOpenSearchResults(false)} className={styles.iconCloseSearch}>
                                        <IoCloseOutline color={"#333333"}/>
                                    </div>
                                )
                                }
                                
                           
                    </section>

                    {/* Resultados da pesquisa */}
                    <section className={openSearchResults ? styles.searchResultsContainer : styles.hiddenSearchResultsContainer}>
                        <section className={styles.searchAreaResults}>
                            { alimentosSearch &&
                                alimentosSearch.length > 0 ? (
                                    alimentosSearch.map((alimento) => {
                                        return(
                                            <div className={styles.containerItemResult}>
                                                <p>{alimento.descricao}</p>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>Nenhum resultado para "{valueDebounce}"</p>
                                )
                                
                            }
                        </section>
                    </section>

                    {/* Informações de consumo do usuário */}
                    <InformacoesConsumo type={"modalRefeicoes"} totalAlimento={totalAlimento}/>

                    {/* Renderizando os alimentos */}
                    <section className={!openSearchResults ? styles.cardsAlimentos : styles.cardsAlimentosHidden}>
                        { alimentos.map((alimento) => {
                            return(
                                // A key do alimento pode ser um id que o alimento da api pode proporcionar
                                <CardAlimentoUsuario key={alimento.caloria} {...alimento}/>
                            )
                        })}
                    </section>
                </DialogContent>
            </main>
        </Dialog>
    )
}