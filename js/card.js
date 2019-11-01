'use strict';

(function () {
  var typeHousing = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photo');

  var createFeature = function (card) {
    var featureFragment = document.createDocumentFragment();
    card.offer.features.forEach(function (it) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureElement);
    });

    return featureFragment;
  };

  var createPhoto = function (card) {
    var photoFragment = document.createDocumentFragment();
    card.offer.photos.forEach(function (it) {
      var photoElement = popupPhoto.cloneNode(true);
      photoElement.src = it;
      photoFragment.appendChild(photoElement);
    });

    return photoFragment;
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeHousing[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(createFeature(card));
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(createPhoto(card));
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    map.insertBefore(cardElement, mapFilters);

    var closeBtnCard = cardElement.querySelector('.popup__close');

    var onEscPressCard = function (evt) {
      if (evt.keyCode === window.util.keyCode.ESC_KEYCODE) {
        removeCard();
      }
    };

    var removeCard = function () {
      cardElement.remove();
      document.removeEventListener('keydown', onEscPressCard);
    };

    var onCloseBtnCardClick = function () {
      removeCard();
    };

    closeBtnCard.addEventListener('click', onCloseBtnCardClick);

    document.addEventListener('keydown', onEscPressCard);

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
