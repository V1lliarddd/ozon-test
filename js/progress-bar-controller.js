export class ProgressBarController {
  constructor(valueInput, animateInput, hideInput) {
    this.valueInput = valueInput;
    this.animateInput = animateInput;
    this.hideInput = hideInput;
    this.animationInterval = null;
  }

  bindHandler(input, action, handler) {
    if (input === this.valueInput) {
      input.addEventListener(action, (e) => {
        handler(e.target.value);
      });
    } else {
      input.addEventListener(action, () => {
        handler();
      });
    }
  }

  setAnimationInterval(interval) {
    this.animationInterval = interval;
  }

  getAnimationInterval() {
    return this.animationInterval;
  }

  clearAnimationInterval() {
    clearInterval(this.animationInterval);
  }

  getValueInput() {
    return Number(this.valueInput.value);
  }

  updateValueInput(val) {
    this.valueInput.value = val;
  }

  updateAnimateInput(val) {
    this.animateInput.checked = val;
  }

  disableInputs(value, origin) {
    if (origin === this.animateInput) {
      this.valueInput.disabled = value;
      this.animateInput.disabled = value;
    } else if (origin === this.hideInput) {
      this.valueInput.disabled = origin.checked;
      this.animateInput.disabled = origin.checked;
    }
  }
}
