

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

for (let closeButton of closeButtons) {
    addCloseButtonEvent(closeButton);
}
for (let popup of popups) {
    popup.addEventListener("mousedown", closeByOverlay);
}

function addCloseButtonEvent(closeButton) {
    const popupToClose = closeButton.closest('.popup');
    closeButton.addEventListener("click", function () {
        closePopup(popupToClose);
    });
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keyup", closeByEsc);
}

function closeByEsc(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup); 
    }
} 

function closeByOverlay(event) {
    // const openedPopup = document.querySelector('.popup_opened');
    // if (event.target == openedPopup) {
    //     closePopup(openedPopup);
    // }
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
} 

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", closeByEsc);
}
export { openPopup, closePopup }
