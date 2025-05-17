const visualizerBackground = "rgba(30, 30, 46, 1)";
const visualizerColor = "rgba(205, 214, 244, 0.5)";

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

            this.ctx.fillStyle = visualizerColor;
            this.ctx.fillRect(
                i * (barWidth + gap),
                this.canvas.height - barHeight,
                barWidth - gap,
                barHeight
            );
        }
    }
}
