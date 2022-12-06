const editProfileButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


editProfileButton.addEventListener("click", function () {
    const profileForm = createEditProfileForm();
    openPopup(profileForm);
});

function createEditProfileForm() {
    const profileFormBlock = createProfileFormBlock();

    setFields(profileFormBlock);
    addEventsToProfileForm(profileFormBlock);

    return profileFormBlock;
}

function createProfileFormBlock() {
    const profileFormTemplate = document.querySelector("#edit-profile-template").content;
    const profileFormBlock = profileFormTemplate.querySelector(".edit-profile").cloneNode(true);
    return profileFormBlock;
}

function setFields(profileFormBlock) {
    const fieldName = profileFormBlock.querySelector(".form__field[name='name']");
    const fieldDescription = profileFormBlock.querySelector(".form__field[name='description']");
    fieldName.value = profileName.textContent;
    fieldDescription.value = profileDescription.textContent;
}

function addEventsToProfileForm(profileFormBlock) {
    const fieldName = profileFormBlock.querySelector(".form__field[name='name']");
    const fieldDescription = profileFormBlock.querySelector(".form__field[name='description']");
    const profileForm = profileFormBlock.querySelector(".form");
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();
        profileName.textContent = fieldName.value;
        profileDescription.textContent = fieldDescription.value;
        closePopup ();
    });
}


    
