const player = "X";
const computer = "O";
let opponent = "";
let playerScore = 0;  // Initialize player score
let opponentScore = 0;//opp player score
let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");
const winner_statement = document.getElementById("winner");
const opponentNameDisplay = document.getElementById("opponent-name");
const playerScoreDisplay = document.getElementById("player-score");
const opponentScoreDisplay = document.getElementById("opponent-score");

check_board_complete = () => {
    let flag = true;
    play_board.forEach(element => {
        if (element != player && element != computer) {
            flag = false;
        }
    });
    board_full = flag;
};

// Modify startGame to accept an opponent parameter and assign it to the opponent variable
function startGame(selectedOpponent) {
    opponent = selectedOpponent; // Store selected opponent
    opponentNameDisplay.innerText = opponent.charAt(0).toUpperCase() + opponent.slice(1); // Capitalize opponent name

    console.log("Selected opponent:", opponent); // For demonstration

    // Hide the opponent selection
    document.getElementById("opponent-selection").style.display = "none";
    document.getElementById("scoreboard").style.display = "block"; // Show score section
    // Show the game area
    document.querySelector(".play-area").style.display = "grid";
    reset_board(); // Reset the board to start a fresh game
}

const win_line = (winLine) => {
    for (let i = 0; i < 3; i++) {
        document.querySelector(`#block_${winLine[i]}`).classList.add("win-block");
    }
}
// helper function used in check_match() functon
const check_line = (a, b, c) => {
    var res  = (
            play_board[a] == play_board[b] &&
            play_board[b] == play_board[c] &&
            (play_board[a] == player || play_board[a] == computer)
        );
  
    return res;
};

const check_match = () => {
    for (i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            return [play_board[i],[i, i + 1, i + 2]];
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            return [play_board[i],[i, i + 3, i + 6]];
        }
    }
    if (check_line(0, 4, 8)) {
        return [play_board[0],[0, 4, 8]];
    }
    if (check_line(2, 4, 6)) {
        return [play_board[2],[2, 4, 6]];
    }
    return ["",[-1,-1,-1]];
};

const check_for_winner = () => {
    let res = check_match();
    if (res[0] === player) {
        playerScore++; // Increment player score
        playerScoreDisplay.innerText = playerScore; // Update player score display
        winner_statement.innerText = "Player Won!!";
        winner_statement.classList.add("playerWin");
        win_line(res[1]);
        board_full = true;
        // Confetti Code here
        var confettiElement = document.getElementById('my-canvas');
        var confettiSettings = { target: confettiElement };
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        setTimeout(() => { confetti.clear() }, 3000);
    } else if (res[0] === computer) {
        opponentScore++; // Increment opponent score
        opponentScoreDisplay.innerText = opponentScore; // Update opponent score display
        winner_statement.innerText = `${opponent.charAt(0).toUpperCase() + opponent.slice(1)} Won!`; // Use opponent's name here
        winner_statement.classList.add("computerWin");
        win_line(res[1]);
        board_full = true;
    } else if (board_full) {
        winner_statement.innerText = "It's a Draw!";
        winner_statement.classList.add("draw");
    }
};

const render_board = () => {
    board_container.innerHTML = ""
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
        if (e == player || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
}

const addPlayerMove = e => {
    if (!board_full && play_board[e] == "") {
        play_board[e] = player;
        game_loop();
        addComputerMove();
    }
};

const addComputerMove = () => {
    if (!board_full) {
        selected = computeMoveAlphaBeta(play_board)[1]
        play_board[selected] = computer;
        game_loop();
    }
};

// Artificial Intelligence based MiniMax Algorithm
const computeMoveMiniMax = (play_board, depth = 0, isComputer = true) => {
    let res = check_match()
    let bestScore;
    let bestMove;
    let possibleMoves
    if (res[0] == player) {
        return [-10 + depth, null]
    }
    else if (res[0] == computer) {
        return [10 - depth, null]
    }
    check_board_complete();
    if (board_full) {
        return [0, null]
    }
    else {
        if (isComputer) {
            bestScore = -9
            possibleMoves = []
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }
            possibleMoves.forEach((move) => {
                play_board[move] = computer;
                score = computeMoveMiniMax(play_board, depth + 1, false)[0]
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
            });
            return [bestScore, bestMove]
        } else {
            bestScore = 9
            possibleMoves = []
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }

            possibleMoves.forEach((move) => {
                play_board[move] = player;
                score = computeMoveMiniMax(play_board, depth + 1, true)[0]
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
            })
            return [bestScore, bestMove]
        }
    }
}
// Artificial Intelligence based Alpha-Beta-pruning Algorithm
const computeMoveAlphaBeta = (play_board, depth = 0, alpha = -Infinity, beta = +Infinity, isComputer = true) => {
    let res = check_match()
    let bestScore;
    let bestMove;
    let possibleMoves
    if (res[0] == player) {
        return [-10 + depth, null]
    }
    else if (res[0] == computer) {
        return [10 - depth, null]
    }
    check_board_complete();
    if (board_full) {
        return [0, null]
    }
    else {
        if (isComputer) {
            bestScore = -9
            possibleMoves = []
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }
            possibleMoves.forEach((move) => {
                play_board[move] = computer;
                score = computeMoveAlphaBeta(play_board, depth + 1,alpha,beta, false)[0]
                // alpha = max(alpha, score)
                if(score>alpha){
                    alpha=score;
                }
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
                if (beta < alpha) {
                    return 0,0;
                }
            });
            return [bestScore, bestMove]
        } else {
            bestScore = 9
            possibleMoves = []
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }

            possibleMoves.forEach((move) => {
                play_board[move] = player;
                score = computeMoveAlphaBeta(play_board, depth + 1,alpha,beta ,true)[0]
                if(score<beta){
                    beta=score
                }
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
                if(beta<=alpha){
                    return 0,0;
                }
            })
            return [bestScore, bestMove]
        }
    }
}

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner.classList.remove("playerWin");
    winner.classList.remove("computerWin");
    winner.classList.remove("draw");
    winner.innerText = "";
    render_board();
};

//initial render
render_board();
//dark mode
const myFunction = ()=> {
    var element = document.body;
    element.classList.toggle("dark");
}


// Add event listeners for player moves
document.querySelectorAll('.block').forEach(block => {
    block.addEventListener('click', addPlayerMove);
});