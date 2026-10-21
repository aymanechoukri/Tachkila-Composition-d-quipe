import { COLOR_MAP } from "./data.js";

const tickts = document.querySelector("#tickts");
const popap = document.getElementById("popap");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");

const ajouter = document.querySelector("#ajouter");
const name = document.querySelector("#name");
const positions = document.querySelectorAll("#position");
const number = document.querySelector("#number");

const checkedName = document.querySelector(".checked-name");
const checkedPosition = document.querySelector(".checked-position");
const checkedNumber = document.querySelector(".checked-number");

let namePlayer = "";
let numberPlayer = "";
let positionValue = "";

const players_pl = JSON.parse(localStorage.getItem("players")) || []

function addPlayer(player) {
    return players_pl.push(player);
}

positions.forEach(position => {
    position.addEventListener("click", () => {
        positionValue = position.dataset.position;

        console.log(positionValue)
    })
})

name.addEventListener("input", (e) => {
    namePlayer = e.target.value;
    checkedName.textContent = "";
});

number.addEventListener("input", (e) => {
    numberPlayer = e.target.value;
    checkedName.textContent = "";
})
ajouter.addEventListener("click", () => {
    
    let validation = true;
    if (!namePlayer.trim()) {
        checkedName.textContent = "veuillez saisir votre nom";
        validation = false;
    }

    if (!positionValue) {
        checkedPosition.textContent = "Définir le poste du joueur";
        validation = false;
    }

    if (
    numberPlayer.trim() === "" ||
    Number(numberPlayer) < 1 ||
    Number(numberPlayer) > 99 ||
    !Number.isInteger(Number(numberPlayer))
) {
    checkedNumber.textContent = "Entrez un numéro entre 1 et 99";
    validation = false;
}

    if (!validation) {
        return;
    }
    console.log(positionValue)
    
    const player = {
        id: Date.now(),
        name: namePlayer,
        position: positionValue,
        number: numberPlayer
    }
    console.log("this players ",  addPlayer(player));
    localStorage.setItem("players", JSON.stringify(players_pl));

    renderPlayers();
    popap.hidden = true;
})



function getColor(player) {
    return COLOR_MAP[player.position]    
}


let html = "";


function renderPlayers() {
    tickts.innerHTML = "";

    players_pl.forEach(player => {
        const color = getColor(player);

        const html = `
            <article class="flex flex-col gap-6 p-2 border-l-5 rounded-xl ${color}">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <p class="border-1 ${color} px-4 py-2 rounded-full">
                            ${player.number}
                        </p>

                        <div>
                            <h3 class="text-2xl font-bold">
                                ${player.name}
                            </h3>

                            <p class="${color} font-bold">
                                ${player.position}
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <i
                            data-edit="${player.id}"
                            class="fa-solid fa-pen-to-square text-slate-400 text-2xl cursor-pointer hover:text-slate-500"
                        ></i>

                        <i
                            data-delete="${player.id}"
                            class="fa-solid fa-trash text-red-400 text-2xl cursor-pointer hover:text-red-500"
                        ></i>
                    </div>
                </div>
            </article>
        `;

        tickts.insertAdjacentHTML("beforeend", html);
    });
}


renderPlayers();
openOrClosePopap.forEach(btn => {
    btn.addEventListener("click", () => {
        popap.hidden = !popap.hidden;
    })
})

