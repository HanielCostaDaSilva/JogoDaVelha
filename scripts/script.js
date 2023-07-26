// Definindo variáveis globais
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let points = [0, 0];

// Selecionando os elementos do DOM
const boxes = document.querySelectorAll('.box');
const placarX = document.getElementById('pontos-1');
const placarO = document.getElementById('pontos-0');
const mensagem = document.getElementById('mensagem');

/*
Função para iniciar o jogo
computerMode: boolean, representa se o modo escolhido foi computador ou 2players
*/

function activateGame(computerMode) {
  const botaoDiv = document.getElementById('botoesDiv');
  const container = document.getElementById('container');
  botaoDiv.classList.add('hide');
  container.classList.remove('hide');

  if (computerMode) {
    boxes.forEach((box, index) => box.addEventListener('click', () => makeMove(index, computerMode)));
  } else {
    boxes.forEach((box, index) => box.addEventListener('click', () => makeMove(index)));
  }
}

function makeMove(index, computerMode = false) {
  if (!gameBoard[index] && !gameOver) {
    gameBoard[index] = currentPlayer;
    boxes[index].appendChild(createElement(currentPlayer));
    checkWinner();

    if (computerMode && currentPlayer === 'X' && !gameOver) {
      setTimeout(makeComputerMove, 500);
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    const boxIsEmpty = gameBoard[index] === '';
    if (boxIsEmpty) {
      boxes[index].classList.add('empty');
    } else {
      boxes[index].classList.remove('empty');
    }
  }
}

function makeComputerMove() {
  let emptyBoxesIndex = [];
  gameBoard.forEach((box, index) => {
    if (!box) {
      emptyBoxesIndex.push(index);
    }
  });

  let randomIndex = Math.floor(Math.random() * emptyBoxesIndex.length);
  let computerMoveIndex = emptyBoxesIndex[randomIndex];

  gameBoard[computerMoveIndex] = 'O';

  boxes[computerMoveIndex].appendChild(createElement('O'));

  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para verificar o vencedor
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      showResultMessage(`${gameBoard[a]} venceu!`);
      updateScore(gameBoard[a]);
      return;
    }
  }
  if (!gameBoard.includes('')) {
    gameOver = true;
    showResultMessage('Deu Velha!');
  }
}

// Função para mostrar a mensagem de resultado
function showResultMessage(message) {
  const resultadoMensagem = mensagem.querySelector('p');
  resultadoMensagem.innerText = message;
  mensagem.classList.remove('hide');

  setTimeout(() => {
    mensagem.classList.add('hide');
    resetGame();
  }, 2000);
}

// Função para atualizar o placar
function updateScore(winner) {
  if (winner === 'X') {
    points[0]++;
    placarX.textContent = points[0];
  } else if (winner === 'O') {
    points[1]++;
    placarO.textContent = points[1];
  }
}

/* 
Função para reiniciar o jogo
*/ 
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  mensagem.classList.add('hide');
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('highlight');
  });
}

function createElement(jogador){
  const symbolDiv = document.createElement('div');
  symbolDiv.textContent = jogador === 'X' ? 'X' : '';
  symbolDiv.classList.add(jogador);
  return symbolDiv;
}

//Selecionando os jogadores
const twoPlayersButton = document.getElementById('2Jogadores');
const computerPlayerButton = document.getElementById('ComputadorJogador');

twoPlayersButton.addEventListener('click', ()=> activateGame(false));
computerPlayerButton.addEventListener('click',()=> activateGame(true));
