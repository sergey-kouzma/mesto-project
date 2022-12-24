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
    cardImg.setAttribute("src", link);
    cardImg.setAttribute("alt", title);
    blockName.textContent = title;
    cardDelete.addEventListener("click", function() {
        cardDelete.parentElement.remove();
    });
    cardImg.addEventListener("click", function() {
        const bigImg = document.createElement("IMG");
        bigImg.setAttribute("src", cardImg.getAttribute("src"));
        bigImg.classList.add("full-picture__img");
        
        const textElement = document.createElement("p");
        textElement.textContent = blockName.textContent;
        textElement.classList.add("full-picture__text");

        const blockWithImg = document.createElement("div");
        bigImg.classList.add("full-picture");
        
        blockWithImg.append(bigImg);
        blockWithImg.append(textElement);

        openPopup(blockWithImg, true);
    });
    cardLike.addEventListener("click", function() {
        cardLike.classList.toggle("card__like_active");
    });
    cardsContainer.append(cardElement);  

}