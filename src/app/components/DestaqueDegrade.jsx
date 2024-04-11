import styles from '../styles/DestaqueDegrade.module.css'

export default function DestaqueDegrade(props){
    return(
        <span className={styles.destaqueDegrade}>{props.children}</span>
    )
}