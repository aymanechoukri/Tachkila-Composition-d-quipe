import { players } from "./data.js";
import { COLOR_MAP } from "./data.js";

const tickts = document.querySelector("#tickts");
const popap = document.getElementById("popap");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");

const ajouter = document.querySelector("#ajouter");
const name = document.querySelector("#name");
const positions = document.querySelectorAll("#position");
const number = document.querySelector("#number");


let namePlayer = "";
let numberPlayer = "";
let id = 0;
let count = 0;


let positionValue = "";

function addPlayer(player) {
    return players.push(player)
}

positions.forEach(position => {
    position.addEventListener("click", () => {
        positionValue = position.value;
    })
})

name.addEventListener("input", (e) => {
    namePlayer = e.target.value;
    console.log(numberPlayer)
});

number.addEventListener("input", (e) => {
    numberPlayer = e.target.value;
    console.log(numberPlayer)
})
ajouter.addEventListener("click", () => {
    id++;
    const player = {
        id: id,
        name: namePlayer,
        position: positionValue,
        number: numberPlayer
    }
    count++
    console.log("this players ",  addPlayer(player));
    localStorage.setItem("players", JSON.stringify(players));
})



function getColor(player) {
    return COLOR_MAP[player.position]    
}


let html = "";
const players_pl = JSON.parse(localStorage.getItem("players")) || []
players_pl.forEach(player => {

        html += `
                        <article class="flex flex-col gap-6 p-2 border-l-5 rounded-xl ${getColor(player)}">
                            <div class="flex justify-between items-center">
                                    <div class="flex items-center gap-3">
                                        <p class="border-1 ${getColor(player)} px-4 py-2 rounded-[50%] ${getColor(player)}">${player.number}</p>
                                        <div>
                                            <h3 class="text-2xl font-bold ">${player.name}</h3>
                                            <p class="${getColor(player)} font-bold">${player.position}</p>
                                        </div>
                                    </div>
                                    <div class="flex gap-4">
                                        <i class="fa-solid fa-pen-to-square text-slate-400 text-2xl hover:scale-104 cursor-pointer hover:text-slate-500"></i>
                                        <i class="fa-solid fa-trash text-red-400 text-2xl hover:scale-104 cursor-pointer hover:text-red-500"></i>
                                    </div>
                                </div>
                        </article>`
});

tickts.insertAdjacentHTML("beforeend", html);

openOrClosePopap.forEach(btn => {
    btn.addEventListener("click", () => {
        popap.hidden = !popap.hidden;
    })
})

