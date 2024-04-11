import styles from '../styles/Objetivo.module.css'
import Breadcrumbs from "../components/Breadcrumbs";
import BotaoPrincipal from "../components/BotaoPrincipal";
import DestaqueVermelho from "../components/DestaqueVermelho";


export default function Objetivo(){
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
            
            <p className={styles.descricaoSemObjetivo}>Seu objetivo atual é <DestaqueVermelho>Não Definido!</DestaqueVermelho></p>

            <p className={styles.tituloObjetivo}>Informações básicas</p>
            <p className={styles.descricaoObjetivo}>Por favor, informe seu nome e sobrenome para que possamos identificá-lo.</p>
            <forms className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                <label className={styles.descContainer}>Nome</label>
                    <input type="text" id="nome" name="nome" />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.descContainer}>Sobrenome</label>
                    <input type="text" id="sobrenome" name="sobrenome" />
                </div>
            </forms>

            <p className={styles.tituloObjetivo}>IMC</p>
            <p className={styles.descricaoObjetivo}>Vamos calcular seu IMC para descobrir se você precisa perder, manter ou ganhar peso.</p>
            <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                <label className={styles.descContainer}>Peso</label>
                    <input type="text" id="nome" name="nome" />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.descContainer}>Altura</label>
                    <input type="text" id="sobrenome" name="sobrenome" />
                </div>
            </div>
            <div className={styles.buttonContainer}>
            <BotaoPrincipal>
                Descobrir Objetivo
            </BotaoPrincipal>
            </div>
          </main>
        </div>
      );
}
