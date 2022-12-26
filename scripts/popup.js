// const popup = document.querySelector(".popup");
// const popupContainer = popup.querySelector(".popup__container")
// const popupContent = popup.querySelector(".popup__content")
// const popupClose = document.querySelector(".popup__close");
let closeButtons = document.querySelectorAll('.popup__close');

for (let closeButton of closeButtons) {
    addCloseButtonEvent(closeButton);
}

function addCloseButtonEvent(closeButton) {
    closeButton.addEventListener("click", function () {
        closePopup(closeButton.closest('.popup'));
    });
}



function openPopup(popup, withoutBorders = false) {
    popup.classList.add("popup_opened");
    // if(withoutBorders) {
    //     popupContainer.classList.add("popup__container_no-borders");
    //     popupContent.classList.add("popup__content_no-borders");
    // }
    // popupContent.append(content);
}

function closePopup (popup) {
    popup.classList.remove("popup_opened");
    
    // const contentToRemove = popupContent.children[0];
    // setTimeout(() => {
    //         contentToRemove.remove();
    //         popupContent.classList.remove("popup__content_no-borders");
    //         popupContainer.classList.remove("popup__container_no-borders");
    //     },
    //     300
    // );
}
