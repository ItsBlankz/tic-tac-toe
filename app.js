function changeGrid(id, shape) {
    grid[id[0]][id[1]] = shape;
    if (shape === "x") {
        isTurn = 2;
        turnIMG.src = "Assets/round.png";
        document.getElementById(id).innerHTML =
            '<img src="Assets/cross.png" alt="" />';
    } else {
        isTurn = 1;
        turnIMG.src = "Assets/cross.png";
        document.getElementById(id).innerHTML =
            '<img src="Assets/round.png" alt="" />';
    }
}

function declareWinner(shape) {
    document.querySelector("span").innerText = "Won";
    if (shape === "o") {
        turnIMG.src = "Assets/round.png";
        player2_wins += 1;
        document.querySelector("#p2-info > p:nth-child(2)").innerText =
            player2_wins;
    } else if (shape === "x") {
        turnIMG.src = "Assets/cross.png";
        player1_wins += 1;
        document.querySelector("#p1-info > p:nth-child(2)").innerText =
            player1_wins;
    } else {
        turnIMG.classList.toggle("hidden");
        document.querySelector("span").innerText = "Draw";
    }
}

function choosePlayer() {
    player = Math.floor(Math.random() * 2) + 1;
    if (player === 1) {
        turnIMG.src = "Assets/cross.png";
        p1_info.classList.toggle("active");
    } else {
        turnIMG.src = "Assets/round.png";
    }
    return player;
}

function checkIndices() {
    for (let winCondtion of winIndexes) {
        final = "";
        for (let i = 0; i <= 2; i++) {
            final += grid[i][winCondtion[i]];
        }
        if (final === "xxx" || final === "ooo") {
            gameOver = true;
            return final;
        }
    }
}

function checkRows() {
    final = "";
    for (let row of grid) {
        if (row[0] === row[1] && row[1] === row[2] && row[0] !== "-") {
            final = row[0] + row[1] + row[2];
            gameOver = true;
            return final;
        }
    }
}

function checkWin() {
    if (checkIndices() === "xxx" || checkRows() === "xxx") {
        declareWinner("x");
    } else if (checkIndices() === "ooo" || checkRows() === "ooo") {
        declareWinner("o");
    } else if (gridFilled() === true) {
        declareWinner("draw");
    }

    return final;
}

const btns = document.querySelectorAll("#grid-container>button");
const reset = document.querySelector("#reset");
const turnIMG = document.querySelector("#turn-container>img");
const p1_info = document.querySelector("#p1-info");
const p2_info = document.querySelector("#p2-info");

function gridFilled() {
    const condition2 = (element) => {
        return element !== "-";
    };
    const condition = (element) => {
        return element.every(condition2);
    };
    return grid.every(condition);
}

const winIndexes = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [0, 1, 2],
    [2, 1, 0],
];

let grid = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
];

let player1_wins = 0;
let player2_wins = 0;
let isTurn = choosePlayer();
let gameOver = false;
let final = "";

reset.addEventListener("click", () => {
    grid = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
    ];
    (gameOver = false), (final = 0);
    document.querySelector("span").innerText = "'s Turn";
    turnIMG.classList.remove("hidden");
    for (let btn of btns) {
        btn.innerHTML = "";
    }
    isTurn = choosePlayer();
});

for (let btn of btns) {
    btn.addEventListener("click", (e) => {
        if (!gameOver) {
            if (isTurn === 1) {
                changeGrid(e.target.id, "x");
            } else {
                changeGrid(e.target.id, "o");
            }
            checkWin();
        }
    });
}
