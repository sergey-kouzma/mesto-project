const addPlaceButton = document.querySelector(".profile__plus");

addPlaceButton.addEventListener("click", function () {
    const addPlaceFormTemplate = document.querySelector("#add-place-template").content;
    const addPlaceFormElement = addPlaceFormTemplate.querySelector(".add-place").cloneNode(true);
    
    addEventsToPlaceForm(addPlaceFormElement);
    openPopup(addPlaceFormElement);
    
});
function addEventsToPlaceForm(addPlaceFormElement) {
    const addPlaceform = addPlaceFormElement.querySelector("form");
    console.log(addPlaceform);
    addPlaceform.addEventListener("submit", function (event){
        event.preventDefault();
        closePopup();
    });
}