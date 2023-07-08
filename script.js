/* Global variables */

let SCORE;
let RAND_QUES;
let NUMS;

/********* */

const scoreBoard = document.querySelector('.score-board');
const scoreVal = document.getElementById('score');
const questionBox = document.querySelector('.question-box');
const optionBox = document.querySelector('.option-wrapper');
const playBtn = document.querySelector('.play-btn');
const exitBtn = document.querySelector('.exit-btn');

/*********** */

const optionsBtns = document.querySelectorAll('.option-text'); // for all 4 option's text

const optionsSelection = document.querySelectorAll('#opt-btn');

/*********** */


function playSetup() {
    SCORE = 0;
    RAND_QUES = -1;
    playBtn.style.display = "block";
    questionBox.style.display = "none";
    optionBox.style.display = "none";
    exitBtn.style.display = "none";
    scoreBoard.style.display = "none";
    NUMS = numArray(0, 6); // for 7 total questions

}


function startGame() {
    scoreVal.innerHTML = SCORE;
    questionBox.style.display = "block";
    optionBox.style.display = "flex";
    exitBtn.style.display = "block";
    scoreBoard.style.display = "block";
    question.quizPlay();
}

playBtn.addEventListener('click', function() {
    this.style.display = "none";
    startGame();
})

exitBtn.addEventListener('click', function() {
    playSetup();
})


/***** Question Section  */

let questionColl = [];
let optionColl = [];
const answerColl = [1, 2, 3, 3, 0, 2, 1]; // correct answer of the following quiz questions

/***** questions ** */

questionColl[0] = "Which one is the first search engine in internet?";
optionColl[0] = {
    options: ['Google', 'Archie', 'Altavista', 'WAIS']
};

questionColl[1] = "Number of bit used b the PPv6 address: ";
optionColl[1] = {
    options: ['32 bit', '64 bit', '128 bit', '256 bit']
};

questionColl[2] = "Which one is the first web browser invented in 1990?";
optionColl[2] = {
    options: ['Internet Explorer', 'Mosaic', 'Mozilla', 'Nexus']
};

questionColl[3] = "In which year '@' sign was first chosen for its use in email address?";
optionColl[3] = {
    options: ['1976', '1980', '1977', '1972']
};

questionColl[4] = "Which key combination is used to permanenlty delete a file or folder?";
optionColl[4] = {
    options: ['Shift + Del', 'Alt + Del', 'Ctrl + Del', "Del"]
};

questionColl[5] = "Which company first developed the Java programming language?";
optionColl[5] = {
    options: ['Microsoft', 'Google', 'Sun Microsystems', 'IBM']
};

questionColl[6] = "Who is know as the founder of IBM company?";
optionColl[6] = {
    options: ['Steve Jobs', 'Thomas J.Watson', 'Nolan Bushnell', 'Alan Turing']
};
/**** end of questions *** */


let quizQuestion = function(question, optionList, correctAns) {
    this.question = question;
    this.optionList = optionList;
    this.correctAns = correctAns;
}

let question = new quizQuestion(questionColl, optionColl, answerColl);

/********** */

/**** generate unique random numbers for unique questions */


function numArray(start, end) {
    let numsList = [];
    for (let i = start; i <= end; i++) {
        numsList.push(i);
    }
    return numsList;
}

function randValueGen(min, max) {
    let temp = Math.random() * (max - min + 1);
    let result = Math.floor(temp) + min;
    return result;
}


/*********** */

quizQuestion.prototype.quizPlay = function() {

    // To check if the questions are available or not

    if (NUMS.length === 0) {
        document.getElementById('question').innerHTML = "You have completed the game.";
        optionBox.style.display = "none";
        return;
    }


    let randIndex = randValueGen(0, NUMS.length - 1);
    RAND_QUES = NUMS[randIndex];

    NUMS.splice(randIndex, 1);

    // for random question dispay in the question box
    document.getElementById('question').innerHTML = this.question[RAND_QUES];

    // for displaying the options for the above question
    this.optionList[RAND_QUES].options.forEach(function(option, idx) {
        optionsBtns[idx].innerHTML = option;
    })
}

optionsSelection.forEach(function(optionSelected, index) {
    /*
    optionSelected.addEventListener('click', function(){
        console.log(`${optionSelected} ${index}`);
    })
    */

    optionSelected.addEventListener('click', function() {

        // answer selected by user
        let userAns = parseInt(this.textContent) - 1; // as our indexing starts from 0

        // for preventing user to click multiple times and on multiple options

        optionsSelection.forEach(function(option) {
            option.disabled = true;
        })

        question.checkAnswer(userAns);
    })

})

quizQuestion.prototype.checkAnswer = function(userAns) {
    optionsSelection[userAns].style.background = "white";
    optionsSelection[userAns].style.color = "black";

    // correct answer from our data collection
    let correctAns = question.correctAns[RAND_QUES];
    if (userAns === correctAns) {
        correctAnsUpdate();
    } else {
        incorrectAnsUpdate();
    }
}

// for correct answer update 
function correctAnsUpdate() {
    document.getElementById('question').style.color = "gold";
    document.getElementById('question').innerHTML = "Correct!";
    SCORE++;
    scoreVal.innerHTML = SCORE;

    setTimeout(contdPlay, 1000);
}

// for incorrect answer update 
function incorrectAnsUpdate() {
    document.getElementById('question').style.color = "red";
    document.getElementById('question').innerHTML = "Incorrect!";

    setTimeout(contdPlay, 1000);
}

// for continuous play

function contdPlay() {

    optionsSelection.forEach(function(option) {
        option.disabled = false; // re-enabling our disabled buttons
        option.style.background = "black";
        option.style.color = "white";
    })

    document.getElementById('question').style.color = "black"; // to make question color white again in case the previous answer was answered incorrectly

    question.quizPlay();
}


playSetup();