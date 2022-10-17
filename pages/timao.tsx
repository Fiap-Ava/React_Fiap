import { NextPageContext } from 'next';
import React, {useState, useEffect} from 'react'

type TimaoProps = {
    frase: string;
    autor ?:string;
}
 async function getFrase(){
            const res = await fetch('https://type.fit/api/quotes');
            const data = await res.json();
            const position =Math.floor(Math.random() * data.length);
            const frase = data[position].text;
            const autor = data[position].author;

            return {
                frase, autorc
            }
        }
export default function Timao(props:TimaoProps) {
    const [frase, setFrase] = useState<string | undefined>(props.frase)
    const [autor, setAutor] = useState<string | undefined>(props.autor)
    let contador = 0;
    useEffect(()=>{
//quando o useEffect executa, a primeira vez que a página é carregada e sempre que qualquer alteração acontecer na variável frase
//quando algum elemento é destruido, o useEffect é executado novamente
        getFrase().then((data)=>{ console.log(`Executou ${contador} vez`, data);}); 
        contador++;
       
       
    },[frase, autor]); //aqui estou limitando...

  return (
  <>
    <h1>{frase?frase:"Seja muito bem vindo!"}</h1>
    {autor &&<h2>{autor}</h2>}

    <button onClick={(e)=>setAutor("Isabel Souza")}>Mudar Autor</button>
    <button onClick={(e)=>setFrase("Capricho! É fazer o melhor que você pode, na condição que você tem, enquanto não tem condições melhores, pra fazer melhor ainda!")}>Muda Frase</button>


 </>
  )
}

//DRY - Don't Repeat Yourself
Timao.getInitialProps = async (ctx: NextPageContext) => {

    const res = await fetch('https://type.fit/api/quotes');
    const data = await res.json();
    const position =Math.floor(Math.random() * data.length);
    const frase = data[position].text;
    const autor = data[position].author;
    return {
        frase,
        autor:autor
    }
}

//props é setar o valor dos estados no carregamento da página
//toda página é um conjunto de várias (vários componentes) funções, e cada função é um componente