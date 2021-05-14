import processLocationInput from './locationFormatter';

export default class LocationInputDialog {
  constructor(selector) {
    this.dialogElement = document.querySelector(selector);
    this.errorElement = this.dialogElement.querySelector('.dialogError');
    this.locationInput = this.dialogElement.querySelector('.locationInput');

    this.dialogElement.querySelector('.dialogButtonCancel').addEventListener('click', () => {
      this.dialogElement.classList.add('hidden');
    });

    this.dialogElement.querySelector('.dialogButtonOk').addEventListener('click', () => {
      if (!this.locationInput.value) {
        this.errorElement.textContent = 'Заполните поле!';
        return;
      }

      try {
        const position = processLocationInput(this.locationInput.value);
        if (this.onInput) {
          this.onInput(position);
        }
        this.dialogElement.classList.add('hidden');
      } catch (err) {
        this.errorElement.textContent = err.message;
      }
    });
  }

  showDialog(onInput) {
    this.onInput = onInput;
    this.locationInput.value = '';
    this.errorElement.textContent = '';
    this.dialogElement.classList.remove('hidden');
  }
}
