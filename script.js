import { COLOR_MAP } from "./data.js";

const POSITIONS_AUTORISEES = {
    Gardien: [
        { value: "GB", label: "GB - Gardien" }
    ],

    Defenseur: [
        { value: "DG", label: "DG - Défenseur gauche" },
        { value: "DC1", label: "DC1 - Défenseur central 1" },
        { value: "DC2", label: "DC2 - Défenseur central 2" },
        { value: "DD", label: "DD - Défenseur droit" }
    ],

    Milieu: [
        { value: "MG", label: "MG - Milieu gauche" },
        { value: "MC1", label: "MC1 - Milieu central 1" },
        { value: "MC2", label: "MC2 - Milieu central 2" },
        { value: "MD", label: "MD - Milieu droit" }
    ],

    Buteur: [
        { value: "BU1", label: "BU1 - Buteur 1" },
        { value: "BU2", label: "BU2 - Buteur 2" }
    ]
};

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
const modifier = document.querySelector("#modifier");
const error = document.querySelector(".error");


let namePlayer = "";
let numberPlayer = "";
let positionValue = "";

let updateNameValue = "";
let updateNumberValue = "";
let updatePositionValue = "";

let playerId = null;



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
        console.log(positionValue)
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

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    let validation = true;
    if (!nameRegex.test(namePlayer.trim())) {
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
    for (let i = 0; i < players_pl.length; i++) {
        if (Number(numberPlayer) === Number(players_pl[i].number)) {
            error.textContent = "Ce numéro est déjà accepté.";
            validation = false;
            break;
        }
    }


    if (!validation) {
        return;
    }
    console.log(positionValue)
    
    const player = {
        id: Date.now(),
        name: namePlayer,
        position: positionValue,
        number: numberPlayer,
        selection: POSITIONS_AUTORISEES[positionValue],
        assignedPosition: ""
    }
    
    addPlayer(player)
    localStorage.setItem("players", JSON.stringify(players_pl));
    name.value = "";
    number.value = "";

    positions.forEach(position => {
        position.classList.remove("background-active");
    });

    checkedName.textContent = "";
    checkedPosition.textContent = "";
    checkedNumber.textContent = "";
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
    const players_pl = JSON.parse(localStorage.getItem("players")) || [];

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
});

 tickts.addEventListener("click", (e) => {
   const btn2 = e.target.closest('[data-edit]');

    if (!btn2) return;

    const id2 = Number(btn2.dataset.edit);

    playerId = id2;
    getPlayer(playerId)
    popapUpdate.hidden = !popapUpdate.hidden;
});




function getPlayer(id) {
    const players_pl = JSON.parse(localStorage.getItem("players")) || [];

    let update = players_pl.find(u => u.id === id);

    if (!update) return
    updatName.value = update.name;
    updateNumber.value = update.number;

    updateNameValue = update.name;
    updatePositionValue = update.position;
    updateNumberValue = String(update.number);

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

updatName.addEventListener("input", (e) => {
    updateNameValue = e.target.value;
    checkedName.textContent = "";

    console.log(updateNameValue)
})

updatePosition.forEach(position => {
    position.addEventListener('click', () => {
        updatePositionValue = position.dataset.position;

        updatePosition.forEach(position => {
            position.classList.remove("background-active");
        });

        position.classList.add("background-active");
    });
})

updateNumber.addEventListener("input", (e) => {
    updateNumberValue = e.target.value;
    console.log(updateNumberValue);
});


modifier.addEventListener("click", () => {
    let validation = true;
    console.log(playerId)
    
   
    if (!updatePositionValue) {
        checkedPosition.textContent = "Définir le poste du joueur";
        validation = false;
    }

    if (
    updateNumberValue.trim() === "" ||
    Number(updateNumberValue) < 1 ||
    Number(updateNumberValue) > 99 ||
    !Number.isInteger(Number(updateNumberValue))
) {
    checkedNumber.textContent = "Entrez un numéro entre 1 et 99";
    validation = false;
}

   if (!validation) {
        return;
    }
    
   const player = players_pl.find(u => u.id === playerId);
   console.log(playerId)

   if (!player) return;

   player.name = updateNameValue.trim();
   player.position = updatePositionValue;
   player.number = Number(updateNumberValue);

   localStorage.setItem("players", JSON.stringify(players_pl));

   renderPlayers()
    setNumber()
    popapUpdate.hidden = true;
    
});


let html = "";


function renderPlayers() {
    tickts.innerHTML = "";

    players_pl.forEach(player => {
        const color = getColor(player);

        const html = `
            <article value=${player.id} class="flex flex-col gap-6 p-2 border-l-5 rounded-xl ${color} article">
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
                            class="btn-edit fa-solid fa-pen-to-square text-slate-400 text-2xl cursor-pointer hover:text-slate-500"
                        ></i>

                        <i
                            data-delete="${player.id}"
                            class="fa-solid fa-trash text-red-400 text-2xl cursor-pointer hover:text-red-500"
                        ></i>
                    </div>
                </div>

                <select  data-player=${player.id} name="position"  class="w-full h-[6vh] border border-slate-700 outline-none text-lg text-gray-300 bg-slate-800 font-bold px-4 rounded-lg cursor-pointer transition-all duration-300 focus:${color} hover:${color}" >
                    <option value="" disabled ${player.assignedPosition ? "" : "selected"}>
                        Choisir un poste
                    </option>
                    ${(POSITIONS_AUTORISEES[player.position] || []).map(u => `
                    <option
                            value="${u.value}"
                            ${player.assignedPosition === u.value ? "selected" : ""}
                        >
                            ${u.label}
                        </option>
                        `).join("")}
                </select>
            </article>
        `;

        tickts.insertAdjacentHTML("beforeend", html);
    });
}

function renderPitch() {
  players_pl.forEach(player => {
    if (!player.assignedPosition) return;

    const namePl = document.querySelector(
      `.name-pl[value="${player.assignedPosition}"]`
    );

    const numPl = document.querySelector(
      `.num-pl[value="${player.assignedPosition}"]`
    );

    if (namePl && numPl) {
      namePl.textContent = player.name;
      numPl.textContent = player.number;
    }
  });
}

renderPlayers();
renderPitch()
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
});



let nameJoueur = "";
let numberJoueur = "";


tickts.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-player]");

    if (!btn) return;

    const id = Number(btn.dataset.player);
    playerId =id;

    const player = players_pl.find(u => u.id === id);
    console.log(player);
    
    nameJoueur = player.name;
    numberJoueur = player.number;
})


tickts.addEventListener("change", (e) => {
    if (!e.target.matches("select[data-player]")) return;

    const select = e.target;
    const id = Number(select.dataset.player);
    const valueSelect = select.value;

    const player = players_pl.find(u => u.id === id);
    if (!player) return;

    const postesAutorises =
        POSITIONS_AUTORISEES[player.position] || [];

    if (!postesAutorises.some(p => p.value === valueSelect)) {
        alert("Ce joueur ne peut pas jouer à ce poste !");
        select.value = "";
        return;
    }

    const namePl = document.querySelector(
        `.name-pl[value="${valueSelect}"]`
    );

    const numPl = document.querySelector(
        `.num-pl[value="${valueSelect}"]`
    );

    if (!namePl || !numPl) return;

    if (
        namePl.textContent !== "?" &&
        namePl.textContent !== player.name
    ) {
        alert("Cette position est déjà occupée !");
        select.value = "";
        return;
    }

    if (player.assignedPosition) {
        const oldName = document.querySelector(
            `.name-pl[value="${player.assignedPosition}"]`
        );

        const oldNum = document.querySelector(
            `.num-pl[value="${player.assignedPosition}"]`
        );

        if (oldName && oldName.textContent === player.name) {
            oldName.textContent = "?";
            oldNum.textContent = "?";
        }
    }

    namePl.textContent = player.name;
    numPl.textContent = player.number;

    player.assignedPosition = valueSelect;

    localStorage.setItem("players", JSON.stringify(players_pl));
});