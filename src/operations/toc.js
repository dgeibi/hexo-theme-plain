import $, { $$ } from '../utils';

/* toc scroll */
$$('.toc li a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const hash = decodeURIComponent(link.hash);
    event.preventDefault();
    $.scroll(hash);
    window.location.hash = hash;
  });
});
