// the file name is very stupid but i woke up at like 5am and its 11:19pm as of writing
// and i don't drink coffee.
// im off my game completely.

import { Visualizer } from "./visualizer.js";

const overlay = document.getElementById("wait-for-input");
const mainContent = document.getElementById("totally-real-app-mount-react-native-winjs-why-do-people-even-do-this");
const audio = document.getElementById("audio");

let done = false;

function disableAudio() {
    done = true;
    console.log("meow");
    showMainSite();
}
// i hate jhavascript so much
window.disableAudio = disableAudio;

function showMainSite() {
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

    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    overlay.style.display = "none";
}

function startAudio() {
    audio.volume = 0.5;
    audio.play().then(() => {
        const visualizer = new Visualizer(audio);
        visualizer.resize();
        visualizer.redraw();
        provideAttribution();
    }).catch(error => {
        console.log("gg.", error);
    });
}

function provideAttribution() {
    const element = document.createElement("a");
    const target = document.getElementById("links")

    // TODO: read the <source> tag and get name there
    element.textContent = "🎵: venvn - float play";
    element.href = "https://www.youtube.com/watch?v=GrreLo9qchQ"
    element.target = "_blank"
    target.appendChild(element);
}

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    console.log("p");
    // poorly named function, but skips the whole click here thing and doens't do audio.
    disableAudio();
}

document.body.addEventListener("click", () => {
    if (done) {
        // TODO: how do i destroy an eventListener?
        return;
    }
    done = true;

    showMainSite();
    startAudio();
});
