export class ProgressBarUI {
  #outerCircle;
  #innerCircle;

  constructor(innerCircle, outerCircle) {
    this.#innerCircle = innerCircle;
    this.#outerCircle = outerCircle;
  }

  init(circleLength) {
    this.#innerCircle.style.strokeDasharray = circleLength;
    this.#innerCircle.style.strokeDashoffset = circleLength;
  }

  update(percent) {
    this.#innerCircle.style.strokeDashoffset = percent;
  }

  toggleVisibility() {
    this.#outerCircle.classList.toggle("hide");
  }

  getVisibility() {
    return this.#outerCircle.classList.contains("hide");
  }
}
