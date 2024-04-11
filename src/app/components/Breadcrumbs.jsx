import { RiArrowRightSLine } from "react-icons/ri";
import styles from '../styles/Breadcrumbs.module.css'
import Link from "next/link"

export default function Breadcrumbs({pages}){
    return(
        <nav className={styles.navContainerMain}>
            {pages.map((page) => {
                return(
                    <section className={styles.containerLinks} key={page.id}> 
                        { pages.length != page.id ? (
                            <>
                                <Link href={page.link} className={styles.linkOutraPagina}>{page.pageName}</Link>
                                <RiArrowRightSLine
                                    className={styles.iconArrow}
                                    size={"100%"}
                                    style={{
                                        color:"#33333",
                                    }}
                                />
                            </>
                        ):(
                            <Link href={page.link} className={styles.linkPagina}>{page.pageName}</Link>
                        )}
                    </section>
                )
            })}
        </nav>
    )
}