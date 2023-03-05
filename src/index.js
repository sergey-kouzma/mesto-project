
function showEror(messageElement, erorrMessage, button) {
    messageElement.textContent = erorrMessage;
    button.classList.add("form__button_disactive");
    button.setAttribute("disabled", "disabled");
}

function hideEror(messageElement, button, chceck) {
    messageElement.textContent = "";
    if (chceck) {
        button.classList.remove("form__button_disactive");
        button.removeAttribute("disabled");
    }
}

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
    document.addEventListener("click", function(event) {
        if (event.target == popup) {
            closePopup(popup);
        }
    });
    
    document.addEventListener("keyup", function(event) {
        if (event.key == "Escape") {
            closePopup(popup);
        }
    });
}

function closePopup (popup) {
    popup.classList.remove("popup_opened");
}

// Часть, которая относится к карточке
// Оставил здесь, а не вверху файла, чтобы легче было потом выносить в отдельный файл, когда такая задача будет
const cardsContainer = document.querySelector(".elements");
// const cardTemplate = document.querySelector("#card-template").content;
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const popupWithBigImage = document.querySelector('.popup_big-image');
const bigImg = popupWithBigImage.querySelector(".full-picture__img");
const bigImgText = popupWithBigImage.querySelector(".full-picture__text");

// function createCardElement() {
//     const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
//     return cardElement;
// }

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

function openBigImage(imageData) {
    bigImg.setAttribute("src", imageData.link);
    bigImg.setAttribute("alt", imageData.title);
    bigImgText.textContent = imageData.title;
    openPopup(popupWithBigImage);
}

function createCard(cardInitData) {
    const title = cardInitData.title;
    const link = cardInitData.link;
    //const cardElement = createCardElement(); // такой стиль читаемее и рекомендуется, например, Бобом Мартином в Книге Чистый год
    // const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    // незакомментированная строка выглядит гораздо читемее, чем закомментированная
    const cardElement = cardTemplate.cloneNode(true);
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
    cardImg.addEventListener("click", () => openBigImage({ title, link }));
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
const placeFieldNameErorr = popupAddPlace.querySelector(".add-place__name-erorr");
const placeFieldImgErorr = popupAddPlace.querySelector(".add-place__img-erorr");
const placeFieldButton = popupAddPlace.querySelector(".form__button");
let placeFieldNameCheck = false;
let placeFieldImgCheck = false;
addEventsToPlaceForm();
// if (!formInput.validity.valid) {

// }

placeFieldImg.addEventListener("keyup", function() {
    if (!placeFieldImg.validity.valid) {
        if (placeFieldImg.value.length === 0) {
            showEror(placeFieldImgErorr, "Вы пропустили это поле.", placeFieldButton);
            placeFieldImgCheck = false;
        }
        else {
            showEror(placeFieldImgErorr, "Введите адрес картинки.", placeFieldButton);
            placeFieldImgCheck = false;
        }
    }
    else {
        hideEror(placeFieldImgErorr, placeFieldButton, placeFieldNameCheck);
        placeFieldImgCheck = true;
    }
});

placeFieldName.addEventListener("keyup", function() {
    
    switch (placeFieldName.value.length) {
        case 0:
            showEror(placeFieldNameErorr, "Вы пропустили это поле.", placeFieldButton);
            placeFieldNameCheck = false;
            break;
        case 1:
            showEror(placeFieldNameErorr, "Минимальное размер поля: 2, количество символов сейчас: 1", placeFieldButton);
            placeFieldNameCheck = false;
            break;
    
        default:
            hideEror(placeFieldNameErorr, placeFieldButton, placeFieldImgCheck);
            placeFieldNameCheck = true;
            break;
    }
})

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
const buttonProfileEdit = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

profileName.addEventListener("keypress", function (){

})

const formProfileEdit = popupProfileEdit.querySelector(".edit-profile__form");
const fieldProfileName = popupProfileEdit.querySelector(".edit-profile__name");
const fieldProfileDescription = popupProfileEdit.querySelector(".edit-profile__description");
const editProfileNameErorr = formProfileEdit.querySelector(".edit-profile__name-erorr");
const editProfileDescriptionErorr = formProfileEdit.querySelector(".edit-profile__description-erorr");
const editProfileButton = formProfileEdit.querySelector(".form__button");
let formProfileDescriptionCheck = true;
let formProfileNameCheck = true;

fieldProfileName.addEventListener("keyup", function() {
    switch (fieldProfileName.value.length) {
        case 0:
            showEror(editProfileNameErorr, "Вы пропустили это поле.", editProfileButton);
            //console.log(fieldProfileName.value.length);;
            break;
        case 1:
            showEror(editProfileNameErorr, "Минимальное размер поля: 2, количество символов сейчас: 1", editProfileButton)
            break;
    
        default:
            hideEror(editProfileNameErorr, editProfileButton, formProfileDescriptionCheck);
            break;
    }
});

fieldProfileDescription.addEventListener("keyup", function() {
    switch (fieldProfileDescription.value.length) {
        case 0:
            showEror(editProfileDescriptionErorr, "Вы пропустили это поле.", editProfileButton);
            break;
        case 1:
            showEror(editProfileDescriptionErorr, "Минимальное размер поля: 2, количество символов сейчас: 1", editProfileButton);
            break;
    
        default:
            hideEror(editProfileDescriptionErorr, editProfileButton, formProfileNameCheck);
            break;
    }
});

buttonProfileEdit.addEventListener("click", function () {
    setFieldsToEditProfileForm(); // вынос кода в отдельный метод делает его более читаемым. Согласно рекомендациям Боба Мартина Чистый Код
    openPopup(popupProfileEdit);
});

function setFieldsToEditProfileForm() {
    fieldProfileName.value = profileName.textContent;
    fieldProfileDescription.value = profileDescription.textContent;
}

function addEventsToProfileForm() {
    formProfileEdit.addEventListener("submit", function (event) {
        event.preventDefault();
        profileName.textContent = fieldProfileName.value;
        profileDescription.textContent = fieldProfileDescription.value;
        closePopup (popupProfileEdit);
    });
}
addEventsToProfileForm();



import './pages/index.css';
