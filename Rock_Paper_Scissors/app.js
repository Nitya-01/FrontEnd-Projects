// app.js

// Complete logic of the game inside this function
const game = () => {
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;

    // Function to start playing the game
    const playGame = () => {
        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorBtn = document.querySelector('.scissor');
        const playerOptions = [rockBtn, paperBtn, scissorBtn];
        const computerOptions = ['rock', 'paper', 'scissors'];

        // Function to start playing the game
        playerOptions.forEach(option => {
            option.addEventListener('click', function () {
                const movesLeft = document.querySelector('.movesleft');
                moves++;
                movesLeft.innerText = `Remaining Moves: ${10 - moves}`;

                const choiceNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[choiceNumber];

                // Mapping the player's choice to corresponding text
                let playerChoice;
                if (this.classList.contains('rock')) playerChoice = 'rock';
                if (this.classList.contains('paper')) playerChoice = 'paper';
                if (this.classList.contains('scissor')) playerChoice = 'scissors';

                // Function to check who wins
                checkWinner(playerChoice, computerChoice);

                // Calling gameOver function after 10 moves
                if (moves === 10) {
                    gameOver(playerOptions, movesLeft);
                }
            });
        });
    };

    // Function to decide the winner and display results
    const checkWinner = (player, computer) => {
        const result = document.querySelector('.result');
        const playerScoreBoard = document.querySelector('.p-count');
        const computerScoreBoard = document.querySelector('.c-count');

        // Displaying the computer's choice
        const computerChoiceDisplay = document.querySelector('.computer-choice');
        computerChoiceDisplay.textContent = `Computer chose: ${computer}`;

        // Comparing player and computer choices
        if (player === computer) {
            result.textContent = 'It\'s a Draw!';
        } else if (player === 'rock') {
            if (computer === 'paper') {
                result.textContent = 'Computer Wins!';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'Player Wins!';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        } else if (player === 'scissors') {
            if (computer === 'rock') {
                result.textContent = 'Computer Wins!';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'Player Wins!';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        } else if (player === 'paper') {
            if (computer === 'scissors') {
                result.textContent = 'Computer Wins!';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'Player Wins!';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
    };

    // Function to run when the game is over
    const gameOver = (playerOptions, movesLeft) => {
        const chooseMove = document.querySelector('.move');
        const result = document.querySelector('.result');
        const reloadBtn = document.querySelector('.reload');

        playerOptions.forEach(option => {
            option.style.display = 'none';
        });

        chooseMove.innerText = 'Game Over!';
        movesLeft.style.display = 'none';

        if (playerScore > computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'Congratulations, You Won!';
            result.style.color = '#27ae60';
        } else if (playerScore < computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'You Lost. Better Luck Next Time!';
            result.style.color = '#c0392b';
        } else {
            result.style.fontSize = '2rem';
            result.innerText = 'It\'s a Draw!';
            result.style.color = '#f39c12';
        }
        reloadBtn.innerText = 'Play Again';
        reloadBtn.style.display = 'block';
        reloadBtn.addEventListener('click', () => {
            window.location.reload();
        });
    };

    // Calling playGame function inside game
    playGame();
};

// Calling the game function
game();
