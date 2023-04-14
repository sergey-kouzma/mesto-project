export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector); // popup_opened
        this._closeByEsc = this._closeByEsc.bind(this);
        this._setEventListeners();
        
    }
    
    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keyup", this._closeByEsc);
    }

    close()  {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._closeByEsc);
    }
    
    _setEventListeners() {
        this._popupElement.addEventListener('click', (e) => this._closeByOverlay(e));
        this._popupElement.querySelector('.popup__close').addEventListener("click", () => this.close());
    }

    _closeByEsc(event) {
        if (event.key === "Escape") {
          this.close(); 
        }
    } 
    
    _closeByOverlay(event) {
        if (event.target === event.currentTarget) {
            this.close(event.target);
        }
    } 

}

