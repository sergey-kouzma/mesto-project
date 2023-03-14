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

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(function (formElement) {
        const inputs = formElement.querySelectorAll(settings.inputSelector);
        const button = formElement.querySelector(settings.submitButtonSelector);
        inputs.forEach(function (inputElement) {
            const erorr = inputElement.parentNode.querySelector(settings.errorClass);
            inputElement.addEventListener("keyup", function () {
                if (!inputElement.classList.contains(settings.inputURLSelector)) {
                    switch (inputElement.value.length) {
                        case 0:
                            showEror(erorr, "Вы пропустили это поле.");
                            break;
                        case 1:
                            showEror(erorr, "Минимальное размер поля: 2, количество символов сейчас: 1");
                            break;

                        default:
                            hideEror(erorr);
                            break;
                    }
                }
                else {
                    if (!inputElement.validity.valid) {
                        if (inputElement.value.length == 0) {
                            showEror(erorr, "Вы пропустили это поле.");
                        }
                        else {
                            showEror(erorr, "Введите адрес картинки.");
                        }
                    }
                    else {
                        hideEror(erorr);
                    }
                }
                chceckButton(formElement, settings.submitButtonSelector, settings.inputSelector, settings.inactiveButtonSelector);
            });

        })
    })
}