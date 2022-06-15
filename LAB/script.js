let name = prompt('Olá, jogador! Qual o seu nome?');
let titulo     = document.querySelector('h1')
let instrucoes = document.querySelector('#instrucoes')
let aviso      = document.querySelector('#aviso')
let progresso  = document.querySelector('#progresso')
let pontos = 0 // pontos para o placar
let placar = 0 // placar

// AUDIO
let somAcerto   = document.querySelector('#somAcerto')
let somErro     = document.querySelector('#somErro')
let somAplausos = document.querySelector('#somAplausos')

// PERGUNTA
let numQuestao = document.querySelector('#numQuestao')
let pergunta   = document.querySelector('#pergunta')

// ALTERNATIVAS
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')


let articleQuestoes = document.querySelector('.questoes')

let alternativas = document.querySelector('#alternativas')

const q0 = {
    numQuestao   : 0,
    pergunta     : "Pergunta",
    alternativaA : "Alternativa A",
    alternativaB : "Alternativa B",
    alternativaC : "Alternativa C",
    alternativaD : "Alternativa D",
    correta      : "0",
}
const q1 = {
    numQuestao   : 1,
    pergunta     : "Na série Game Of Thrones, quem é a personagem conhecida como a “Quebradora de Correntes”?",
    alternativaA : "Sansa Stark",
    alternativaB : "Cersei Lannister",
    alternativaC : "Daenerys Targaryen",
    alternativaD : "Arya Stark",
    correta      : "Daenerys Targaryen",
}
const q2 = {
    numQuestao   : 2,
    pergunta     : "Qual o Robin conhecido como “O Herdeiro”, filho biológico do Batman?",
    alternativaA : "Tim",
    alternativaB : "Damian",
    alternativaC : "Dick",
    alternativaD : "Jason",
    correta      : "Damian",
}
const q3 = {
    numQuestao   : 3,
    pergunta     : "Qual música da cantora brasileira Anitta conquistou o Top 1 na Billboard Global?",
    alternativaA : "Envolver",
    alternativaB : "Boys Don't Cry",
    alternativaC : "Modo Turbo",
    alternativaD : "Na Sua Cara",
    correta      : "Envolver",
}
const q4 = {
    numQuestao   : 4,
    pergunta     : "Qual filme ganhou o prêmio máximo do cinema, no Oscar de 2021 de melhor filme?",
    alternativaA : "Parasita",
    alternativaB : "No Ritmo do Coração",
    alternativaC : "Duna",
    alternativaD : "Nomadland",
    correta      : "Nomadland",
}
const q5 = {
    numQuestao   : 5,
    pergunta     : " Qual foi o primeiro filme de animação a ser indicado ao Oscar de melhor filme?",
    alternativaA : "Bambi",
    alternativaB : "A pequena sereia",
    alternativaC : "A viagem de Chihiro",
    alternativaD : "A bela e a fera",
    correta      : "A bela e a fera",
}

const questoes = [q0, q1, q2, q3, q4, q5]

let numero = document.querySelector('#numero')
let total  = document.querySelector('#total')

numero.textContent = q1.numQuestao

let totalDeQuestoes = (questoes.length)-1
console.log("Total de questões " + totalDeQuestoes)
total.textContent = totalDeQuestoes


numQuestao.textContent = q1.numQuestao
pergunta.textContent   = q1.pergunta
a.textContent = q1.alternativaA
b.textContent = q1.alternativaB
c.textContent = q1.alternativaC
d.textContent = q1.alternativaD


a.setAttribute('value', '1A')
b.setAttribute('value', '1B')
c.setAttribute('value', '1C')
d.setAttribute('value', '1D')


function proximaQuestao(nQuestao) {
    numero.textContent = nQuestao
    numQuestao.textContent = questoes[nQuestao].numQuestao
    pergunta.textContent   = questoes[nQuestao].pergunta
    a.textContent = questoes[nQuestao].alternativaA
    b.textContent = questoes[nQuestao].alternativaB
    c.textContent = questoes[nQuestao].alternativaC
    d.textContent = questoes[nQuestao].alternativaD
    a.setAttribute('value', nQuestao+'A')
    b.setAttribute('value', nQuestao+'B')
    c.setAttribute('value', nQuestao+'C')
    d.setAttribute('value', nQuestao+'D')
    progresso.value = parseInt(progresso.value) + 1
   
}


alternativas.addEventListener('dblclick', () => {
    
    pontos -= 10 //
    if(numQuestao.value == 10 && pontos == 60) { pontos = 50 }
})

function bloquearAlternativas() {
    alternativas.classList.add('bloqueado')
}

function desbloquearAlternativas() {
    alternativas.classList.remove('bloqueado')
}

function piscarNoAcerto() {
    articleQuestoes.classList.remove('errou')
    articleQuestoes.classList.add('acertou')
}

function piscarNoErro() {
    articleQuestoes.classList.remove('acertou')
    articleQuestoes.classList.add('errou')
}

function tirarPiscar() {
    articleQuestoes.classList.remove('acertou')
    articleQuestoes.classList.remove('errou')
}

function verificarSeAcertou(nQuestao, resposta) {

    let numeroDaQuestao = nQuestao.value
    console.log("Questão " + numeroDaQuestao)

    let respostaEscolhida = resposta.textContent
    

    let certa = questoes[numeroDaQuestao].correta
    
    if(respostaEscolhida == certa) {
       
        piscarNoAcerto()
        somAcerto.play()
        pontos += 10 
        if(nQuestao.value == 1 && pontos == 20) { pontos = 10 }
    } else {
      
        piscarNoErro()
        somErro.play()
    }
    setTimeout(() => {
        tirarPiscar()
    }, 150);
    
    placar = pontos
    instrucoes.textContent = "Pontos " + placar

    bloquearAlternativas()

    setTimeout(function() {

        proxima = numeroDaQuestao+1

        if(proxima > totalDeQuestoes) {
            console.log('Fim do Jogo!')
            fimDoJogo()
        } else {
            proximaQuestao(proxima)
        }
    }, 150)
    desbloquearAlternativas()
}

function fimDoJogo() {

    somAplausos.play()

    let s = 's'
    pontos == 0 ? s = '' : s = s
    instrucoes.textContent = name + ", chegamos ao fim do jogo! Você conseguiu " + pontos + " ponto"+ s

    instrucoes.classList.add('placar')

 
    articleQuestoes.style.display = 'none'

    resultDiv.textContent = result;
  }