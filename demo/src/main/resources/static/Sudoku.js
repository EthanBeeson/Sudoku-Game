var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "007491605",
    "200060309",
    "000007010",
    "058600004",
    "003000090",
    "006200187",
    "904070002",
    "670830000",
    "810045000"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function () {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // 9x9 Board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "0" + c.toString();
            if (board[r][c] != "0") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("0"); // creates array of two individual numbers
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        } 
        else {
            errors += 1;
            document.getElementById("errors").innerText = "Errors: " + errors;
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    let timerElement = document.getElementById('timer');
    let intervalId;
    let elapsedTime = 0;
    let boardCompleted = false;

    function updateTimer() {
        if (!boardCompleted) {
            elapsedTime += 1000;
            let minutes = Math.floor(elapsedTime / 60000);
            let seconds = Math.floor((elapsedTime % 60000) / 1000);

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            timerElement.textContent = `${minutes}:${seconds}`;
        } else {
            clearInterval(intervalId);
        }
    }

    // Start the timer on page load
    intervalId = setInterval(updateTimer, 1000);

    function checkBoardCompletion() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] !== solution[r][c]) {
                    return false;
                }
            }
        }
        return true;
    }

    // Checks board completion every second
    setInterval(() => {
        if (checkBoardCompletion) {
            let event = new Event('boardCompleted');
            document.dispatchEvent(event);
        }
    }, 1000);

    document.addEventListener('boardCompleted', () => {
        boardCompleted = true;
    });
});

// Function to call the SudukoSolver Java File
async function solveSudoku() {
    const board = [
        [0, 0, 7, 4, 9, 1, 6, 0, 5],
        [2, 0, 0, 0, 6, 0, 3, 0, 9],
        [0, 0, 0, 0, 0, 7, 0, 1, 0],
        [0, 5, 8, 6, 0, 0, 0, 0, 4],
        [0, 0, 3, 0, 0, 0, 0, 9, 0],
        [0, 0, 6, 2, 0, 0, 1, 8, 7],
        [9, 0, 4, 0, 7, 0, 0, 0, 2],
        [6, 7, 0, 8, 3, 0, 0, 0, 0],
        [8, 1, 0, 0, 4, 5, 0, 0, 0]
    ];

    try {
        const response = await fetch('/api/solveBoard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        });

        if (response.ok) {
            const solvedBoard = await response.json();
            console.log('Solved Board:', solvedBoard);
            // Update the board on the UI with the solved board
            for (let row = 0; row < board.length; row++) {
                const tr = document.createElement('tr');
                for (let col = 0; col < board[row].length; col++) {
                    const td = document.createElement('td');
                    td.textContent = board[row][col];
                    tr.appendChild(td);
                }
                boardElement.appendChild(tr);
            }
        } else {
            console.error('Failed to solve the Sudoku board.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add an event listener to the "Solve" button
document.addEventListener('DOMContentLoaded', (event) => {
    const solveButton = document.getElementById('solve');
    solveButton.addEventListener('click', solveSudoku);
});

