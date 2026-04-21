import { ProgressBar } from "./progressBar.js";
import { validateNumberInput } from "./helpers.js";

const circleElement = document.getElementById("progress-bar__inner-ring");
const progressElement = document.getElementById("progress-bar");

const numberInput = document.getElementById("value");
const animationSwitch = document.getElementById("isAnimate");
const hideSwitch = document.getElementById("isHide");

const progressBar = new ProgressBar(progressElement, circleElement);

progressBar.initialSetup();

numberInput.addEventListener("input", (e) => {
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
  progressBar.toggleVisibility();
});
