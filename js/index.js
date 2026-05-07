import { ProgressBar } from "./progress-bar.js";

const CONFIG = {
  outerCircle: document.querySelector(".progress-bar__outer-ring"),
  innerCircle: document.querySelector(".progress-bar__inner-ring"),
  valueInput: document.getElementById("value"),
  animateInput: document.getElementById("isAnimate"),
  hideInput: document.getElementById("isHide"),
};
const progressBar = new ProgressBar(CONFIG);
progressBar.init();
