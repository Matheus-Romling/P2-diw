async function carregarHome(){
  const mensagem = document.querySelector('#mensagem-home');
  const lista = document.querySelector('#participantes-roca');
  const modelo = document.querySelector('#modelo-participante');

  const participantes = await listarNaRoca();

  for(const participante of participantes){
    const item = modelo.content.cloneNode(true);
    item.querySelector('img').src = participante.foto;
    item.querySelector('span').textContent = participante.nome;
    lista.appendChild(item);
  }

  mensagem.classList.add('d-none');
}

carregarHome();
