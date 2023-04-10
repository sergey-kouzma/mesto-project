import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleOpen = () => { }) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector('.form__button');
    this._handleFormSubmit = handleFormSubmit;
    this._handleOpen = handleOpen;

  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__field ');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form = this._popupElement.querySelector('.form')
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.setLoadingStatus();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open() {
    this._handleOpen();
    super.open();
  }

  setLoadingStatus() {
    this._submitButton.textContent = 'Сохранение...';
  }

  resetLoadingStatus() {
    this._submitButton.textContent = 'Сохранить';
  }

}