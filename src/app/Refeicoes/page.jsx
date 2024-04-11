import Breadcrumbs from "../components/Breadcrumbs";
import InformacoesConsumo from "../components/InformacoesConsumo";

export default function Refeicoes(){
    return(
        <>
        <Breadcrumbs pages={[
            {id: 1, link: "/", pageName: "Início"},
            {id: 2, link: "/Refeicoes", pageName: "Refeições"},
        ]}/>

        <InformacoesConsumo/>
        </>
    )
}