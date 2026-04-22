import { ProgressBar } from "./progressBar.js";
import { validateNumberInput } from "./helpers.js";

class ProgressBarControl {
  /**
   *
   * @param {String} circleId id круга загрузки
   * @param {String} progressBarId id элемента загрузки
   * @param {String} numberInputId id числового инпута
   * @param {String} animationSwitchId id switch'а анимации
   * @param {String} hideSwitchAnimationId id switch'а сокрытия элемента
   */
  constructor(
    circleId,
    progressBarId,
    numberInputId,
    animationSwitchId,
    hideSwitchAnimationId,
  ) {
    this.circleId = circleId;
    this.progressBarId = progressBarId;
    this.numberInputId = numberInputId;
    this.animationSwitchId = animationSwitchId;
    this.hideSwitchAnimationId = hideSwitchAnimationId;
  }

  init() {
    const circleElement = document.getElementById(this.circleId);
    const progressElement = document.getElementById(this.progressBarId);

    const numberInput = document.getElementById(this.numberInputId);
    const animationSwitch = document.getElementById(this.animationSwitchId);
    const hideSwitch = document.getElementById(this.hideSwitchAnimationId);

    const progressBar = new ProgressBar(progressElement, circleElement);

    progressBar.initialSetup();

    numberInput.addEventListener("input", (e) => {
      debugger;
      const initialValue = Number(e.target.value);
      const validatedValue = validateNumberInput(initialValue);
      e.target.value = String(validatedValue);
      progressBar.setValue(validatedValue);
    });

    animationSwitch.addEventListener("change", () => {
      const initialValue = Number(numberInput.value);
      progressBar.setAnimation(
        initialValue,
        numberInput,
        animationSwitch,
        hideSwitch,
      );
    });

    hideSwitch.addEventListener("change", () => {
      progressBar.toggleVisibility(numberInput, animationSwitch);
    });
  }
}

const progressBarControl = new ProgressBarControl(
  "progress-bar__inner-ring",
  "progress-bar",
  "value",
  "isAnimate",
  "isHide",
);

progressBarControl.init();
