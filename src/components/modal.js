

const closeButtons = document.querySelectorAll('.popup__close');

for (let closeButton of closeButtons) {
    addCloseButtonEvent(closeButton);
}

function addCloseButtonEvent(closeButton) {
    const popupToClose = closeButton.closest('.popup');
    closeButton.addEventListener("click", function () {
        closePopup(popupToClose);
    });
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("click", function (event) {
        if (event.target == popup) {
            closePopup(popup);
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.key == "Escape") {
            closePopup(popup);
        }
    });
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}
export { openPopup, closePopup }
