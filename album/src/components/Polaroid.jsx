import { useMemo } from 'react';
import Swal from 'sweetalert2';

function Polaroid({ foto, setFotos }) {
  
  const rotacao = useMemo(() => {
    const graus = Math.floor(Math.random() *10) - 5; 
    return `rotate(${graus}deg)`;
  }, []);

  const DeixarComentario = async () => {
  try {
    
    // Busca os dados atualizados da foto
    const resposta = await fetch(`http://localhost:3000/fotos/${foto.id}`);
    if (!resposta.ok) throw new Error("Erro ao buscar comentários da foto");
    const dadosFoto = await resposta.json();

    // Monta a lista de comentários existentes
    const comentariosHtml = dadosFoto.comentarios?.length > 0
      ? dadosFoto.comentarios.map(c => `<p><strong>${c.nome}</strong>: ${c.comentario}</p>`).join("")
      : "<p>Seja o primeiro a comentar esta memória...</p>";

    Swal.fire({
      html: `
        <h2 class="text-[30px] text-marron font-bold font-Lora italic mb-4">Comentários da Memória: ${foto.titulo}</h2>
        <input type="text" autoComplete='off' class="w-full my-8 border-0 border-b-2 border-black focus:outline-none font-Lora" id="nome" placeholder="Seu Nome" style="width:300px"/>
        <input type="text" autoComplete='off' class="w-full mb-8 border-0 border-b-2 border-black focus:outline-none font-Lora" id="comentario" placeholder="Comentário" style="width:300px;"/>
        <p class="text-sm text-marron font-bold font-Lora italic text-start">Comentários:</p>
        <div style="text-align:left; max-height:150px; overflow-x:auto; margin-bottom:10px; border:2px solid #ccc; padding:10px; border-radius:5px; width:450px;" class='font-Merriweather overflow-scroll' placeholder:text-gray-400 placeholder:font-Merriweather>
          ${comentariosHtml}
        </div>`,

      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Salvar Comentário",
      cancelButtonText: "Cancelar",
      buttonsStyling: false, 

      customClass: {
      confirmButton: 'cursor-pointer bg-[#d1c2a2] border border-marron rounded p-[0.6rem] text-black font-Merriweather font-semibold hover:text-marron  shadow-black transition-shadow hover:shadow-sm shadow-lg py-2 px-4 rounded mr-2',
      cancelButton: 'bg-gray-300 text-marron hover:text-black hover:bg-gray-400 font-Merriweather text-gray-800 font-bold py-2 px-4 rounded font-semibold  shadow-black transition-shadow hover:shadow-sm shadow-lg'
      },

      preConfirm: async () => {
        const nome = document.getElementById('nome').value;
        const comentario = document.getElementById('comentario').value;
        if (nome === "" || comentario === "") {
          Swal.showValidationMessage("Todos os campos são obrigatórios!");
          return false;
        }
        try {
          const resposta = await fetch(`http://localhost:3000/fotos/${foto.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...dadosFoto,
              comentarios: [...dadosFoto.comentarios, { nome, comentario }]
            })
          });
          if (!resposta.ok) throw new Error("Erro ao salvar o Comentário");
          Swal.fire("Sucesso", "Comentário salvo com sucesso!", "success");
        } catch (erro) {
          console.log(`Erro: ${erro.message}`);
          Swal.fire("Erro", "Não foi possível salvar o comentário.", "error");
        }

        // Atualiza a lista de fotos no estado
        try {
          const resposta = await fetch("http://localhost:3000/fotos");
          if (!resposta.ok) throw new Error("Erro ao consultar as fotos");
          const dados = await resposta.json();
          setFotos(dados.reverse());
        } catch (erro) {
          console.log("Erro: ", erro.message);
        }
      }
    });

  } catch (erro) {
    console.error("Erro ao carregar comentários:", erro.message);
  }
};

 async function ExcluirComentario(foto) {
  const confirmacao = await Swal.fire({
    title: "Tem certeza que deseja excluir esta memória?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
    buttonsStyling: false,
    customClass: {
      confirmButton: 'cursor-pointer bg-[#d1c2a2] border border-marron p-[0.6rem] text-black font-Merriweather font-semibold hover:text-marron shadow-black transition-shadow hover:shadow-sm shadow-lg py-2 px-4 rounded mr-2',
      cancelButton: 'bg-gray-300 text-marron hover:text-black hover:bg-gray-400 font-Merriweather font-bold py-2 px-4 rounded shadow-black transition-shadow hover:shadow-sm shadow-lg'
    }
  });

  if (confirmacao.isConfirmed) {
    try {
      const resposta = await fetch(`http://localhost:3000/fotos/${foto.id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) throw new Error("Erro ao excluir a foto");

      Swal.fire({
  title: "Excluído!",
  text: "A memória foi removida com sucesso.",
  icon: "success",
  confirmButtonText: "OK",
  buttonsStyling: false,
  customClass: {
    title: 'text-2xl text-marron font-Lora font-bold italic',
    confirmButton: 'cursor-pointer bg-[#d1c2a2] border border-marron rounded p-[0.6rem] text-black font-Merriweather font-semibold hover:text-marron shadow-black transition-shadow hover:shadow-sm shadow-lg py-2 px-4'
  }
});
      
      // Atualiza o estado removendo a foto deletada
      setFotos((fotosAntigas) => fotosAntigas.filter((f) => f.id !== foto.id));

    } catch (error) {
      Swal.fire("Erro", `Erro ao excluir: ${error.message}`, "error");
    }
  }
}

  return (
    <div className='flex justify-center p-2'>
        
      <div style={{ transform: rotacao }} className="bg-white pt-0 rounded shadow-xl w-62 text-center border-[6px] border-white drop-shadow-md hover:scale-105 transition duration-300">
          <img src={foto.imagem} alt="Foto" className="w-full h-56 object-cover rounded" />
          <div className="bg-white pt-4 pb-2">
            <h2 className="text-lg font-bold font-Lora italic mb-3">{foto.titulo}</h2>
            <p className="text-sm text-gray-600 font-Merriweather ">{foto.local}</p>
            <p className="text-sm text-gray-600 font-Merriweather">{new Date(foto.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">{foto.descricao}</p>
            <div className="flex justify-between items-center mt-6 px-4">
  <div className="flex-1 flex justify-center ">
    <button className="underline cursor-pointer font-Lora font-bold italic" 
      onClick={DeixarComentario}>Comentários</button>
  </div>
  <div >
    <button onClick={() => ExcluirComentario(foto)} classNamme="">
      <img className="w-5 cursor-pointer" src="icondelete.png" alt="Excluir"/>
    </button>
  </div>
</div>
</div>
</div>
</div>
  );
}

export default Polaroid;
