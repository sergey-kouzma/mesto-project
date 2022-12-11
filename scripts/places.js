const addPlaceButton = document.querySelector(".profile__plus");
const cardsContainer = document.querySelector(".elements");

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

function createCardFormElement() {
    const addPlaceFormTemplate = document.querySelector("#add-place-template").content;
    const addPlaceFormElement = addPlaceFormTemplate.querySelector(".add-place").cloneNode(true);
    return addPlaceFormElement;
}

function createCardElement() {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    return cardElement;
}

///////////////////////////////////////
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  ///////////////////////////////////////

initialCards.forEach(function (element) {
    // const cardElement = createCardElement();
    // const blockName = cardElement.querySelector(".card__header");
    // blockName.textContent = element.name;
    // cardsContainer.append(cardElement);
    addCard(element.name, element.link);
});
function addCard(title, link) {
    const cardElement = createCardElement();
    const cardImg = cardElement.querySelector(".card__img");
    const blockName = cardElement.querySelector(".card__header");
    cardImg.setAttribute("src", link);
    blockName.textContent = title;
    cardsContainer.append(cardElement);    
}