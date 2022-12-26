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
}

function closePopup (popup) {
    popup.classList.remove("popup_opened");
}



const cardsContainer = document.querySelector(".elements");

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
    addCard(element.name, element.link);
});
function addCard(title, link) {
    const cardElement = createCardElement();
    const cardImg = cardElement.querySelector(".card__img");
    const blockName = cardElement.querySelector(".card__header");
    const cardLike = cardElement.querySelector(".card__like");
    const cardDelete = cardElement.querySelector(".card__delete");
    const bigImg = cardElement.querySelector(".full-picture__img");
    const bigImgText = cardElement.querySelector(".full-picture__text");

    cardImg.setAttribute("src", link);
    cardImg.setAttribute("alt", title);
    bigImg.setAttribute("src", link);
    bigImg.setAttribute("alt", title);
    blockName.textContent = title;
    bigImgText.textContent = title;
    cardDelete.addEventListener("click", function() {
        cardDelete.parentElement.remove();
    });
    
    cardImg.addEventListener("click", function() {
        openPopup(cardElement.querySelector('.popup'), true);
        addCloseButtonEvent(cardElement.querySelector('.popup__close'));
    });
    cardLike.addEventListener("click", function() {
        cardLike.classList.toggle("card__like_active");
    });
    addCloseButtonEvent(cardElement.querySelector('.popup__close'));
    cardsContainer.prepend(cardElement);  
    

}


const addPlaceButton = document.querySelector(".profile__plus");

const placeFieldImg = document.querySelector(".add-place__img")
const placeFieldName = document.querySelector(".add-place__name");
const addPlaceform = document.querySelector(".add-place__form");
addEventsToPlaceForm();

addPlaceButton.addEventListener("click", function () {
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


const editProfileButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


const editProfileForm = document.querySelector(".edit-profile__form")
const fieldName = document.querySelector(".edit-profile__name");
const fieldDescription= document.querySelector(".edit-profile__description");
addEventsToProfileForm();

editProfileButton.addEventListener("click", function () {
    setFields(editProfileForm);
    openPopup(editProfileForm.closest('.popup'));
});

function setFields() {
    fieldName.value = profileName.textContent;
    fieldDescription.value = profileDescription.textContent;
}

function addEventsToProfileForm() {
    editProfileForm.addEventListener("submit", function (event) {
        event.preventDefault();
        profileName.textContent = fieldName.value;
        profileDescription.textContent = fieldDescription.value;
        closePopup (editProfileForm.closest('.popup'));
    });
}


    
