'use strict';

(function () {
  var TypeHousing = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var mapFilters = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photo');

  var createFeature = function (card) {
    var featureFragment = document.createDocumentFragment();
    card.offer.features.forEach(function (item) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + item;
      featureFragment.appendChild(featureItem);
    });

    return featureFragment;
  };

  var createPhoto = function (card) {
    var photoFragment = document.createDocumentFragment();
    card.offer.photos.forEach(function (item) {
      var photoItem = popupPhoto.cloneNode(true);
      photoItem.src = item;
      photoFragment.appendChild(photoItem);
    });

    return photoFragment;
  };

  var renderCard = function (card) {
    var cardItem = cardTemplate.cloneNode(true);

    cardItem.querySelector('.popup__title').textContent = card.offer.title;
    cardItem.querySelector('.popup__text--address').textContent = card.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardItem.querySelector('.popup__type').textContent = TypeHousing[card.offer.type.toUpperCase()];
    cardItem.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests;
    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardItem.querySelector('.popup__features').innerHTML = '';
    cardItem.querySelector('.popup__features').appendChild(createFeature(card));
    cardItem.querySelector('.popup__description').textContent = card.offer.description;
    cardItem.querySelector('.popup__photos').innerHTML = '';
    cardItem.querySelector('.popup__photos').appendChild(createPhoto(card));
    cardItem.querySelector('.popup__avatar').src = card.author.avatar;

    window.map.element.insertBefore(cardItem, mapFilters);

    var closeButtonCard = cardItem.querySelector('.popup__close');

    var onCardEscPress = function (evt) {
      window.util.pressEsc(evt, closeCard);
    };

    var closeCard = function () {
      window.pin.deactivate();
      cardItem.remove();
      document.removeEventListener('keydown', onCardEscPress);
    };

    var onCloseButtonCardClick = function () {
      closeCard();
    };

    closeButtonCard.addEventListener('click', onCloseButtonCardClick);
    document.addEventListener('keydown', onCardEscPress);

    return cardItem;
  };

  var removeCard = function () {
    var mapCard = window.map.element.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
