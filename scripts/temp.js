function handleLoadError() {
  console.log('Всё идёт не по плану');
}

function handleImageLoad(evt) {
  document.body.append(evt.target);
}

// исправьте тело функции loadImage
function loadImage(imageUrl) {
  const image = document.createElement('img');
  return new Promise((resolve, reject) => {
    image.src = imageUrl;
    image.onerror = reject;
    image.onload = resolve;
    //image.reject = errorCallback;
    //image.resolve = loadCallback;
    document.createElement("img");
  });
}

// работать должно так
loadImage('https://pictures.s3.yandex.net/frontend-developer/functions/dog-1.jpg')
  .then((evt) => {
    document.body.append(evt.target);
  })
  .catch(() => {
    console.error('Всё идёт не по плану.');
  });