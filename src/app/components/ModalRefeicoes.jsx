import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';    
import styles from '../styles/ModalRefeicoes.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import InformacoesConsumo from './InformacoesConsumo';

export default function ModalRefeicoes({open, handleClose, alimentos}){
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'xl'}
            fullWidth={true}
        >
            <main className={styles.mainContainer}> 
                <DialogActions className={styles.areaFechar}>
                    <button className={styles.botaoFecharDrawer} onClick={handleClose}>
                        <IoCloseOutline color={"#333333"}/>
                    </button>
                </DialogActions>
                <DialogContent className={styles.contentContainer}>
                    <section className={styles.searchBar}>
                            <div>
                                <input placeholder="Pesquisar alimento"/>
                            </div>
                            <div className={styles.iconSearch}>
                                <AiOutlineSearch
                                    style={{
                                        color: "#333333",
                                    }}
                                />
                            </div>
                    </section>
                    <InformacoesConsumo type={"modalRefeicoes"}/>

                    <section>
                        {
                            alimentos.map((alimento) => {
                                return(
                                    <p key={alimento.nomeAlimento}>{alimento.nomeAlimento}</p>
                                )
                            })
                        }
                    </section>
                </DialogContent>
            </main>
        </Dialog>
    )
}