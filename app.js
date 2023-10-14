function changeGrid(id, shape) {
    grid[id[0]][id[1]] = shape;
}

function choosePlayer() {
    player = Math.floor(Math.random() * 2) + 1;
    if (player === 1) {
        turnIMG.src = "Assets/round.png";
        p1_info.classList.toggle("active");
    } else {
        turnIMG.src = "Assets/cross.png";
    }
    return player;
}

function checkWin() {
    for (let winCondtion of winIndexes) {
        let final = "";
        for (let i = 0; i <= 2; i++) {
            final += grid[i][winCondtion[i]];
        }
        if (final === "xxx" || final === "ooo") {
            gameOver = true;
            return final;
        }
    }
    for (let row of grid) {
        if (row[0] === "x" || row[1] === "o") {
            if (row[0] === row[1] && row[1] === row[2]) {
                gameOver = true;
                return row[0] + row[1] + row[2];
            }
        }
    }
    return "draw";
}

const btns = document.querySelectorAll("#grid-container>button");
const reset = document.querySelector("#reset");
const turnIMG = document.querySelector("#turn-container>img");
const p1_info = document.querySelector("#p1-info");
const p2_info = document.querySelector("#p2-info");

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

for (let btn of btns) {
    btn.addEventListener("click", (e) => {
        if (gameOver !== true) {
            if (btn.innerHTML === "") {
                if (isTurn === 1) {
                    isTurn = 2;
                    changeGrid(e.target.id, "x");
                    e.target.innerHTML =
                        '<img src="Assets/cross.png" alt="" />';
                    turnIMG.src = "Assets/cross.png";
                } else {
                    isTurn = 1;
                    changeGrid(e.target.id, "o");
                    e.target.innerHTML =
                        '<img src="Assets/round.png" alt="" />';
                    turnIMG.src = "Assets/round.png";
                }
            }
            if (checkWin() === "xxx") {
                alert("Player 1 won the game");
            } else if (checkWin() === "ooo") {
                alert("Player 2 won the game");
            } else if (checkWin() === "draw") {
                alert("THe game was a Draw");
            }
        }
    });
}

reset.addEventListener("click", () => {
    grid = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
    ];
    (player1_wins = 0), (player2_wins = 0);
    for (let btn of btns) {
        btn.innerHTML = "";
    }
});
