(function () {
  'use strict';

  // The HTML supplies the accessible fallback; enhance it in the visitor's year.
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('.copyright .year').forEach(function (year) {
    year.textContent = '2018 - ' + currentYear;
  });
}());
