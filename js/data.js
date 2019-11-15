'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var successPopup = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onLoad = function (data) {
    window.data.pins = data;
    window.pin.render(window.data.pins);
    window.filter.activate();
  };

  var closeError = function () {
    var error = document.querySelector('.error');
    error.remove();
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorClick = function () {
    closeError();
  };

  var onErrorEscPress = function (evt) {
    window.util.pressEsc(evt, closeError);
  };

  var onError = function () {
    main.insertAdjacentElement('afterbegin', errorPopup);
    var closeButtonError = document.querySelector('.error__button');
    closeButtonError.addEventListener('click', onErrorClick);
    errorPopup.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var loadPins = function () {
    if (window.data.pins.length === 0) {
      window.backend.load(onLoad, onError);
    }
  };

  var closeSuccess = function () {
    var success = document.querySelector('.success');
    success.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessClick = function () {
    closeSuccess();
  };

  var onSuccessEscPress = function (evt) {
    window.util.pressEsc(evt, closeSuccess);
  };

  var onSuccess = function () {
    main.insertAdjacentElement('afterbegin', successPopup);
    successPopup.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var deactivatePage = function () {
    window.map.element.classList.add('map--faded');
    window.filter.deactivate();
    window.form.deactivate();
    window.pin.remove();
    window.card.remove();
    window.map.getPinMainPrimaryPosition();
    window.photo.remove();
    window.data.pins = [];
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    deactivatePage();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  var onFormSuccessSubmit = function () {
    onSuccess();
    deactivatePage();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onFormSuccessSubmit, onError);
    evt.preventDefault();
  });

  window.data = {
    pins: [],
    loadPins: loadPins
  };
})();
