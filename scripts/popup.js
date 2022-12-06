const popup = document.querySelector(".popup");
const popupContent = popup.querySelector(".popup__content")
const popupClose = document.querySelector(".popup__close");

popupClose.addEventListener("click", function () {
    closePopup ();
});

function openPopup(content) {
    popup.classList.add("popup_opened");
    popupContent.append(content);
}

function closePopup () {
    popup.classList.remove("popup_opened");
    popupContent.children[0].remove();
}
