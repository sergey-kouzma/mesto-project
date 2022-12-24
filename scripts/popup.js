const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container")
const popupContent = popup.querySelector(".popup__content")
const popupClose = document.querySelector(".popup__close");

popupClose.addEventListener("click", function () {
    closePopup ();
});

function openPopup(content, withoutBorders = false) {
    popup.classList.add("popup_opened");
    if(withoutBorders) {
        popupContainer.classList.add("popup__container_no-borders");
        popupContent.classList.add("popup__content_no-borders");
    }
    popupContent.append(content);
}

function closePopup () {
    popup.classList.remove("popup_opened");
    
    const contentToRemove = popupContent.children[0];
    setTimeout(() => {
            contentToRemove.remove();
            popupContent.classList.remove("popup__content_no-borders");
            popupContainer.classList.remove("popup__container_no-borders");
        },
        300
    );
}
