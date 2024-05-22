const URL = "http://localhost:8000"

/* Função que obtem as refeições de todos os períodos */
export async function getAllAlimentos(){ 
    try {
        let response = await fetch(URL + "/alimentos");
        let data = await response.json();
  
        if( data ) {
            let alimentosManha = data.filter((alimento) => { return alimento.periodo == "manhã"} )
            let alimentosTarde = data.filter((alimento) => { return alimento.periodo == "tarde"} )
            let alimentosNoite = data.filter((alimento) => { return alimento.periodo == "noite"} )
  
            let refeicoes = [
                {
                    id: 1,
                    periodo: "manhã",
                    alimentos: alimentosManha,
                    totalAlimento: alimentosManha.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 )
                } ,
                {
                    id: 2,
                    periodo: "tarde",
                    alimentos: alimentosTarde,
                    totalAlimento: alimentosTarde.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 )
                },
                {
                    id: 3,
                    periodo: "noite",
                    alimentos: alimentosNoite,
                    totalAlimento: alimentosNoite.reduce( (acc, cur) => acc + cur.alimentoCaloriaNumber, 0 )
                }    
            ]
            
            return refeicoes;
        } else {
            return [];
        }
    } catch (e) {
      console.error("Erro na função App::getAlimentos: ", e);
    }
}

/* Função que obtém a refeição de um período em específico */
export async function getAlimentosPorPeriodo(periodo){
    try {
        let response = await fetch(URL + "/alimentos");
        let data = await response.json();

        if( data && data.length > 0 ) {
            let alimentos = data.filter((alimento) => { return alimento.periodo == periodo} )      
            return alimentos;
        } else {
            return [];
        }
    } catch (e) {
      console.error("Erro na função App::getAlimentos: ", e);
    }
}

/* Função que obtem um usuário */
export async function getUser(){
    try {
        let data = await fetch(URL + "/usuarios", { cache: 'no-store' });
        let dataJson = await data.json();
        
        return dataJson;
    } catch (error) {
        console.log(error)
    }
}

/* Função que adiciona uma refeição ao JSON do json-server. */
export const addToJSON = async function( refeicao ) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(refeicao)
        }
        let resp = await fetch(URL + "/alimentos", options)
        let data = await resp.json();
        return data;
    } catch (e) {
        console.error("Erro:", e)
    }
}

/* Função responsável por deletar um alimento do usuário */
export async function deleteAlimento(id){
    try {
        let options = {
            method: "DELETE"
        }
        let res = await fetch(URL + `/alimentos/${id}`, options)
        return res

    } catch (error) {
        console.log(error)
    }
} 