import $, { $$ } from '../utils';

/* toc scroll */
$$('.toc li a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const hash = decodeURIComponent(this.hash);
    event.preventDefault();
    $.scroll(hash);
    window.location.hash = hash;
  });
});
