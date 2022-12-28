const closeButtons = document.querySelectorAll('.popup__close');

for (let closeButton of closeButtons) {
    addCloseButtonEvent(closeButton);
}

function addCloseButtonEvent(closeButton) {
    const popupToClose = closeButton.closest('.popup');
    closeButton.addEventListener("click", function () {
        closePopup(popupToClose);
    });
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup (popup) {
    popup.classList.remove("popup_opened");
}

// Часть, которая относится к карточке
// Оставил здесь, а не вверху файла, чтобы легче было потом выносить в отдельный файл, когда такая задача будет
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const popupWithBigImage = document.querySelector('.popup_big-image');
const bigImg = popupWithBigImage.querySelector(".full-picture__img");
const bigImgText = popupWithBigImage.querySelector(".full-picture__text");

function createCardElement() {
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
    addCard({
        title: element.name, 
        link: element.link
    });
});
function addCard(cardInitData) {
    const cardElement = createCard(cardInitData);
    renderCard(cardElement);
}

function createCard(cardInitData) {
    const title = cardInitData.title;
    const link = cardInitData.link;
    const cardElement = createCardElement(); // такой стиль читаемее и рекомендуется, например, Бобом Мартином в Книге Чистый год
    // const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    // незакомментированная строка выглядит гораздо читемее, чем закомментированная
    const cardImg = cardElement.querySelector(".card__img");
    const blockName = cardElement.querySelector(".card__header");
    const cardLike = cardElement.querySelector(".card__like");
    const cardDelete = cardElement.querySelector(".card__delete");
    cardImg.setAttribute("src", link);
    cardImg.setAttribute("alt", title);
    blockName.textContent = title;
    
    cardDelete.addEventListener("click", function() {
        cardDelete.closest('.card').remove();
    });
    cardImg.addEventListener("click", function() {
        bigImg.setAttribute("src", link);
        bigImg.setAttribute("alt", title);
        bigImgText.textContent = title;
        openPopup(popupWithBigImage);
    });
    cardLike.addEventListener("click", function() {
        cardLike.classList.toggle("card__like_active");
    });

    return cardElement;
}

function renderCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

// Часть относящаяся к добавлению мест
const popupAddPlace = document.querySelector('.popup_place-add');
const buttonAddPlace = document.querySelector(".profile__plus");

const placeFieldImg = popupAddPlace.querySelector(".add-place__img")
const placeFieldName = popupAddPlace.querySelector(".add-place__name");
const formAddPlace = popupAddPlace.querySelector(".add-place__form");
addEventsToPlaceForm();

buttonAddPlace.addEventListener("click", function () {
    openPopup(popupAddPlace);    
});

function addEventsToPlaceForm() {
    formAddPlace.addEventListener("submit", function (event){
        event.preventDefault();
        addCard({
            title: placeFieldName.value, 
            link: placeFieldImg.value
        });
        formAddPlace.reset();
        closePopup(popupAddPlace);
    });
}

// Часть про редактирование профайла
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const editProfileButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


const editProfileForm = document.querySelector(".edit-profile__form")
const fieldName = document.querySelector(".edit-profile__name");
const fieldDescription= document.querySelector(".edit-profile__description");
addEventsToProfileForm();

editProfileButton.addEventListener("click", function () {
    setFields(); // вынос кода в отдельный метод делает его более читаемым. Согласно рекомендациям Боба Мартина Чистый Код
    openPopup(popupProfileEdit);
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
        closePopup (popupProfileEdit);
    });
}