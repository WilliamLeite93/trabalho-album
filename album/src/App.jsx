import Polaroid from "./components/Polaroid";
import Titulo from "./components/Titulo";
import { useEffect, useState } from "react";

function App() {
  const [fotos, setFotos] = useState([]);
 
  useEffect(() => {
    async function buscarFotos() {
      try {
        const resposta = await fetch("http://localhost:3000/fotos")
        if (!resposta.ok) throw new Error("Erro ao consultar memórias")
        const dados = await resposta.json()
//        console.log(dados)
        setFotos(dados.reverse()) //Inverte a ordem das fotos
      } catch (erro) {
        console.log("Erro: ", erro.message)
      }
    }
    buscarFotos()
  }, [])

  const listaFotos = fotos.map( foto => (
    <Polaroid key={foto.id} foto={foto} setFotos={setFotos} />
  ))
  return (
    <>
    <Titulo />
    <div className="min-h-screen bg-beige p-24 text-brown-900 font-serif">
      <section className="text-center mb-24">  
       <h1 className="text-4xl font-semibold font-Playfair italic underline">Lista de Memórias da Família</h1>
     <div className="flex flex-wrap justify-center gap-10 mt-16">
      {listaFotos}
    </div>
    </section>

    </div>
   
  
    </>
    )
    }

    export default App