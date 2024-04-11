'use client'

import styles from '../styles/Header.module.css'
import Link from "next/link"
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import Drawer from '@mui/material/Drawer';
import { usePathname} from 'next/navigation'

const navigation = [ 
    { title: "Início", href:"/" }, { title: "Refeições", href:"/Refeicoes" }, { title: "Objetivo", href:"/Objetivo" }
]

export default function Header() {
    // State para controlar o hamburger
    const [open, setOpen] = useState(false);
    // State do next para saber em qual path estamos (iremos definir o estilo da nav)
    const pathname = usePathname();

    // Função para controlar o menu hamburguer
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    };

    return(
        <header className={styles.header}>
            <section className={styles.containerContentHeader}>
                <div className={styles.logo}>
                    <Link href={"/"}>
                        <img src='Logo.svg'/>
                    </Link>
                </div>
                <nav className={styles.navContainer}>
                    <ul className={styles.itensNav}>
                        {navigation.map((item) => {
                            return(
                                <li className={pathname == item.href ?  styles.navDestaqueBottom : styles.navLi} key={item.title}>
                                    <Link href={item.href} className={pathname == item.href ?  styles.navDestaque : null}>{item.title}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                {/* Botão que vai aparecer apenas no mobile, é o menu hamburguer */}
                <button className={styles.hamburgerMenu} onClick={toggleDrawer(true)}>
                    <RxHamburgerMenu size={28}
                        style={{
                            color: '#333333'
                        }}
                    />
                </button>
                {/* Drawer que abre no mobile */}
                <Drawer PaperProps={{sx:{borderTopLeftRadius:10, borderBottomLeftRadius:10}}} open={open} onClose={toggleDrawer(false)} anchor="right">
                    <section className={styles.containerDrawer}>
                        <div>
                            <button className={styles.botaoFecharDrawer} onClick={toggleDrawer(false)}>
                                <IoCloseOutline color={"#333333"} size={30}/>
                            </button>
                        </div>
                        <section className={styles.drawerNavContainer}>
                            <ul>
                                {navigation.map((item) => {
                                    return(
                                        <li className={pathname == item.href ?  styles.drawerNavDestaque : null} key={item.title}>
                                            <Link onClick={toggleDrawer(false)} href={item.href} >{item.title}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                    </section>
                </Drawer>
            </section>
        </header>
    )
}