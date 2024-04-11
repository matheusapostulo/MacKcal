import styles from '../styles/BotaoPrincipal.module.css'
import Link from "next/link"

export default function BotaoPrincipal(props){
    return(
        <Link className={styles.botaoPrincipal} href={"/Objetivo"}>
            {props.children}
        </Link>
    )
}