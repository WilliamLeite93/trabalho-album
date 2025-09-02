import Titulo from './components/Titulo.jsx'
import {useForm} from "react-hook-form"

function Incluir() {
const{ register, handleSubmit} = useForm()
  
  async function adicionarFotos(data) {

    const titulo = data.titulo
    const local = data.local
    const date = data.date
    const imagem = data.imagem
    const descricao = data.descricao
    const nome = []
    const comentarios = []


    try{
      const resposta = await fetch("http://localhost:3000/fotos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          local,
          date,
          descricao,
          imagem,
          nome,
          comentarios
        })
      })
      if(!resposta.ok) throw new Error("Erro ao adicionar a foto")
      const novaFoto = await resposta.json();
      alert(`OK, Foto adicionada ao album com sucesso! ${novaFoto.id}`)
        
      }catch(error) {
        alert(`Erro: ${error.message}`)
      
      }
  }


    return (
      <div className="bg-beige min-h-screen">
        <Titulo/>
        <div className="flex flex-row-reverse justify-between">
        <h1 className='flex items-center text-[60px] text-center font-Playfair leading-24 mr-14'>Guarde Aqui Os Momentos Que Merecem Viver Para Sempre!</h1>
        <form onSubmit={handleSubmit(adicionarFotos)} className='bg-[#d1c2a2] shadow-black transition-shadow hover:shadow-xl shadow-lg rounded-lg p-8 w-full max-w-md m-24'>
        <p className=''>
        <label htmlFor="titulo" className='block mb-2 text-normal font-bold text-black font-Lora'>Título da Foto</label>
        <input type="text" id='titulo' required autoComplete='off' className='w-full px-3 py-2 border-1 border-marron bg-bege rounded focus:ring-1 focus:ring-marron focus:border-marron focus:outline-none focus:bg-creme focus:font-Playfair focus:font-semibold mb-4'
        {...register("titulo")}/></p>

        <div className='flex flex-col '>
        <p className=''>
        <label htmlFor="local" className='block mb-2 text-normal font-bold text-black font-Lora'>Local da Foto</label>
        <input type="text" id='local' required autoComplete='off' className='w-full px-3 py-2 border-1 border-marron bg-bege rounded focus:ring-1 focus:ring-marron focus:border-marron focus:outline-none focus:bg-creme mb-4'
        {...register("local")}/></p>
        </div>

        <div className='flex flex-col '>
        <p className='flex flex-col'>
        <label htmlFor="date" className='block mb-2 text-normal font-bold text-black font-Lora'>Data da Foto</label>
        <input type="date" id='date' required autoComplete='off' className='w-full px-3 py-2 border-1 border-marron bg-bege rounded focus:ring-1 focus:ring-marron focus:border-marron focus:outline-none focus:bg-creme mb-4' {...register("date")}/></p>
        </div>

        <p className='flex flex-col'>
        <label htmlFor="imagem" className='block mb-2 text-normal font-bold text-black font-Lora'>Link da Imagem</label>
        <input type="url" id='imagem' required autoComplete='off' className='w-full px-3 py-2 border-1 border-marron bg-bege rounded focus:ring-1 focus:ring-marron focus:border-marron focus:outline-none focus:bg-creme mb-4'{...register("imagem")}/>
        </p>
        <p className='flex flex-col my-10 gap-2'>
        <label htmlFor="descricao" className='block mb-2 text-normal font-bold text-black font-Lora'>Descreva a foto</label>
        <textarea id="descricao" required  className="w-full px-3 py-2 border-1 border-marron bg-creme rounded focus:ring-1 focus:ring-marron focus:border-marron focus:outline-none mb-4"
        {...register("descricao")}
        rows={3}></textarea>
        </p>
        
        <input type="submit" value="Adicionar" className='cursor-pointer ml-[17px] w-[90%] bg-marron text-white font-semibold py-2 rounded hover:bg-amber-950 transition mb-4'/>
        <input type="reset" value="Limpar Formulário" className='cursor-pointer ml-[17px] w-[90%] bg-marron text-white font-semibold py-2 rounded hover:bg-amber-950 transition'/>
        </form>
        </div>
      </div>
       
    )

}
export default Incluir