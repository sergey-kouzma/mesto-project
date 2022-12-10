const addPlaceButton = document.querySelector(".profile__plus");
const cardsContainer = document.querySelector(".elements");

addPlaceButton.addEventListener("click", function () {
    const addPlaceFormTemplate = document.querySelector("#add-place-template").content;
    const addPlaceFormElement = addPlaceFormTemplate.querySelector(".add-place").cloneNode(true);
    
    addEventsToPlaceForm(addPlaceFormElement);
    openPopup(addPlaceFormElement);    
});

function addEventsToPlaceForm(addPlaceFormElement) {
    const fieldName = addPlaceFormElement.querySelector(".form__field");
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const blockName = cardElement.querySelector(".card__header")
    
    const addPlaceform = addPlaceFormElement.querySelector(".form");
    addPlaceform.addEventListener("submit", function (event){
        event.preventDefault();
        blockName.textContent = fieldName.value;
        cardsContainer.append(cardElement);
        closePopup();
        
    });
}