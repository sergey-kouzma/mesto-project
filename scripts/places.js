const addPlaceButton = document.querySelector(".profile__plus");

addPlaceButton.addEventListener("click", function () {
    const addPlaceFormElement = createCardFormElement();
    
    addEventsToPlaceForm(addPlaceFormElement);
    openPopup(addPlaceFormElement);    
});

function addEventsToPlaceForm(addPlaceFormElement) {
    const fieldImg = addPlaceFormElement.querySelector(".form__field[name='img']")
    const fieldName = addPlaceFormElement.querySelector(".form__field[name='name']");
    const addPlaceform = addPlaceFormElement.querySelector(".form");

    addPlaceform.addEventListener("submit", function (event){
        event.preventDefault();
        // const cardElement = createCardElement();
        // const blockName = cardElement.querySelector(".card__header");
        // blockName.textContent = fieldName.value;
        // cardsContainer.append(cardElement);
        addCard(fieldName.value, fieldImg.value);
        closePopup();
        
    });
}

