import $ from '../utils';

const topBtn = $('[data-js-backtotop]');
function backToTop() {
  if (window.pageYOffset > 100) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
}
backToTop();
window.addEventListener('scroll', backToTop);
topBtn.addEventListener('click', $.scroll);
