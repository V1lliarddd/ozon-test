export class View {
  #title;
  #progressBarSection;
  #progressBarSvg;
  #progressBarOuterCircle;
  #progressBarInnerCircle;
  #controlsSection;
  #valueInput;
  #animateInput;
  #hideInput;

  /**
   *
   * @param {HTMLElement} container
   */
  mount(container) {
    this.#title = this.#initTitle('Progress');
    this.#progressBarSection = this.#initSection('progress-bar');
    this.#progressBarSvg = this.#initProgressBarSvg();
    this.#progressBarOuterCircle = this.#initProgressBarOuterCircle();
    this.#progressBarInnerCircle = this.#initProgressBarInnerCircle();

    this.#progressBarSvg.appendChild(this.#progressBarOuterCircle);
    this.#progressBarSvg.appendChild(this.#progressBarInnerCircle);

    this.#progressBarSection.appendChild(this.#progressBarSvg);

    container.appendChild(this.#title);
    container.appendChild(this.#progressBarSection);

    this.#controlsSection = this.#initSection('controls');

    let label;
    [label, this.#valueInput] = this.#initInput(
      'number',
      'number-input',
      'Value'
    );
    this.#controlsSection.appendChild(label);

    [label, this.#animateInput] = this.#initInput(
      'checkbox',
      'switch-input',
      'Animate'
    );
    this.#controlsSection.appendChild(label);

    [label, this.#hideInput] = this.#initInput(
      'checkbox',
      'switch-input',
      'Hide'
    );
    this.#controlsSection.appendChild(label);

    this.setInputAccessibility(this.#animateInput, true);
    container.appendChild(this.#controlsSection);
  }
  #initTitle(title) {
    const h3 = document.createElement('h3');
    h3.classList.add('title');
    h3.textContent = title;
    return h3;
  }
  #initProgressBarSvg() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('progress-bar__outer-ring');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    svg.setAttribute('viewBox', '0 0 200 200');
    return svg;
  }
  #initProgressBarOuterCircle() {
    const outerCircle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    outerCircle.setAttribute('cx', '100');
    outerCircle.setAttribute('cy', '100');
    outerCircle.setAttribute('r', '60');
    outerCircle.setAttribute('fill', 'none');
    outerCircle.setAttribute('stroke', '#f7f5f5');
    outerCircle.setAttribute('stroke-width', '12');
    return outerCircle;
  }
  #initProgressBarInnerCircle() {
    const innerCircle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    innerCircle.classList.add('progress-bar__inner-ring');
    innerCircle.setAttribute('cx', '100');
    innerCircle.setAttribute('cy', '100');
    innerCircle.setAttribute('r', '60');
    innerCircle.setAttribute('fill', 'none');
    innerCircle.setAttribute('stroke', '#4f68e8');
    innerCircle.setAttribute('stroke-width', '12');
    innerCircle.setAttribute('stroke-linecap', 'butt');
    return innerCircle;
  }
  /**
   *
   * @param {string} className класс секции
   * @returns {HTMLElement} секция
   */
  #initSection(className) {
    const section = document.createElement('section');
    section.classList.add(className);
    return section;
  }
  /**
   *
   * @param {string} type тип инпута
   * @param {string} inputClassName класс инпута
   * @param {string} title заголовок инпута
   * @returns {HTMLElement} лейбл
   * @returns {HTMLInputElement} инпут
   */
  #initInput(type, inputClassName, title) {
    const label = document.createElement('label');
    label.classList.add('controls__group');

    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.classList.add(inputClassName);

    const span = document.createElement('span');
    span.classList.add('input-label');
    span.textContent = title;

    label.appendChild(input);
    label.appendChild(span);

    return [label, input];
  }
  /**
   *
   * @param {number|string} value значение прогресса
   */
  initiateProgress(value) {
    this.#progressBarInnerCircle.style.strokeDasharray = value;
    this.#progressBarInnerCircle.style.strokeDashoffset = value;
  }
  updateProgress(value) {
    this.#progressBarInnerCircle.style.strokeDashoffset = value;
  }
  getValueInput() {
    return this.#valueInput;
  }
  setValueInput(value) {
    this.#valueInput.value = value;
  }
  getAnimateInput() {
    return this.#animateInput;
  }
  getHideInput() {
    return this.#hideInput;
  }
  setToggleInputValue(input, isChecked) {
    input.checked = isChecked;
  }
  setInputAccessibility(input, isDisabled) {
    input.disabled = isDisabled;
  }
}
