'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var resetBtn = adForm.querySelector('.ad-form__reset');
  var main = document.querySelector('main');

  var onLoad = function (data) {
    window.data.pins = data;
    window.pin.render(window.data.pins);
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
    window.util.onEscPress(evt, closeError);
  };

  var onError = function () {
    var errorPopup = document.querySelector('#error').content.querySelector('.error');
    main.insertAdjacentElement('afterbegin', errorPopup);
    var closeBtnError = document.querySelector('.error__button');
    closeBtnError.addEventListener('click', onErrorClick);
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
    window.util.onEscPress(evt, closeSuccess);
  };

  var onSuccess = function () {
    var successPopup = document.querySelector('#success').content.querySelector('.success');
    main.insertAdjacentElement('afterbegin', successPopup);
    successPopup.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var onResetBtnClick = function () {
    window.map.element.classList.add('map--faded');
    window.filter.deactivate();
    window.form.deactivate();
    window.pin.remove();
    window.card.remove();
    window.map.getPinMainPrimaryPosition();
    window.photo.remove();
    window.data.pins = [];
  };

  resetBtn.addEventListener('click', onResetBtnClick);

  var onFormSuccessSubmit = function () {
    onSuccess();
    onResetBtnClick();
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
