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

const visualizerBackground = "rgb(24, 24, 37)";
const visualizerBottomColor = "rgba(205, 214, 244, 0.5)";
const visualizerTopColor = "rgba(205, 214, 244, 0.2";

const numberOfBars = 128;
const sampleSize = numberOfBars * 4;

/**
 * ts pmo :wiltering_rose: ts is just cava :pray: :wiltering_rose:
 */
export class Visualizer {
    constructor(audioElement) {
        this.canvas = document.getElementById("visualizer");
        this.ctx = this.canvas.getContext("2d");

        this.audio = audioElement;
        this.audioContext = new window.AudioContext();
        this.analyzer = this.audioContext.createAnalyser();

        this.audioContext.createMediaElementSource(this.audio).connect(this.analyzer);
        this.analyzer.connect(this.audioContext.destination);

        this.analyzer.fftSize = sampleSize;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.data = new Uint8Array(this.bufferLength);

        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = 150;
    }

    redraw() {
        requestAnimationFrame(() => this.redraw());
        this.analyzer.getByteFrequencyData(this.data);

        this.ctx.fillStyle = visualizerBackground;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let barWidth = this.canvas.width / numberOfBars;
        let gap = barWidth * 0.2;

        for (let i = 0; i < numberOfBars; i++) {
            let tmpHeight = this.data[Math.floor((i * 0.5) * (this.bufferLength / numberOfBars))];
            let barHeight = (tmpHeight / 255) * this.canvas.height;

            const gradient = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
            gradient.addColorStop(1, visualizerTopColor);
            gradient.addColorStop(0, visualizerBottomColor);
            this.ctx.fillStyle = gradient;

            this.ctx.fillRect(
                i * (barWidth + gap),
                this.canvas.height - barHeight,
                barWidth - gap,
                barHeight
            );
        }
    }
}
