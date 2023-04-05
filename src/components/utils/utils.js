function renderLoading(evt, isLoading) {
    const object = evt.target.querySelector(".form__button")
    if(isLoading) {
      object.textContent = 'Сохранение...'
    } else {
      object.textContent = object.dataset.name
    }
  }

export { renderLoading }