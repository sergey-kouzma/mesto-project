export default class FormValidation {
    constructor(config, anyPopup) {
        this._config = config;
        this._inputError = config.inputErrorClassName;
        this._errorNotification = config.errorClass;
        this._inactiveButtonSelector = config.inactiveButtonSelector;
        this._inputBlockSelector = config.inputBlockSelector;
        this._formElement = anyPopup;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showError(errorElement, inputElement, errorMessage) {
        inputElement.classList.add(this._inputError);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorNotification);
    }

    _hideError(errorElement, inputElement) {
        inputElement.classList.remove(this._inputError);
        errorElement.classList.remove(this._errorNotification);
        errorElement.textContent = "";
    }

    _checkInputValidity(errorElement, inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showError(
                errorElement,
                inputElement,
                inputElement.validationMessage,
                this._config
            );
        } else {
            this._hideError(errorElement, inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonSelector);
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonSelector);
            this._buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._formElement.addEventListener("reset", () => {
            setTimeout(() => {
                this._toggleButtonState();
            }, 0);
        });

        this._inputList.forEach((inputElement) => {
            const errorElement = inputElement.closest(this._inputBlockSelector).querySelector(this._errorNotification);
            inputElement.addEventListener("keyup", () => {
                this._checkInputValidity(errorElement, inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}
