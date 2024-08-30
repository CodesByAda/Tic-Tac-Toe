const cells = document.querySelectorAll(".cells");
const statusText = document.querySelector(".statusText");
const resetbutton = document.querySelector(".resetBtn"); // Correct class selector

let isRunning = true;
let player = "x";
const winlist = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (!cell.textContent && isRunning) { 
            cell.textContent = player;
            checkWinner();
        }
    });
});

const updateStatus = () => statusText.textContent = `${player.toUpperCase()}'s Turn`;

const checkWinner = () => {
    for (let pattern of winlist) {
        let [val1, val2, val3] = pattern.map(index => cells[index].textContent);
        
        if (val1 && val2 && val3 && val1 === val2 && val2 === val3) {
            statusText.textContent = `${val1.toUpperCase()} Won`;
            isRunning = false;
            return;
        }
    }

    // Check for draw
    let allFilled = true
    for (let cell of cells) {
        if (!cell.textContent) {
            allFilled = false;
            break;
        }
    }
    
    if (allFilled) {
        statusText.textContent = "It's a Draw!";
        isRunning = false;
    } else {
        player = player === "x" ? "o" : "x";
        updateStatus();
    }

};

resetbutton.addEventListener("click", () => {
    for (let cell of cells) {
        isRunning = true;
        cell.textContent = "";
        player = "x";
        updateStatus();
    }
})