import styles from '../styles/DestaqueVermelho.module.css'

export default function DestaqueVermelho(props){
    return(
        <span className={styles.destaqueVermelho}>{props.children}</span>
    )
}