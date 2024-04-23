let title = document.querySelector(".title");
let turn = 'X';
let square = [];

function end(num1, num2, num3) {
    title.innerHTML = `${square[num1]} Is Winner `;
    document.getElementById("item" + num1).style.background = "#fff";
    document.getElementById("item" + num2).style.background = "#fff";
    document.getElementById("item" + num3).style.background = "#fff";
    setInterval(function () { title.innerHTML += '.' }, 1000);
    setTimeout(function () { location.reload() }, 4000);
}

function winner() {
    for (let i = 1; i < 10; i++) {
        square[i] = document.getElementById('item' + i).innerHTML;
    }
    if (square[1] == square[2] && square[2] == square[3] && square[1] != '') {
        end(1, 2, 3);
    } else if (square[4] == square[5] && square[5] == square[6] && square[4] != '') {
        end(4, 5, 6);
    } else if (square[7] == square[8] && square[8] == square[9] && square[7] != '') {
        end(7, 8, 9);
    } else if (square[1] == square[5] && square[5] == square[9] && square[5] != '') {
        end(1, 5, 9);
    } else if (square[3] == square[5] && square[5] == square[7] && square[5] != '') {
        end(3, 5, 7);
    } else if (square[1] == square[4] && square[4] == square[7] && square[1] != '') {
        end(1, 4, 7);
    } else if (square[2] == square[5] && square[5] == square[8] && square[2] != '') {
        end(2, 5, 8);
    } else if (square[3] == square[6] && square[6] == square[9] && square[6] != '') {
        end(3, 6, 9);
    } else if (square[1] != '' && square[2] != '' && square[3] != '' && square[4] != '' && square[5] != '' && square[6] != '' && square[7] != '' && square[8] != '' && square[9] != '') {
        title.innerHTML = `No One Winner `;
        setInterval(function () { title.innerHTML += '.' }, 1000);
        setTimeout(function () { location.reload() }, 3000);
    }
}

function minimax(depth, maximizingPlayer) {
    let player = maximizingPlayer ? 'O' : 'X';
    let opponent = maximizingPlayer ? 'X' : 'O';
    let result = winner();
    
    if (result !== null) {
        if (result === 'O') {
            return 10 - depth;
        } else if (result === 'X') {
            return depth - 10;
        } else {
            return 0;
        }
    }

    let scores = [];
    let moves = [];

    for (let i = 1; i < 10; i++) {
        if (square[i] === '') {
            square[i] = player;
            scores.push(minimax(depth + 1, !maximizingPlayer));
            moves.push(i);
            square[i] = '';
        }
    }

    if (maximizingPlayer) {
        let maxScoreIndex = scores.indexOf(Math.max(...scores));
        return scores[maxScoreIndex];
    } else {
        let minScoreIndex = scores.indexOf(Math.min(...scores));
        return scores[minScoreIndex];
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 1; i < 10; i++) {
        if (square[i] === '') {
            square[i] = 'O';
            let score = minimax(0, false);
            square[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}


function game(id) {
    let element = document.getElementById(id);
    if (turn == 'X' && element.innerHTML == '') {
        element.innerHTML = 'X';
        turn = 'O';
        title.innerHTML = "O";
    }
    winner();
    if (turn == 'O') {
        let index = bestMove();
        if (index) {
            let element = document.getElementById('item' + index);
            element.innerHTML = 'O';
            square[index] = 'O';
            turn = 'X';
            title.innerHTML = "X";
            winner();
        }
    }
}