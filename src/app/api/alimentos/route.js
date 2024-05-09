const { NextResponse } = require("next/server");

export async function GET(req){
    try {
        // Obtendo a query pelo search params
        const request_query = req.nextUrl.searchParams
        const query = request_query.get("query")

        // Vamos fazer o fetch na api de alimentos
        const res = await fetch(`https://caloriasporalimentoapi.herokuapp.com/api/calorias/?descricao=${query}`);

        // Convertendo para json
        const alimentosArrayRes = await res.json()

        return NextResponse.json(alimentosArrayRes);
    } catch (error) {
        console.log(error)
    }
}