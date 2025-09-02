import Titulo from './components/Titulo.jsx'
import { useState } from "react"
import { useForm } from "react-hook-form"
import Polaroid from './components/Polaroid.jsx'

  function Pesquisa() {
  const { register, handleSubmit } = useForm()
  const [fotos, setFotos] = useState([])

  async function buscarFotos(data) {
  const termoPesquisa = data.pesquisa.trim(); 

    // **NOVA LÓGICA AQUI:** Se o termo de pesquisa estiver vazio, limpa as fotos e sai.
    if (termoPesquisa === "") {
        setFotos([]); // Limpa a lista de fotos
        alert("Por favor, digite um termo para buscar."); // Opcional: Avisa o usuário
        return;
    }

  try {
  const resposta = await fetch("http://localhost:3000/fotos")
  if (!resposta.ok) {
        // Lança um erro se a resposta não for OK
        throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
      }
  const dados = await resposta.json()

      // 2. Log para verificar os dados completos retornados pela API
      console.log("Dados completos da API:", dados);

  const dadosFiltrados = dados.filter(foto => {
        // Garante que foto.titulo e foto.date existam antes de chamar toUpperCase()
        const tituloFoto = foto.titulo ? foto.titulo.toUpperCase() : '';
        const localFoto = foto.local ? foto.local.toUpperCase() : '';
        const dataFoto = foto.date ? foto.date.toUpperCase() : '';
        const termoPesquisaUpper = data.pesquisa.toUpperCase();

      
        return tituloFoto.includes(termoPesquisaUpper) || dataFoto.includes(termoPesquisaUpper) || localFoto.includes(termoPesquisaUpper);
      });
      
   setFotos(dadosFiltrados); // Atualiza o estado apenas uma vez

      // 3. Log para verificar os dados após o filtro
      console.log("Dados filtrados:", dadosFiltrados);

  if (dadosFiltrados.length === 0) {
  alert("Nenhuma memória foi encontrada com a pesquisa informada.");}

  } catch (erro) {
  console.error("Erro ao buscar ou filtrar memórias:", erro.message); 
  alert(`Ocorreu um erro: ${erro.message}`); 
  }
  }

  const listarFotos = fotos.map(foto => (
  <Polaroid key={foto.id} foto={foto} />
  ))

   return (
  <>
   <Titulo/>
  <div className="min-h-screen bg-beige p-6 text-brown-900">
  <h1 className="text-4xl font-semibold text-center mt-16 font-Playfair underline italic mr-26">Pesquisar Memórias</h1>
  <form className="max-w-md mx-auto my-10  flex gap-4" onSubmit={handleSubmit(buscarFotos)}>
  <input type="text" autoComplete='off' placeholder="Buscar por Memórias..." className="w-full px-4 py-2 rounded border border-[#d1c2a2]  font-Lora focus:outline-none focus:ring-2 focus:ring-[#d6b88f]" {...register("pesquisa")}/>
  <input type="submit" value="Pesquisar" className='cursor-pointer bg-[#d1c2a2] border border-marron rounded p-[0.6rem] text-black font-Lora font-semibold  shadow-black transition-shadow hover:shadow-sm shadow-lg'/>
  </form>
  <div className='flex flex-wrap justify-center gap-10'>
  {listarFotos}
   </div>
  </div>

 </>
 );
}

export default Pesquisa