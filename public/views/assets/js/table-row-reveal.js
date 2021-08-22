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
