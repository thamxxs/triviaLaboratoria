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

//MOSTRAR RESULTADO
let result = document.querySelector('respostaCorreta')

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
    pergunta     : "Ângulo agudo é aquele que...?",
    alternativaA : "mede 90º",
    alternativaB : "mede mais que 0º e menos que 90º",
    alternativaC : "mede 180º ou mais",
    alternativaD : "mede 240º ou mais",
    correta      : "mede mais que 0º e menos que 90º",
}
const q2 = {
    numQuestao   : 2,
    pergunta     : "O que significa hipotenusa?",
    alternativaA : "A fêmea do hipopótamo",
    alternativaB : "O comprimento de uma circunferência",
    alternativaC : "O maior lado de um triângulo retângulo",
    alternativaD : "Um recipiente de formato cilíndrico",
    correta      : "O maior lado de um triângulo retângulo",
}
const q3 = {
    numQuestao   : 3,
    pergunta     : "Em uma operação de fatoração, devemos...",
    alternativaA : "fabricar peças a serem usadas em jogos infantis",
    alternativaB : "elevar um número ao quadrado",
    alternativaC : "transformar um número positivo em negativo",
    alternativaD : "decompor um número em fatores primos",
    correta      : "decompor um número em fatores primos",
}
const q4 = {
    numQuestao   : 4,
    pergunta     : "Uma inequação é uma...",
    alternativaA : "inserção de uma equação dentro de outra",
    alternativaB : "desigualdade entre duas expressões matemáticas",
    alternativaC : "equalão que não possui letras",
    alternativaD : "equação que possui alguma variável",
    correta      : "desigualdade entre duas expressões matemáticas",
}
const q5 = {
    numQuestao   : 5,
    pergunta     : "O que é bissetriz?",
    alternativaA : "É a irmã de uma imperatriz",
    alternativaB : "É um número elevado duas vezes ao quadrado",
    alternativaC : "Equivale à metade de um círculo",
    alternativaD : "Uma semirreta que divide um ângulo em dois ângulos congruentes",
    correta      : "Uma semirreta que divide um ângulo em dois ângulos congruentes",
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
    if(numQuestao.value == 10 && pontos == 110) { pontos = 100 }
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
