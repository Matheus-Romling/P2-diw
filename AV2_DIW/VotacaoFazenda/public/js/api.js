async function listarNaRoca(){
  const resposta = await fetch('/participantes?naRoca=true');
  return resposta.json();
}

async function listarForaDaRoca(){
  const resposta = await fetch('/participantes?naRoca=false');
  return resposta.json();
}

async function listarVotos(){
  const resposta = await fetch('/votos');
  return resposta.json();
}

function registrarVoto(participanteId){
  return fetch('/votos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ participanteId, data: new Date().toISOString() })
  });
}

async function zerarVotos(){
  const votos = await listarVotos();
  const exclusoes = [];

  for(const voto of votos){
    const exclusao = fetch(`/votos/${voto.id}`, { method: 'DELETE' });
    exclusoes.push(exclusao);
  }

  await Promise.all(exclusoes);
}

function calcularResultado(participantes, votos){
  const resultado = [];

  for(const participante of participantes){
    let quantidade = 0;

    for(const voto of votos){
      if(voto.participanteId === participante.id){
        quantidade++;
      }
    }

    let percentual = 0;
    if(votos.length > 0){
      percentual = (quantidade / votos.length) * 100;
    }

    resultado.push({
      nome: participante.nome,
      foto: participante.foto,
      votos: quantidade,
      percentual: percentual
    });
  }

  return resultado.sort((primeiro, segundo) => segundo.votos - primeiro.votos);
}
