'use strict';

(function () {
  var PINS_COUNT = 8;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var mapPins = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var adElement = pinTemplate.cloneNode(true);

    adElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    adElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    adElement.querySelector('img').src = pin.author.avatar;
    adElement.alt = pin.offer.title;

    return adElement;
  };

  var onLoad = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PINS_COUNT; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    mapPins.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var errorPopup = document.querySelector('#error').content.querySelector('.error');
    var errorText = errorPopup.querySelector('.error__message');
    errorText.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  window.backend.load(onLoad, onError);
})();
