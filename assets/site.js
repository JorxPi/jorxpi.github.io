'use strict';
const imageDialog = document.querySelector('#image-dialog');
let lastImageTrigger = null;
if (imageDialog && typeof imageDialog.showModal === 'function') {
  document.querySelectorAll('.zoom-image').forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      const enlarged = imageDialog.querySelector('img');
      enlarged.src = source.src;
      enlarged.alt = source.alt;
      imageDialog.querySelector('p').textContent = button.closest('figure').querySelector('figcaption')?.textContent || source.alt;
      lastImageTrigger = button;
      imageDialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  imageDialog.querySelector('.close-dialog').addEventListener('click', () => imageDialog.close());
  imageDialog.addEventListener('click', (event) => {
    if (event.target === imageDialog) {
      const bounds = imageDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
    }
  });
  imageDialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    lastImageTrigger?.focus();
  });
}
