// Show/Hide the user details and options in the table list of users
const tableTbody = document.querySelectorAll('.table__tbody');
const tbodyRow1 = document.querySelectorAll('.tbody__row--1');

const tableTbodyArray = Array.prototype.slice.call(tableTbody);
const tbodyRow1Array = Array.prototype.slice.call(tbodyRow1);

for (i = 0; i < 3; i++) {
  tableTbody[i].querySelector('.tbody__row--2').classList.add('show');
}

for (i = 0; i < tableTbodyArray.length; i++) {
  tableTbodyArray[i]
    .querySelector('.tbody__row--1')
    .addEventListener('click', (e) => {
      e.currentTarget.parentNode
        .querySelector('.tbody__row--2')
        .classList.toggle('show');
    });
}

// Scale the viewport
const desktopIcon = document.querySelector('.gg-screen');
const bodyEl = document.querySelector('.wrapper');

desktopIcon.addEventListener('click', function (e) {
  console.log(e.target);
  bodyEl.classList.toggle('scale');
});

// If it's a mobile phone, hide the view size buttons
const viewSizes = document.querySelector('.component__view--select');

// res https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
}

console.log(isMobileDevice());

if (isMobileDevice() === true) {
  viewSizes.classList.toggle('hide');
}

// Offset sticky nav

// res https://stackoverflow.com/questions/19158559/how-to-fix-a-header-on-scroll
function findOffset(element) {
  var top = 0,
    left = 0;

  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left,
  };
}

window.onload = function () {
  var stickyHeader = document.getElementById('sticky');
  var headerOffset = findOffset(stickyHeader);

  window.onscroll = function () {
    // body.scrollTop is deprecated and no longer available on Firefox
    var bodyScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (bodyScrollTop > headerOffset.top) {
      stickyHeader.classList.add('fixed');
    } else {
      stickyHeader.classList.remove('fixed');
    }
  };
};
