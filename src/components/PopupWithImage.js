import {Popup} from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popupElement.querySelector('.full-picture__img');
        this._text = this._popupElement.querySelector('.full-picture__text');
      }
    
      open(name, link) {
        this._img.src = link;
        this._img.alt = name;
        this._text.textContent = name;
    
        super.open();
      }
}