// the file name is very stupid but i woke up at like 5am and its 11:19pm as of writing
// and i don't drink coffee.
// im off my game completely.

import { Visualizer } from "./visualizer.js";

const audio = document.getElementById("audio");

// ugh, no volume in <audio> tag, so must do it here
// non JS users would hear it at maximum volume
audio.volume = 0.5;

const visualizer = new Visualizer(audio);
visualizer.resize();
visualizer.redraw();
