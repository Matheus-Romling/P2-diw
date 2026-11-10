async function carregarResultado(){
  const mensagem = document.querySelector('#mensagem-resultado');
  const placar = document.querySelector('#placar');
  const modelo = document.querySelector('#modelo-resultado');
  const botaoZerar = document.querySelector('#abrir-confirmacao');

  mensagem.classList.remove('d-none');
  mensagem.textContent = 'Carregando resultado...';
  botaoZerar.disabled = true;

  const participantes = await listarNaRoca();
  const votos = await listarVotos();
  const resultado = calcularResultado(participantes, votos);

  document.querySelector('#total-votos').textContent = votos.length;
  if(votos.length === 1){
    document.querySelector('#legenda-total').textContent = 'voto computado';
  }else{
    document.querySelector('#legenda-total').textContent = 'votos computados';
  }
  document.querySelector('#sem-votos').classList.toggle('d-none', votos.length > 0);
  placar.replaceChildren();

  for(const participante of resultado){
    const item = modelo.content.cloneNode(true);
    const percentual = participante.percentual.toFixed(1).replace('.', ',');

    item.querySelector('img').src = participante.foto;
    item.querySelector('h2').textContent = participante.nome;
    item.querySelector('.progress').setAttribute('aria-label', `Votos de ${participante.nome}`);
    item.querySelector('.progress').setAttribute('aria-valuenow', participante.percentual.toFixed(1));
    item.querySelector('.progress-bar').style.width = `${participante.percentual}%`;
    let legenda;
    if(participante.votos === 1){
      legenda = 'voto';
    }else{
      legenda = 'votos';
    }
    item.querySelector('.contagem').textContent = `${percentual}% (${participante.votos} ${legenda})`;

    if(participante.votos > 0 && participante.votos === resultado[0].votos){
      item.querySelector('.card').classList.add('mais-votado');
      item.querySelector('.progress-bar').classList.replace('barra-votos', 'barra-mais-votado');
      item.querySelector('.badge').classList.remove('d-none');
    }

    placar.appendChild(item);
  }

  botaoZerar.disabled = votos.length === 0;
  mensagem.classList.add('d-none');
}

async function confirmarLimpeza(){
  const botao = document.querySelector('#confirmar-zerar');
  const modal = document.querySelector('#modal-zerar');
  botao.disabled = true;

  await zerarVotos();
  await carregarResultado();
  bootstrap.Modal.getInstance(modal).hide();
  botao.disabled = false;
}

document.querySelector('#confirmar-zerar').addEventListener('click', confirmarLimpeza);
carregarResultado();
