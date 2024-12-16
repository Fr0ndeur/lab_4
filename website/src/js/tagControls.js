// Массив с данными тегов
const tagsData = [
  { tag: '#МіськаФотографія', count: 4, active: false },
  { tag: '#СімейнаФотосесія', count: 11, active: false },
  { tag: '#ВесільнаЗйомка', count: 7, active: false },
  { tag: '#Пейзажі', count: 9, active: false },
];

// Массив с данными категорий
const categoriesData = [
  { category: 'Люди', active: false },
  { category: 'Події', active: false },
  { category: 'Творчість', active: false },
  { category: 'Місто', active: false },
  { category: 'Природа', active: false },
  { category: 'Персональне', active: false },
];

// Старая логика для отображения тегов в модалке
function renderTags() {
  const activeTagsContainer = document.querySelector('.active-tags');
  const inactiveTagsContainer = document.querySelector('.inactive-tags');

  const activeTags = tagsData
    .filter((tag) => tag.active)
    .sort((a, b) => b.count - a.count);
  const inactiveTags = tagsData
    .filter((tag) => !tag.active)
    .sort((a, b) => b.count - a.count);

  activeTagsContainer.innerHTML = '';
  inactiveTagsContainer.innerHTML = '';

  const createTagElement = ({ tag, count, active }) => {
    const tagElement = document.createElement('a');
    tagElement.href = '#';
    tagElement.classList.add('tag');
    if (active) tagElement.classList.add('active');

    tagElement.innerHTML = `
        ${tag}
        ${active ? '<span class="circle"></span>' : ''}
        <div class="count">
          <span>${count}</span>
        </div>
      `;

    tagElement.addEventListener('click', (event) => {
      event.preventDefault();
      toggleTag(tag);
    });

    return tagElement;
  };

  activeTags.forEach((tag) => {
    activeTagsContainer.appendChild(createTagElement(tag));
  });

  inactiveTags.forEach((tag) => {
    inactiveTagsContainer.appendChild(createTagElement(tag));
  });

  activeTagsContainer.style.display = activeTags.length > 0 ? 'block' : 'none';
}

// Новая логика для отображения тегов в `.portfolio-tags`
function renderPortfolioTags() {
  const portfolioTagsContainer = document.querySelector('.portfolio-tags');

  // Фильтрация и сортировка данных
  const activeCategories = categoriesData.filter((category) => category.active);
  const activeTags = tagsData
    .filter((tag) => tag.active)
    .sort((a, b) => b.count - a.count);
  const inactiveTags = tagsData
    .filter((tag) => !tag.active)
    .sort((a, b) => b.count - a.count);

  // Очистка контейнера
  portfolioTagsContainer.innerHTML = '';

  // Функция для создания элемента категории
  const createCategoryElement = ({ category }) => {
    const categoryElement = document.createElement('a');
    categoryElement.href = '#';
    categoryElement.classList.add('category', 'active');

    // Добавление содержимого
    categoryElement.innerHTML = `
        ${category}
        <span class="close-icon">✖</span>
      `;

    // Привязка логики клика
    categoryElement.addEventListener('click', (event) => {
      event.preventDefault();
      toggleCategory(categoriesData.findIndex((c) => c.category === category));
    });

    return categoryElement;
  };

  // Функция для создания элемента тега
  const createPortfolioTagElement = ({ tag, active }) => {
    const tagElement = document.createElement('a');
    tagElement.href = '#';
    tagElement.classList.add('tag');
    if (active) tagElement.classList.add('active');

    // Добавление содержимого
    tagElement.innerHTML = `
        ${tag}
        ${active ? '<span class="close-icon">✖</span>' : ''}
      `;

    tagElement.addEventListener('click', (event) => {
      event.preventDefault();
      toggleTag(tag);
    });

    return tagElement;
  };

  // Сначала добавляем активные категории
  activeCategories.forEach((category) => {
    portfolioTagsContainer.appendChild(createCategoryElement(category));
  });

  // Затем добавляем активные теги
  activeTags.forEach((tag) => {
    portfolioTagsContainer.appendChild(createPortfolioTagElement(tag));
  });

  // Затем добавляем неактивные теги
  inactiveTags.forEach((tag) => {
    portfolioTagsContainer.appendChild(createPortfolioTagElement(tag));
  });
}

// Логика переключения состояния тега
function toggleTag(tagName) {
  const tag = tagsData.find((t) => t.tag === tagName);
  if (tag) {
    tag.active = !tag.active;
    renderTags(); // Обновление модалки
    renderPortfolioTags(); // Обновление портфолио
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderTags();
  renderPortfolioTags();
  renderCategories();
});

// Логика для категорий
function renderCategories() {
  const categoriesContainer = document.querySelector('.categories-options');

  // Очистка контейнера перед рендерингом
  categoriesContainer.innerHTML = '';

  // Создание элементов для всех категорий
  categoriesData.forEach(({ category, active }, index) => {
    const label = document.createElement('label');
    label.classList.add('category-option');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'category';
    checkbox.value = category;
    checkbox.checked = active; // Устанавливаем состояние из массива

    // Добавляем обработчик события для переключения состояния
    checkbox.addEventListener('change', () => toggleCategory(index));

    // Добавляем текст категории
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(category));

    categoriesContainer.appendChild(label);
  });
}

// Логика переключения состояния категории
function toggleCategory(index) {
  categoriesData[index].active = !categoriesData[index].active;

  // Обновляем модалку и портфолио
  renderCategories(); // Обновление категорий в модалке
  renderPortfolioTags(); // Обновление категорий в портфолио
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderTags();
  renderPortfolioTags();
  renderCategories();
});
