export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector); // popup_opened
    }

    close()  {
        this._popupElement.classlist.remove('popup_opened');
    }

    // setEventListeners() {
    //     document.addEventListener('keyup', this._closeByEsc);
    //     this.card.querySelector('popup_no-borders').addEventListener('click', this._closeByOverlay);
    //     this.card.querySelector('popup__close').addEventListener("click", function () {
    //         this.close();
    //     });
    // }

    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keyup", this._closeByEsc);
    }
    
    _closeByEsc(event) {
        if (event.key === "Escape") {
          this.close(); 
        }
    } 
    
    // _closeByOverlay(event) {
    //     if (event.target === event.currentTarget) {
    //         this.close(event.target);
    //     }
    // } 

    // _addCloseButtonEvent(closeButton) {
    //     const popupToClose = closeButton.closest('.popup');
        
    // }
}

