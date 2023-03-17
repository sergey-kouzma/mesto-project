function showEror(messageElement, erorrMessage, inputElement, inputErrorClassName) {
    messageElement.textContent = erorrMessage;
    inputElement.classList.add(inputErrorClassName);
}

function hideEror(messageElement, inputElement, inputErrorClassName) {
    messageElement.textContent = "";
    inputElement.classList.remove(inputErrorClassName);
}

function chceckButton(form, button, inputs, submitButtonSelectorDisabled) {
    let isInvalid = false;
    //const button = form.querySelector(submitButtonSelectorton);
    // const inputs = form.querySelectorAll(inputSelector);

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

function isValid(inputElement, errorElement, inputErrorClassName) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showEror(errorElement, inputElement.validationMessage, inputElement, inputErrorClassName);
    }
    else {
        hideEror(errorElement, inputElement, inputErrorClassName);
    }
}

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(function (formElement) {
        const inputs = formElement.querySelectorAll(settings.inputSelector);
        inputs.forEach(function (inputElement) {
            const erorr = inputElement.closest(settings.inputBlockSelector).querySelector(settings.errorClass);
            inputElement.addEventListener("keyup", function () {
                isValid(inputElement, erorr, settings.inputErrorClassName);
                chceckButton(
                    formElement, 
                    formElement.querySelector(settings.submitButtonSelector), 
                    formElement.querySelectorAll(settings.inputSelector), 
                    settings.inactiveButtonSelector
                );
            });

        })
    })
}