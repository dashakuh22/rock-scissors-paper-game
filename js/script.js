var COUNT_OF_ROUNDS = 0;
var ROUNDS = document.getElementById('round-counter');
var RESULT = document.getElementById('round-result');
var END_GAME = false;

var USER_CHOICE;
var USER_SCORE = document.getElementById('user-result');
var USER_CHOICE_LINE = document.getElementById('user-choice');
var USER_SELECTION_CONTAINER = document.getElementById('user-selection-container');

var PC_CHOICE;
var PC_SCORE = document.getElementById('computer-result');
var PC_CHOICE_LINE = document.getElementById('computer-choice');
var PC_SELECTION_CONTAINER = document.getElementById('computer-selection-container');

const FIGURES = allFigures();
const USER_WINER = 'You won!';
const PC_WINER = 'You lost!';
const DRAW = 'It\'s a draw!';

loadGame();
document.addEventListener('click', play, false);
document.addEventListener('click', reset, false);

function allFigures() {
    var figuresCollection = document.getElementsByClassName('player-selection ');
    var figures = new Array();
    for(var item of figuresCollection) {
        item = item.className.split(' ')[1];
        item = item.split('-');
        item = item[item.length - 1];
        figures.push(item);
    }
    return figures;
}

function play(e) {
    if (!END_GAME) {
        var target = e.target;
        if(target.id.indexOf('figure') > -1) {
            USER_CHOICE_LINE.innerHTML = userChoice(target);
            PC_CHOICE_LINE.innerHTML = computerChoice();
            defineTheWinner(USER_CHOICE, PC_CHOICE);
            ROUNDS.innerHTML = 'Round ' + ++COUNT_OF_ROUNDS;
            document.getElementById('btn-reset').style.display = 'block';
        }
    }
}

function userChoice(target) {
    let numberOfFigure = target.id.split('-')[1] - 1;
    USER_CHOICE = FIGURES[numberOfFigure];
    return 'Your choice: ' + USER_CHOICE;
}

function computerChoice() {
    PC_CHOICE = randomFigure();
    let picture = document.createElement('button');
    picture.setAttribute('class', 'player-selection player-selection-' + PC_CHOICE);
    PC_SELECTION_CONTAINER.innerHTML = '';
    PC_SELECTION_CONTAINER.appendChild(picture);
    return 'PC choice: ' + PC_CHOICE;   
}

function randomFigure() {
    var randomNumber = Math.floor(Math.random() * FIGURES.length);
    return FIGURES[randomNumber];
}

function defineTheWinner(user, pc) {
    let userNumber = FIGURES.indexOf(user) + 1;
    let pcNumber = FIGURES.indexOf(pc) + 1;
	
    let difference = userNumber - pcNumber;
    let diffByMod = difference % FIGURES.length;
	let userWinBreakpoint = ceilValue(FIGURES.length - 1);

    if (diffByMod === 0)
        RESULT.innerHTML = DRAW;
    else if ((Math.abs(diffByMod) <= userWinBreakpoint) ^ (difference > 0))
        RESULT.innerHTML = USER_WINER;
	else
        RESULT.innerHTML = PC_WINER;
    updateScore(RESULT.innerHTML);
}

function ceilValue(value) {
	if (value % 2 === 0)
		return value / 2;
	return (value - 1) / 2;
}

function updateScore(RESULT) {
    switch(RESULT) {
        case DRAW: 
            USER_SCORE.innerHTML = incrementScore(USER_SCORE);
            PC_SCORE.innerHTML = incrementScore(PC_SCORE);
            break;
        case USER_WINER: 
            USER_SCORE.innerHTML =  incrementScore(USER_SCORE);
            break;
        case PC_WINER:
            PC_SCORE.innerHTML =  incrementScore(PC_SCORE);
            break;
    }
    victory();
}

function incrementScore(score) {
    return parseInt(score.innerHTML) + 1;
}

function victory() {
    var userScore = parseInt(USER_SCORE.innerHTML);
    var pcScore = parseInt(PC_SCORE.innerHTML);
    if (userScore >= 10) {
        hidePlayerButtons(USER_SELECTION_CONTAINER, true);
        updateWinnerSection(USER_SELECTION_CONTAINER);
    }
    if (pcScore >= 10) {
        hidePlayerButtons(PC_SELECTION_CONTAINER, true);
        updateWinnerSection(PC_SELECTION_CONTAINER);
    }
}

function hidePlayerButtons(player, flag) {
    for(var button of player.children) {
        button.hidden = flag;
    }
}

function updateWinnerSection(section) {
    var button = document.createElement('button');
    button.setAttribute('class', 'player-selection player-selection-victory');
    section.appendChild(button);
    END_GAME = true;
    document.getElementById('btn-reset').innerHTML = 'Play again';
}

function reset(e) {
    var target = e.target;
    if(target.id.indexOf('btn-reset') > -1) {
        loadGame();
        hidePlayerButtons(USER_SELECTION_CONTAINER, false);
        deleteWinnerButton();
    }
}

function deleteWinnerButton() {
    var winnerButtons = document.getElementsByClassName('player-selection-victory');
    for(var icon of winnerButtons) {
        icon.remove();
    }
}

function loadGame() {
    PC_SELECTION_CONTAINER.innerHTML = 'Waiting for your selection!';
    USER_SCORE.innerHTML = PC_SCORE.innerHTML = '0';
    USER_CHOICE_LINE.innerHTML = 'Pick one!';
    PC_CHOICE_LINE.innerHTML = '';
    ROUNDS.innerHTML = 'No rounds yet!';
    RESULT.innerHTML = 'VS';
    COUNT_OF_ROUNDS = 0;
    END_GAME = false;
    document.getElementById('btn-reset').style.display = 'none';
    document.getElementById('btn-reset').innerHTML = 'Reset';
}