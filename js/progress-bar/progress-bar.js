import { Controller } from './progress-bar-controller.js';
export class ProgressBar {
  #container;
  #controller;

  constructor(container) {
    this.#container = container;
    this.#controller = new Controller(this.#container);
  }

  init() {
    this.#controller.init();
    // const circleLength = this.#model.getCircleLength();
    // this.#view.mount(this.container);
    // this.#view.initiateProgress(circleLength);
    // const normalizeFn = this.#model.normalizeProgress.bind(this.#model);
    // const getProgressPercentFn = this.#model.getProgressPercent.bind(
    //   this.#model
    // );
    // const updateProgress = this.#view.updateProgress.bind(this.#view);
    // const updateInputValueFn = this.#view.updateInputValue.bind(this.#view);
    // this.#view.bindEventListener(
    //   'value',
    //   'input',
    //   this.#controller.valueInputCallback,
    //   [
    //     normalizeFn,
    //     getProgressPercentFn,
    //     updateProgress,
    //     updateInputValueFn,
    //     updateInputValueFn
    //   ]
    // );
  }
}
