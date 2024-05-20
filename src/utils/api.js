export async function getUser(){
    try {
        let data = await fetch("http://localhost:8000/usuarios");
        let dataJson = await data.json();
        
        return dataJson;
    } catch (error) {
        
    }
}