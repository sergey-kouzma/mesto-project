const addPlaceButton = document.querySelector(".profile__plus");

const placeFieldImg = document.querySelector(".add-place__img")
const placeFieldName = document.querySelector(".add-place__name");
const addPlaceform = document.querySelector(".add-place__form");

addPlaceButton.addEventListener("click", function () {
    addEventsToPlaceForm();
    openPopup(addPlaceform.closest('.popup'));    
});

function addEventsToPlaceForm() {
    addPlaceform.addEventListener("submit", function (event){
        event.preventDefault();
        addCard(placeFieldName.value, placeFieldImg.value);
        placeFieldName.value = "";
        placeFieldImg.value = "";
        closePopup(addPlaceform.closest('.popup'));
    });
}

