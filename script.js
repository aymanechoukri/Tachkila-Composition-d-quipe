import { players } from "./data.js";
const tickts = document.querySelector("#tickts");
const popap = document.getElementById("popap");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");


tickts.innerHTML = "";

players.forEach(player => {
        tickts.innerHTML += `
                        <article id="tickts" class="flex flex-col gap-6 p-2 border-orange-500 border-l-5 rounded-xl">
                            <div class="flex justify-between items-center">
                                    <div class="flex items-center gap-3">
                                        <p class="border-1 border-orange-500 px-4 py-2 rounded-[50%] text-orange-500">${player.num}</p>
                                        <div>
                                            <h3 class="text-2xl font-bold ">${player.name}</h3>
                                            <p class="text-orange-500 font-bold">${player.position}</p>
                                        </div>
                                    </div>
                                    <div class="flex gap-4">
                                        <i class="fa-solid fa-pen-to-square text-slate-400 text-2xl hover:scale-104 cursor-pointer hover:text-slate-500"></i>
                                        <i class="fa-solid fa-trash text-red-400 text-2xl hover:scale-104 cursor-pointer hover:text-red-500"></i>
                                    </div>
                                </div>
                        </article>`
});

openOrClosePopap.forEach(btn => {
    btn.addEventListener("click", () => {
        popap.hidden = !popap.hidden;
    })
})