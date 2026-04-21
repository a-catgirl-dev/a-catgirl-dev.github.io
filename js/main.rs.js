/**
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 *  MIT License
 * 
 *  Copyright (c) 2024 a catgirl 
 *   
 *  Permission is hereby granted, free of charge, to any person obtaining a copy 
 *  of this software and associated documentation files (the "Software"), to deal 
 *  in the Software without restriction, including without limitation the rights 
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 *  copies of the Software, and to permit persons to whom the Software is 
 *  furnished to do so, subject to the following conditions: 
 *   
 *  The above copyright notice and this permission notice shall be included in all 
 *  copies or substantial portions of the Software. 
 *   
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
 *  SOFTWARE. 
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

// the file name is very stupid but i woke up at like 5am and its 11:19pm as of writing
// and i don't drink coffee.
// im off my game completely.

import { Visualizer } from "./visualizer.js";

if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    showMainSite();
else
    document.body.addEventListener("click", go);

function showMainSite() {
    const mainContent = document.getElementById("totally-real-app-mount-react-native-winjs-why-do-people-even-do-this");
    const overlay = document.getElementById("wait-for-input");

    document.body.removeEventListener("click", go)
    overlay.remove();
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
}
window.showMainSite = showMainSite;

function startAudio() {
    const audio = document.getElementById("audio");

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
    const target = document.getElementById("links");
    const element = document.createElement("a");

    // TODO: read the <source> tag and get name there
    element.textContent = "🎵: WYS - Take Me Back";
    element.href = "https://www.youtube.com/watch?v=8uOUPEHsyN8"
    element.target = "_blank"
    target.appendChild(element);
}

function go() {
    document.body.removeEventListener("click", go);
    showMainSite();
    startAudio();
}
