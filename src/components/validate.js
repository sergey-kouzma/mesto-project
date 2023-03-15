function showEror(messageElement, erorrMessage) {
    messageElement.textContent = erorrMessage;
}

function hideEror(messageElement) {
    messageElement.textContent = "";
}

function chceckButton(form, submitButtonSelectorton, inputSelector, submitButtonSelectorDisabled) {
    let isInvalid = false;
    const button = form.querySelector(submitButtonSelectorton);
    const inputs = form.querySelectorAll(inputSelector);

    inputs.forEach(function (inputElement) {
        if (!inputElement.validity.valid) {
            isInvalid = true;
        }
    });
    if (!isInvalid) {
        button.classList.remove(submitButtonSelectorDisabled);
        button.removeAttribute("disabled", "disabled");
    }
    else {
        button.classList.add(submitButtonSelectorDisabled);
        button.setAttribute("disabled", "disabled");
    }
}

function isValid(inputElement, errorElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showEror(errorElement, inputElement.validationMessage);
    }
    else {
        hideEror(errorElement);
    }
}

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(function (formElement) {
        const inputs = formElement.querySelectorAll(settings.inputSelector);
        inputs.forEach(function (inputElement) {
            const erorr = inputElement.parentNode.querySelector(settings.errorClass);
            inputElement.addEventListener("keyup", function () {
                isValid(inputElement, erorr);
                chceckButton(formElement, settings.submitButtonSelector, settings.inputSelector, settings.inactiveButtonSelector);
            });

        })
    })
}