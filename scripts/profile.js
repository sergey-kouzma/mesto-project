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


    
