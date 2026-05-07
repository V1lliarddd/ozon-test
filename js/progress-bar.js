import { ProgressBarController } from "./progress-bar-controller.js";
import { ProgressBarModel } from "./progress-bar-model.js";
import { ProgressBarUI } from "./progress-bar-ui.js";
import { ProgressBarState } from "./progress-bar-state.js";

export class ProgressBar {
  constructor(config) {
    this.controller = new ProgressBarController(
      config.valueInput,
      config.animateInput,
      config.hideInput,
    );
    this.model = new ProgressBarModel();
    this.ui = new ProgressBarUI(config.innerCircle, config.outerCircle);
    this.state = new ProgressBarState();
  }

  init() {
    const circleLength = this.model.getCircleLength();
    this.ui.init(circleLength);
    this.#bindHandlers();
  }

  #bindHandlers() {
    this.controller.bindHandler(
      this.controller.valueInput,
      "input",
      this.#setValue.bind(this),
    );

    this.controller.bindHandler(
      this.controller.animateInput,
      "change",
      this.#animate.bind(this),
    );

    this.controller.bindHandler(
      this.controller.hideInput,
      "change",
      this.#hide.bind(this),
    );
  }

  #setValue(value) {
    const normalized = this.model.getNormalizedValue(value);
    const percent = this.model.getValuePercent(normalized);
    this.ui.update(percent);
    this.controller.updateValueInput(String(normalized));
  }

  #animate() {
    this.state.setAnimatedState();
    let initialValue = this.controller.getValueInput();
    const animationInterval = setInterval(() => {
      const isIntervalExist = this.controller.getAnimationInterval();
      if (!isIntervalExist)
        this.controller.setAnimationInterval(animationInterval);
      initialValue--;
      this.controller.updateValueInput(String(initialValue));
      const percent = this.model.getValuePercent(initialValue);
      this.ui.update(percent);
      this.controller.disableInputs(true, this.controller.animateInput);
      if (initialValue === 0) {
        this.state.setNormalState();
        clearInterval(this.controller.animationInterval);
        this.controller.disableInputs(false, this.controller.animateInput);
        this.controller.updateAnimateInput(false);
      }
    }, 500);
  }

  #hide() {
    const isIntervalExist = this.controller.getAnimationInterval();
    if (isIntervalExist) {
      this.controller.clearAnimationInterval();
      this.controller.updateAnimateInput(false);
    }
    const visibility = this.ui.getVisibility();

    visibility ? this.state.setNormalState() : this.state.setHiddenState();

    this.controller.disableInputs(null, this.controller.hideInput);
    this.ui.toggleVisibility();
  }
}
