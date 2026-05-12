import { Model } from './progress-bar-model.js';
import { View } from './progress-bar-view.js';

export class Controller {
  #model = new Model();
  #view = new View();
  #container;

  constructor(container) {
    this.#container = container;
  }

  init() {
    const circleLength = this.#model.getCircleLength();
    this.#view.mount(this.#container);
    this.#view.initiateProgress(circleLength);
    this.#bindInputValueHandler();
    this.#bindInputAnimateHandler();
  }

  #bindInputValueHandler() {
    this.#view.getValueInput().addEventListener('input', (e) => {
      const numberValue = Number(e.target.value);
      const animateInput = this.#view.getAnimateInput();
      if (numberValue === 0) {
        this.#view.setInputAccessibility(animateInput, true);
      } else {
        this.#view.setInputAccessibility(animateInput, false);
      }
      const normalizedValue = this.#model.normalizeProgress(numberValue);
      if (numberValue !== normalizedValue) {
        this.#view.setValueInput(normalizedValue);
      }
      const percent = this.#model.getProgressPercent(normalizedValue);
      this.#view.updateProgress(percent);
    });
  }
  #bindInputAnimateHandler() {
    this.#view.getAnimateInput().addEventListener('change', () => {
      const valueInput = this.#view.getValueInput();
      const animateInput = this.#view.getAnimateInput();
      this.#view.setInputAccessibility(animateInput, true);
      this.#view.setInputAccessibility(valueInput, true);
      let initialValue = Number(valueInput.value);
      const interval = this.#createInterval(
        initialValue,
        animateInput,
        valueInput
      );
    });
  }

  #createInterval(initialValue, animateInput, valueInput) {
    const interval = setInterval(() => {
      initialValue--;
      let percent = this.#model.getProgressPercent(initialValue);
      this.#view.updateProgress(percent);
      if (initialValue === 0) {
        this.#view.setInputAccessibility(animateInput, false);
        this.#view.setInputAccessibility(valueInput, false);
        this.#view.setValueInput(0);
        this.#view.setToggleInputValue(animateInput, false);
        clearInterval(interval);
      }
    }, 500);
    this.#model.setAnimationInterval(interval);
    return interval;
  }
  #bindInputHideHandler() {}
}
