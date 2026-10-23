import { COLOR_MAP } from "./data.js";

const arr = [];

const tickts = document.querySelector("#tickts");
const popap = document.getElementById("popap");
const popapUpdate = document.getElementById("popap-update");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");
const openOrClose = document.querySelectorAll(".open-or-clos");

const ajouter = document.querySelector("#ajouter");
const name = document.querySelector("#name");
const positions = document.querySelectorAll(".position");
const number = document.querySelector("#number");

const checkedName = document.querySelector(".checked-name");
const checkedPosition = document.querySelector(".checked-position");
const checkedNumber = document.querySelector(".checked-number");
let countJoueur = document.querySelector(".count-joueur");

const updatName = document.querySelector("#updateName");
const updatePosition = document.querySelectorAll(".updatePosition");
const updateNumber = document.querySelector("#updateNumber");

let namePlayer = "";
let numberPlayer = "";
let positionValue = "";


const players_pl = JSON.parse(localStorage.getItem("players")) || [];
let cou = JSON.parse(localStorage.getItem("numberPlayer")) || 0;

function setNumber() {
    cou = players_pl.length;

    localStorage.setItem("numberPlayer", JSON.stringify(cou));
    countJoueur.textContent = cou;
}


function addPlayer(player) {
    return players_pl.push(player);
}


positions.forEach(position => {
    position.addEventListener("click", () => {
        positionValue = position.dataset.position;
        positions.forEach(btn => {
            btn.classList.remove("background-active");
        });
        position.classList.add("background-active");
    })
})

name.addEventListener("input", (e) => {
    namePlayer = e.target.value;
    checkedName.textContent = "";

    console.log(namePlayer)
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
    
    addPlayer(player)
    localStorage.setItem("players", JSON.stringify(players_pl));
    renderPlayers();
    setNumber()
    popap.hidden = true;
})

updatName.addEventListener("input", (e) => {
    namePlayer = e.target.value;
    checkedName.textContent = "";

    console.log(namePlayer)
});


function getColor(player) {
    return COLOR_MAP[player.position]    
}

function deletedPlayer(id) {
    const players_pl = JSON.parse(localStorage.getItem("players"));

    const filterPlayer = players_pl.filter(u => u.id !== id);
    localStorage.setItem("players", JSON.stringify(filterPlayer));

    renderPlayers()
    setNumber()
    location.reload();
}

    tickts.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete]");
    if (!btn) return;

    const id = Number(btn.dataset.delete);
    deletedPlayer(id);

   console.log(updatePlayer(id2));
});

 tickts.addEventListener("click", (e) => {
    const btn2 = e.target.closest('[data-edit]');

    if (!btn2) return;

    const id2 = Number(btn2.dataset.edit);

   console.log("aymane", getPlayer(id2));
   popapUpdate.hidden = !popapUpdate.hidden;
});



function getPlayer(id) {
    const players_pl = JSON.parse(localStorage.getItem("players"));

    const update = players_pl.find(u => u.id === id);

    updatName.value = update.name;
    updatePosition.value = update.position;
    updateNumber.value = update.number;

    updatePosition.forEach(position => {
        position.classList.remove("background-active");
    })

    updatePosition.forEach(position => {
        if (position.dataset.position === update.position) {
            position.classList.add("background-active")
        }
    });

    
    return update;
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
setNumber();

openOrClosePopap.forEach(btn => {
    btn.addEventListener("click", () => {
        popap.hidden = !popap.hidden;
    })
})

openOrClose.forEach(btn => {
    btn.addEventListener("click", () => {
        popapUpdate.hidden = !popapUpdate.hidden;
    })
})