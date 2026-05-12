export class Model {
  #radius = 60;
  #maxProgress = 100;
  #minProgress = 0;
  #animationInterval;

  getCircleLength() {
    return 2 * Math.PI * this.#radius;
  }

  getProgressPercent(value) {
    const circleLength = this.getCircleLength(this.#radius);
    return circleLength - (value / this.#maxProgress) * circleLength;
  }

  normalizeProgress(progress) {
    if (progress > this.#maxProgress) return this.#maxProgress;
    if (progress < this.#minProgress) return this.#minProgress;
    return progress;
  }

  getAnimationInterval() {
    return this.#animationInterval;
  }

  setAnimationInterval(interval) {
    this.#animationInterval = interval;
  }
}
