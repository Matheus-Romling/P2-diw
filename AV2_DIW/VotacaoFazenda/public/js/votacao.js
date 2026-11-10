let votosNestaVisita = 0;

async function votar(participante, botao){
  const mensagem = document.querySelector('#mensagem-voto');
  botao.disabled = true;

  await registrarVoto(participante.id);
  votosNestaVisita++;
  let vezes;
  if(votosNestaVisita === 1){
    vezes = '1 vez';
  }else{
    vezes = `${votosNestaVisita} vezes`;
  }

  mensagem.className = 'alert alert-success';
  mensagem.textContent = `Voto registrado para eliminar ${participante.nome}! Você já votou ${vezes} nesta visita.`;
  botao.disabled = false;
}

function mostrarParticipantes(participantes, modeloId, listaId){
  const modelo = document.querySelector(modeloId);
  const lista = document.querySelector(listaId);

  for(const participante of participantes){
    const item = modelo.content.cloneNode(true);
    item.querySelector('img').src = participante.foto;
    item.querySelector('.card-title').textContent = participante.nome;

    const botao = item.querySelector('button');
    if(botao){
      botao.addEventListener('click', () => votar(participante, botao));
    }

    lista.appendChild(item);
  }
}

async function carregarVotacao(){
  const mensagem = document.querySelector('#mensagem-carregamento');

  const naRoca = await listarNaRoca();
  const foraDaRoca = await listarForaDaRoca();

  mostrarParticipantes(naRoca, '#modelo-roca', '#participantes-roca');
  mostrarParticipantes(foraDaRoca, '#modelo-demais', '#demais-participantes');
  mensagem.classList.add('d-none');
}

carregarVotacao();
