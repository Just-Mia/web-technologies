'use strict';

let level = 1;
let timeToDuel = 700;
let readyToDuel = false;
let time;
let score;

//const startButton = document.querySelector('.button-start-game');
const restartButton = document.querySelector('.button-restart');
const nextButton = document.querySelector('.button-next-level');
//const gameMenu = document.querySelector('.game-menu');
const wrapper = document.querySelector('.wrapper');
const gamePanels = document.querySelector('.game-panels');
const gameScreen = document.querySelector('.game-screen');
const winScreen = document.querySelector('.win-screen');
const gunman = document.querySelector('.gunman');
const timeYou = document.querySelector('.time-panel__you');
const timeGunman = document.querySelector('.time-panel__gunman');
const showLevel = document.querySelector('.score-panel__level');
const message = document.querySelector('.message');

const sfxIntro = new Audio('sfx/intro.m4a');
const sfxWait = new Audio('sfx/wait.m4a');
const sfxFire = new Audio('sfx/fire.m4a');
const sfxShot = new Audio('sfx/shot.m4a');
const sfxWin = new Audio('sfx/win.m4a');
const sfxDeath = new Audio('sfx/death.m4a');

//startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
nextButton.addEventListener('click', nextLevel);

startGame();



function startGame() {
    //gameMenu.style.display = 'none';
    gamePanels.style.display = 'block';
    gameScreen.style.display = 'block';
    wrapper.style.display = 'block';
    timeGunman.textContent = (timeToDuel / 1000).toFixed(2);
    timeYou.textContent = (0).toFixed(2);
    score = Number(document.querySelector('.score-panel__score_num').textContent);
    showLevel.textContent = `level: ${level}`;
    gunman.classList.add(`gunman-level-${level}`);
    gunman.addEventListener('transitionend', prepareForDuel);
    setTimeout(() => moveGunman(), 500);
}

function restartGame() {
    sfxDeath.pause();
    restartButton.style.display = 'none';
    message.textContent = '';
    gameScreen.classList.remove('game-screen--death');
    message.classList.remove('message--dead', 'animated', 'zoomIn');
    gunman.classList.remove(
        `gunman-level-${level}`,
        `gunman-level-${level}__standing`,
        `gunman-level-${level}__ready`,
        `gunman-level-${level}__shooting`
    );
    setTimeout(startGame, 1000);
}

function nextLevel() {
    if (level < 5) {
        nextButton.style.display = 'none';
        message.textContent = '';
        message.classList.remove('message--win', 'animated', 'zoomIn');
        gunman.classList.remove(
            `gunman-level-${level}`,
            `gunman-level-${level}__standing`,
            `gunman-level-${level}__death`
        );
        level++;
        timeToDuel = 700 - (level * 100);
        startGame();
    } else {
        message.style.display = 'none';
        gameScreen.style.display = 'none';
        gamePanels.style.display = 'none';
        winScreen.style.display = 'block';

      
        const finalScore = document.querySelector('.score-panel__score_num').textContent;
        const winTitle = document.querySelector('.win-screen__title');
        winTitle.innerHTML = `You won!<br>Score: <br> <span style="color: #000000;">${finalScore}</span>`;
    }
}

function moveGunman() {
    setTimeout(() => {
        gunman.classList.add('moving');
        sfxIntro.play();
        sfxIntro.loop = true;
    }, 50);
}

function prepareForDuel() {
    sfxIntro.pause();
    sfxWait.play();
    sfxWait.currentTime = 0;
    sfxWait.loop = true;
    gunman.classList.replace('moving', 'standing');
    gunman.classList.add(`gunman-level-${level}__standing`);

    setTimeout(() => {
        sfxWait.pause();
        gunman.classList.add(`gunman-level-${level}__ready`);
        message.classList.add('message--fire');
        sfxFire.play();
        gunman.addEventListener('mousedown', playerShootsGunman);
        readyToDuel = true;
        timeCounter(Date.now());
        setTimeout(gunmanShootsPlayer, timeToDuel);
    }, 1000);
}

function timeCounter(t) {
    const timeCompare = () => {
        const currTime = Date.now();
        if (readyToDuel) {
            time = ((currTime - t + 10) / 1000).toFixed(2);
            timeYou.textContent = time;
            setTimeout(timeCompare, 10);
        }
    };
    timeCompare();
}

function gunmanShootsPlayer() {
    if (readyToDuel) {
        readyToDuel = false;
        gunman.classList.replace('standing', `gunman-level-${level}__shooting`);
        setTimeout(() => {
            sfxShot.play();
            message.classList.remove('message--fire');
            gameScreen.classList.add('game-screen--death');
            message.classList.add('message--dead', 'animated', 'zoomIn');
            message.textContent = 'You are dead!';
        }, timeToDuel / 3);

        gunman.removeEventListener('mousedown', playerShootsGunman);
        setTimeout(() => {
            sfxDeath.play();
            restartButton.style.display = 'block';
        }, 1000);
    }
}

function playerShootsGunman() {
    if (readyToDuel) {
        readyToDuel = false;
        sfxShot.play();
        message.classList.remove('message--fire');
        gunman.classList.remove('standing', `gunman-level-${level}__shooting`);
        gunman.classList.add(`gunman-level-${level}__death`);
        gunman.removeEventListener('mousedown', playerShootsGunman);
        sfxWin.play();

        setTimeout(() => {
            message.classList.add('message--win', 'animated', 'zoomIn');
            message.textContent = 'You Win!';
            scoreCount();
            nextButton.style.display = 'block';
        }, 1000);
    }
}

function scoreCount() {
    const scoreDiv = document.querySelector('.score-panel__score_num');
    const temp = +(100 * level).toFixed(0);

    const count = () => {
        if (Number(scoreDiv.textContent) - score < temp) {
            scoreDiv.textContent = Number(scoreDiv.textContent) + 100;
            setTimeout(count, 10);
        }
    };
    count();
}