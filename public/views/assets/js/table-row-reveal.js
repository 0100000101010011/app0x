const userDetails = document.querySelectorAll('.user-details');
const basicDetails = document.querySelectorAll('.basic-details');

const userDetailsArray = Array.prototype.slice.call(userDetails);
const basicDetailsArray = Array.prototype.slice.call(basicDetails);

for (i = 0; i < userDetailsArray.length; i++) {
  userDetailsArray[i]
    .querySelector('.basic-details')
    .addEventListener('click', (e) => {
      e.currentTarget.parentNode
        .querySelector('.more-details')
        .classList.toggle('show');
    });
}

const viewSizes = document.querySelector('.view-sizes');

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
