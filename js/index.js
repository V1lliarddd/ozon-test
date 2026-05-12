import { ProgressBar } from './progress-bar/progress-bar.js';

const container = document.querySelector('.content');

const progressBar = new ProgressBar(container);

progressBar.init();
