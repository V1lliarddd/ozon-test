export class ProgressBarState {
  state = "NORMAL";

  setNormalState() {
    this.state = "NORMAL";
  }

  setAnimatedState() {
    this.state = "ANIMATED";
  }

  setHiddenState() {
    this.state = "HIDDEN";
  }

  getState() {
    return this.state;
  }
}
