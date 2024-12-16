document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const nav = document.querySelector('.nav');
  const burgerIcon = document.querySelector('.burger-icon');
  const closeIcon = document.querySelector('.close-icon');

  burgerMenu.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');

    // Переключаем иконки
    burgerIcon.style.display = isOpen ? 'none' : 'block';
    closeIcon.style.display = isOpen ? 'block' : 'none';
  });
});
