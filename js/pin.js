'use strict';

(function () {

  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var PINS_COUNT = 5;

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
