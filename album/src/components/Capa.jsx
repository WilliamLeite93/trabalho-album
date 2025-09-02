import { Link } from 'react-router-dom'
function Capa() {
  return (

<div class="h-screen bg-beige flex items-center justify-center">
  <div class="bg-[url('/paisagem.jpg')] bg-no-repeat bg-cover bg-center  border-[3px] border-marron rounded-2xl w-[80%] h-[77%]  flex flex-col justify-center items-center text-center">
    <h1 class="underline text-5xl font-bold font-Lora text-[#000000] mt-2 mb-4 italic">ÁLBUM DA NOSSA FAMÍLIA</h1>
    <div class="border-[#3d2b1f] mb-4"></div>
    <img src="logo.png" alt="" className='w-[180px]' />
   <p class="text-3xl italic text-white font-Playfair font-bold drop-shadow-[0_1px_1px_#000]">"A Vida é Feita de Memórias, e Cada Foto Conta Uma História."</p>

     <div className='flex gap-4 m-4 '>
    <Link to="/App"><button className='bg-gray-300 text-marron hover:text-black hover:bg-gray-400 font-Merriweather font-bold py-2 px-4 rounded shadow-black transition-shadow hover:shadow-sm shadow-lg underline'>Abrir Memórias</button></Link>
    <Link to="/incluir"><button className='bg-gray-300 text-marron hover:text-black hover:bg-gray-400 font-Merriweather font-bold py-2 px-4 rounded shadow-black transition-shadow hover:shadow-sm shadow-lg underline'>Adicionar Memórias</button></Link>
  </div>
  </div>
 
</div>

    );
}

export default Capa