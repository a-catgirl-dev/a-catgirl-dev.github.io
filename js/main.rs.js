// the file name is very stupid but i woke up at like 5am and its 11:19pm as of writing
// and i don't drink coffee.
// im off my game completely.

import { Visualizer } from "./visualizer.js";

const overlay = document.getElementById("wait-for-input");
const mainContent = document.getElementById("totally-real-app-mount-react-native-winjs-why-do-people-even-do-this");
const audio = document.getElementById("audio");

overlay.addEventListener("click", () => {
    setTimeout(function() {
        var o = 0;
        var timer = setInterval(function() {
            if (o >= 1.5) {
                clearInterval(timer);
            }
            mainContent.style.opacity = o;
            o += 0.01;

            // bad and stupid but im too lazy to figure out how to wait until the timer is over
            mainContent.classList.remove("hidden");
        }, 5);
    }, 0);

    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    overlay.style.display = "none";

    audio.volume = 0.5;
    audio.play().then(() => {
        const visualizer = new Visualizer(audio);
        visualizer.resize();
        visualizer.redraw();
    }).catch(error => {
        console.log("gg.", error);
    });
});
