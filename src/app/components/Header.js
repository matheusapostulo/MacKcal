'use client'

import styles from '../styles/Header.module.css'
import Link from "next/link"
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import Drawer from '@mui/material/Drawer';

const navigation = [ 
    { title: "Início", href:"/" }, { title: "Refeições", href:"/Teste" }, { title: "Sobre", href:"teste" }
]

export default function Header() {
    const [open, setOpen] = useState(false);

    console.log(open)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    };

    return(
        <header className={styles.header}>
            <section className={styles.containerContentHeader}>
                <section>
                    <div>Logo</div>
                </section>
                <nav className={styles.navContainer}>
                    <ul className={styles.itensNav}>
                        {navigation.map((item) => {
                            return(
                                <li key={item.title}>
                                    <Link href={item.href} className="">{item.title}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <section className={styles.perfilUser}>
                    Perfil
                </section>
                {/* Botão que vai aparecer apenas no mobile, é o menu hamburguer */}
                <button className={styles.hamburgerMenu} onClick={toggleDrawer(true)}>
                    <RxHamburgerMenu size={28}
                        style={{
                            color: '#333333'
                        }}
                    />
                </button>
                {/* Drawer que abre no mobile */}
                <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
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
                                        <li key={item.title}>
                                            <Link onClick={toggleDrawer(false)} href={item.href} className={`text-lg`}>{item.title}</Link>
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