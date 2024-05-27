import styles from '../styles/Sobre.module.css'
import Breadcrumbs from "../components/Breadcrumbs";
import BotaoPrincipal from "../components/BotaoPrincipal";
import DestaqueDegrade from '../components/DestaqueDegrade'
import DestaqueVermelho from "../components/DestaqueVermelho";


export default function Objetivo(){
    return (
        <div>
          <Breadcrumbs
            pages={[
              { id: 1, link: "/", pageName: "Início" },
              { id: 2, link: "/Sobre", pageName: "Sobre" },
            ]}
          />
          <main className={styles.containerSemObjetivo}>
            <section className={styles.tituloDescricao}>
                <h1 className={styles.titleSemObjetivo}>Sobre</h1>
                <p className={styles.mensagemObjetivo}>Calcule suas alimentações com <DestaqueDegrade>MacKcal</DestaqueDegrade>.</p>
            </section>
            <p className={styles.descricaoObjetivo}>Em uma jornada rumo a um estilo de vida saudável, conhecer e controlar sua ingestão 
            calórica diária é essencial. Aqui no MacKal, estamos comprometidos em ajudá-lo a atingir seus objetivos de saúde e forma física, 
            fornecendo uma ferramenta intuitiva e eficaz para calcular suas calorias por refeição.</p>

            <img src="/1.png" className={styles.imageResponsive}/>

            <div className={styles.bulletPoints}>
                <ul>
                    <li>
                        <span className={styles.miniTitulo}>REGISTRE SUAS REFEIÇÕES</span> Comece inserindo os alimentos que você consome em cada refeição do dia. De café da manhã revigorante a um jantar reconfortante, cada item conta!
                    </li>
                    <li>
                        <span className={styles.miniTitulo}>CALCULE SEU CONSUMO</span> Com base nas informações fornecidas, nossa calculadora inteligente determina sua ingestão calórica diária por refeição. Assim, você pode monitorar e ajustar sua dieta conforme necessário para alcançar seus objetivos.
                    </li>
                </ul>
            </div>

          </main>
        </div>
      );
}
