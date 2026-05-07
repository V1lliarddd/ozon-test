export class ProgressBarModel {
  #radius = 60;
  #maxProgressValue = 100;
  #minProgressValue = 0;

  getCircleLength() {
    return 2 * Math.PI * this.#radius;
  }

  getValuePercent(value) {
    return (
      this.getCircleLength() -
      (value / this.#maxProgressValue) * this.getCircleLength()
    );
  }

  getNormalizedValue(value) {
    const numberValue = Number(value);
    if (numberValue > this.#maxProgressValue) return this.#maxProgressValue;
    if (numberValue < this.#minProgressValue) return this.#minProgressValue;
    return numberValue;
  }
}
