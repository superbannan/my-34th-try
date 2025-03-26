let playerName = "Guest";
let liamBucks = 0;
let upgrades = {
    upgrade1: { cost: 10, active: false, multiplier: 2 },
    upgrade2: { cost: 25, active: false, multiplier: 5 },
    upgrade3: { cost: 50, active: false, multiplier: 10 }
};
let cheatMode = false;

function changeName() {
    const nameInput = document.getElementById("player-name-input").value;
    if (nameInput) {
        playerName = nameInput;
        document.getElementById("player-name").textContent = "Name: " + playerName;
        checkCheatBoardAccess();
    }
}

function earnLiamBucks() {
    let earned = 1; // base value
    if (upgrades.upgrade1.active) earned *= upgrades.upgrade1.multiplier;
    if (upgrades.upgrade2.active) earned *= upgrades.upgrade2.multiplier;
    if (upgrades.upgrade3.active) earned *= upgrades.upgrade3.multiplier;
    liamBucks += earned;
    updateDisplay();
}

function buyUpgrade(upgrade) {
    if (liamBucks >= upgrades[upgrade].cost && !upgrades[upgrade].active) {
        liamBucks -= upgrades[upgrade].cost;
        upgrades[upgrade].active = true;
        updateDisplay();
        updateUpgradeBoard();
    }
}

function updateDisplay() {
    document.getElementById("liam-bucks").textContent = "Liam Bucks: " + liamBucks;
}

function updateUpgradeBoard() {
    for (const upgrade in upgrades) {
        const upgradeElement = document.getElementById(upgrade);
        if (upgrades[upgrade].active) {
            upgradeElement.querySelector('button').disabled = true;
            upgradeElement.querySelector('p').innerHTML = `${upgrade} (Bought) - Multiplier: x${upgrades[upgrade].multiplier}`;
        }
    }
}

function activateCheats() {
    if (playerName === "Robbie") {
        cheatMode = true;
        liamBucks = 99999; // cheat for unlimited bucks
        upgrades.upgrade1.active = true;
        upgrades.upgrade2.active = true;
        upgrades.upgrade3.active = true;
        updateDisplay();
        updateUpgradeBoard();
        alert("Cheat mode activated! All upgrades unlocked, and you have unlimited Liam Bucks!");
    } else {
        alert("You need to be named Robbie to access cheat mode.");
    }
}

function checkCheatBoardAccess() {
    const cheatBoard = document.getElementById("cheat-board");
    if (playerName === "Robbie") {
        cheatBoard.style.display = "block"; // Show cheat board if name is Robbie
    } else {
        cheatBoard.style.display = "none"; // Hide cheat board
    }
}

updateDisplay();
updateUpgradeBoard();
checkCheatBoardAccess();
