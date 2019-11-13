'use strict';

(function () {

  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  var createXhr = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    createXhr(onLoad, onError, 'GET', LOAD_URL);
  };

  var save = function (data, onLoad, onError) {
    createXhr(onLoad, onError, 'POST', SAVE_URL, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
