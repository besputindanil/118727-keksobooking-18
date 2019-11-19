'use strict';

(function () {
  var PriceRestrictions = {
    LOWER: 10000,
    UPPER: 50000
  };

  var filters = document.querySelector('.map__filters');
  var filtersSelect = filters.querySelectorAll('select');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var housingFeatures = filters.querySelector('#housing-features');

  var deactivateFilters = function () {
    filters.reset();
    window.util.setDisabled(filtersSelect);
    housingFeatures.disabled = true;
  };

  deactivateFilters();

  var activateFilters = function () {
    window.util.removeDisabled(filtersSelect);
    housingFeatures.disabled = false;
  };

  var filterType = function (pin) {
    return housingType.value === 'any' || pin.offer.type === housingType.value;
  };

  var filterPrice = function (pin) {
    if (housingPrice.value === 'any') {
      return true;
    } else if (housingPrice.value === 'low') {
      return pin.offer.price < PriceRestrictions.LOWER;
    } else if (housingPrice.value === 'middle') {
      return pin.offer.price >= PriceRestrictions.LOWER && pin.offer.price <= PriceRestrictions.UPPER;
    } else if (housingPrice.value === 'high') {
      return pin.offer.price > PriceRestrictions.UPPER;
    }
    return true;
  };

  var filterRooms = function (pin) {
    return housingRooms.value === 'any' || pin.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterGuests = function (pin) {
    return housingGuests.value === 'any' || pin.offer.guests === parseInt(housingGuests.value, 10);
  };

  var filterFeauters = function (pin) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    return [].every.call(checkedFeatures, function (element) {
      return pin.offer.features.includes(element.value);
    });
  };

  var updatePins = function () {
    var pinsCopy = window.data.pins.slice();
    var filterPins = pinsCopy.filter(filterType).filter(filterPrice).filter(filterRooms).filter(filterGuests).filter(filterFeauters);
    window.pin.render(filterPins);
  };

  var onFilterChange = window.debounce(function () {
    window.pin.remove();
    window.card.remove();
    updatePins();
  });

  filters.addEventListener('change', onFilterChange);

  window.filter = {
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
