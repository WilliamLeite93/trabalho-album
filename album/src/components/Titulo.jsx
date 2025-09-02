import { Link } from 'react-router-dom'

function Titulo() {
  
  return (
    <>
    
    <nav className='bg-[#a18d63] font-Playfair text-2xl text-white flex justify-between items-center'>
      <img src="logo.png" alt="logo" className='w-24 ml-6'/>
        <div className='flex justify-between items-center gap-4'>
          <Link to="/App">Mural de Fotos</Link>&nbsp;&nbsp;
          <Link to="/incluir">Adicionar Memória</Link>&nbsp;&nbsp;
          <Link to="/pesquisa">Pesquisar</Link>&nbsp;&nbsp;
        </div>
    </nav>

    </>
  )
}

export default Titulo 