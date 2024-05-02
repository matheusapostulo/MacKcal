import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';    
import styles from '../styles/ModalRefeicoes.module.css';
import { AiOutlineSearch } from "react-icons/ai";

export default function ModalRefeicoes({open, handleClose}){
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'xl'}
            fullWidth={true}
        >
            <main className={styles.mainContainer}> 
                <DialogActions className={styles.areaFechar}>
                    <button onClick={handleClose} autoFocus>
                        Fechar
                    </button>
                </DialogActions>
                <DialogContent>
                    <section className={styles.searchBar}>
                            <div>
                                <input placeholder="Digite o elemento que deseja adicionar..."/>
                            </div>
                            <div className={styles.icon}>
                                <AiOutlineSearch
                                    style={{
                                        color: "#333333",
                                    }}
                                />
                            </div>
                    </section>
                </DialogContent>
            </main>
        </Dialog>
    )
}