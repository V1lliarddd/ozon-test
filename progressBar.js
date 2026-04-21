import { NORMAL, ANIMATED, HIDDEN } from "./states.js";

export class ProgressBar {
  /**
   *
   * @param {HTMLElement} progressElement - прогресс бар
   * @param {HTMLElement} circleElement - линия выполнения
   * @param {number} timeDelayForAnimation значение для задержкри при анимации(мс)
   */
  constructor(
    progressElement = undefined,
    circleElement = undefined,
    timeDelayForAnimation = 500,
  ) {
    if (circleElement === undefined)
      this.circleElement = document.getElementById("progress-bar__inner-ring");
    else this.circleElement = circleElement;

    if (progressElement === undefined)
      this.progressElement = document.getElementById("progress-bar");
    else this.progressElement = progressElement;

    this.radius = 60;
    this.cirleLength = 2 * Math.PI * this.radius;
    this.animationInterval = null;
    this.timeDelayForAnimation = timeDelayForAnimation;
    this.state = NORMAL;
  }

  /**
   *
   * @param {string} state состояние
   */
  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  initialSetup() {
    this.circleElement.style.strokeDasharray = this.cirleLength;
    this.circleElement.style.strokeDashoffset = this.cirleLength;
  }

  /**
   *
   * @param {number} value на какое значение устанавливаем прогресс
   */
  setValue(value) {
    const diff = this.cirleLength - (value / 100) * this.cirleLength;
    this.circleElement.style.strokeDashoffset = diff;
  }

  /**
   *
   * @param {number} value
   * @param {HTMLElement} numberInput числовой инпут
   * @param {HTMLElement} animationSwitch свитч для анимации
   * @param {HTMLElement} hideSwitch свитч для сокрытия
   * @returns
   */
  setAnimation(value, numberInput, animationSwitch, hideSwitch) {
    if (value === 0) {
      this.setValue(0);
      animationSwitch.checked = false;
      return;
    }
    this.setState(ANIMATED);
    //Отключаю возможность менять состояния
    numberInput.disabled = true;
    animationSwitch.disabled = true;
    hideSwitch.disabled = true;

    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    let totalProgress = 0;

    this.animationInterval = setInterval(() => {
      totalProgress++;
      this.setValue(totalProgress);
      if (totalProgress === value) {
        clearInterval(this.animationInterval);
        this.animationInterval = null;
        numberInput.disabled = false;
        animationSwitch.checked = false;
        animationSwitch.disabled = false;
        hideSwitch.disabled = false;
        this.setState(NORMAL);
      }
    }, this.timeDelayForAnimation);
  }
  /**
   *
   * @param {HTMLElement} numberInput числовой инпут
   * @param {HTMLElement} animationSwitch инпут для анимаций
   */
  toggleVisibility(numberInput, animationSwitch) {
    this.progressElement.classList.toggle("hide");
    if (this.progressElement.classList.contains("hide")) {
      this.setState(HIDDEN);
      // Отключаю возможность менять состояния
      numberInput.disabled = true;
      animationSwitch.disabled = true;
    } else {
      this.setState(NORMAL);
      numberInput.disabled = false;
      animationSwitch.disabled = false;
    }
  }
}
