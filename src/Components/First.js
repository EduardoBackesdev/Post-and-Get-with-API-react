import {useState, useEffect} from 'react'

// Url para acessar a API
const url = "http://localhost:3000/products";

const First = ()=>{

    // Resgatar os dados da API
    
    // criando o useState do array de objetos que vamos receber, e salvar no useState
    const [products, setProducts] = useState([]);

    // Criando Hook para executar a consulta apenas uma vez
    useEffect(()=>{
        
        async function fetchData(){

            // Lembrar de sempre colocar o await
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data)

        } fetchData();

    },[])

    // Enviar os dados para a API
    // Criando os Hooks dos dados que estou enviando para o banco
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();

    // Criando o array de objetos para mandar para o banco
    const product = {
        name,
        price,
    };

    // codigo para fetch para mandar para API
    const res = await fetch(url, 
        
        {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        // transformando texto em json para o banco
        body: JSON.stringify(product)
    })

    // transformando texto em JSON para o codigo
    const addProduct = await res.json();

    // Pego o estado antigo e adiciono o novo com previosState
    setProducts((prevProducts) => [...prevProducts, addProduct]);
    setName("");
    setPrice("");
    

}

    return (
        <div>
            <h2>Lista de produtos</h2>
            <ul>
                {products.map((product)=>(
                    <li key={product.id}>{product.name} e o preco é R$ {product.price} </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome do produto' value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="text" placeholder='Preco do produto' value={price} onChange={(e)=> setPrice(e.target.value)} />
                <input type="submit" value="Cadastrar produto" />
            </form>


        </div>
    )




}

export default First