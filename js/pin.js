'use strict';
(function () {

  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var PINS_COUNT = 5;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.alt = pin.offer.title;

    var onPinElementClick = function () {
      var mapCard = map.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
      window.card.renderCard(pin);
    };

    pinElement.addEventListener('click', onPinElementClick);

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.keyCode.ENTER_KEYCODE) {
        onPinElementClick();
      }
    });

    return pinElement;
  };

  var render = function (data) {
    var takeNumber = data.length > PINS_COUNT ? PINS_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderPin(data[i]));
    }
  };

  window.pin = {
    mapPins: mapPins,
    render: render
  };
})();
