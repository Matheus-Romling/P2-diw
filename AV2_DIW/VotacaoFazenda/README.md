# Votação A Fazenda 2026

Projeto da AV2 de Desenvolvimento de Interfaces Web, feito com HTML, CSS, JavaScript, Bootstrap 5 e JSON Server, conforme o enunciado de AV2_DIW.pdf.

## Como executar

No terminal, entre na pasta que contém o arquivo package.json:

```bash
cd AV2_DIW/VotacaoFazenda
npm install
npm start
```

Abra http://localhost:3000/ no navegador. No PowerShell, se a execução de scripts estiver bloqueada, use `npm.cmd install` e `npm.cmd start`.

O script de inicialização é `json-server --watch db.json --port 3000`. O mesmo servidor disponibiliza a API e as páginas da pasta public. O Bootstrap e as imagens já estão no projeto; depois da instalação, não é preciso acessar um CDN. Os textos usam Arial e os títulos usam Georgia, com alternativas nativas do sistema, sem importar arquivos de fontes.

## Páginas

- **Início:** foto do fazendeiro, boas-vindas, links para votar e ver a parcial e participantes da roça carregados pela API.
- **Votar:** três cards da roça com botão para eliminar e os demais participantes em cards menores, sem botão. Cada voto confirmado mostra um alert com o nome e quantas vezes você votou na visita atual à página. Essa contagem reinicia ao recarregar ou sair da página; os votos continuam no servidor.
- **Resultado:** total de votos, quantidade e percentual por participante, em ordem decrescente. Os mais votados recebem o selo “Sairia hoje”. Sem votos, aparece um convite para votar. A limpeza exige confirmação no modal e apaga cada voto pela API.

## Organização

```text
VotacaoFazenda/
├── package.json
├── package-lock.json
├── db.json
├── prints/                     Capturas de referência fornecidas
└── public/
    ├── index.html
    ├── votacao.html
    ├── resultado.html
    ├── css/style.css           Tema da fazenda
    ├── js/
    │   ├── api.js              Requisições e cálculo dos percentuais
    │   ├── home.js             Participantes na página inicial
    │   ├── votacao.js          Cards e registro dos votos
    │   └── resultado.js        Placar e confirmação da limpeza
    ├── fonts/                 Arquivos fornecidos, sem uso nas páginas
    ├── img/                   Logo, fazendeiro e participantes
    └── lib/bootstrap/         Bootstrap 5 local
```

## Dados e requisições

O arquivo `db.json` contém os 26 participantes fornecidos e a coleção `votos`, inicialmente vazia. Nenhum voto é guardado no localStorage.

| Método | Rota | Uso |
| --- | --- | --- |
| GET | /participantes?naRoca=true | Participantes da roça |
| GET | /participantes?naRoca=false | Demais participantes |
| GET | /votos | Contagem e consulta dos votos para limpeza |
| POST | /votos | Registro de um voto com participanteId e data |
| DELETE | /votos/:id | Exclusão de cada voto ao zerar a votação |

Os nomes e as fotos dos participantes são preenchidos pelo JavaScript a partir da API. As fotos ficam em `public/img/participantes` para não conflitar com a rota `/participantes`.

## Conferência manual

1. Abra a página inicial e confira os três participantes da roça e os links do menu.
2. Na votação, vote duas vezes e confira o nome e a contagem no alert.
3. Vote em outro participante e abra Resultado. Confira o total, a ordem, as quantidades e os percentuais.
4. Recarregue a página para verificar que os votos continuam gravados.
5. Abra “Zerar votação” e cancele para conferir que os votos permanecem. Depois confirme a limpeza e confira o total zero e o convite para votar.
6. Em uma tela menor, confira o menu recolhível e os cards em uma coluna na roça.
