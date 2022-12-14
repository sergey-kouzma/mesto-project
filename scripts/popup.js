const popup = document.querySelector(".popup");
const popupContent = popup.querySelector(".popup__content")
const popupClose = document.querySelector(".popup__close");

popupClose.addEventListener("click", function () {
    closePopup ();
});

function openPopup(content, withoutBorders = false) {
    popup.classList.add("popup_opened");
    if(withoutBorders) {
        popupContent.classList.add("popup__content_no-borders");
    }
    popupContent.append(content);
}

function closePopup () {
    popup.classList.remove("popup_opened");
    popupContent.classList.remove("popup__content_no-borders");
    popupContent.children[0].remove();
}
