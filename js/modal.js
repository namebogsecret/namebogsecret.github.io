/**
 * Модуль для управления модальным окном проектов
 */

// Глобальное состояние модального окна
const modalState = {
    currentProject: null,
    currentImageIndex: 0,
    images: []
  };
  
  /**
   * Открывает модальное окно с данными о проекте
   * @param {Object} project Данные о проекте
   */
  function openProjectModal(project) {
    // Сначала инициализируем состояние
    modalState.currentProject = project;
    modalState.images = project.images || [];
    modalState.currentImageIndex = 0;
    
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.querySelector('.modal-description');
    const techTagsContainer = document.querySelector('.tech-tags-container');
    const skillTagsContainer = document.querySelector('.skill-tags-container');
    const githubLink = document.getElementById('github-link');
    const demoLink = document.getElementById('demo-link');
    const galleryDots = document.getElementById('gallery-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Заполняем данные о проекте
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    // Заполняем технологии
    techTagsContainer.innerHTML = '';
    project.technologies.forEach(tech => {
      const techTag = document.createElement('span');
      techTag.className = 'modal-tag';
      techTag.textContent = tech;
      techTagsContainer.appendChild(techTag);
    });
    
    // Заполняем навыки
    skillTagsContainer.innerHTML = '';
    project.skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'modal-tag';
      skillTag.textContent = skill;
      skillTagsContainer.appendChild(skillTag);
    });
    
    // Настраиваем кнопки
    if (project.githubLink) {
      githubLink.href = project.githubLink;
      githubLink.innerHTML = '<i class="fab fa-github"></i> Смотреть на GitHub';
      githubLink.style.display = 'flex';
    } else if (project.externalLink) {
      githubLink.href = project.externalLink;
      if (project.externalLink.includes('pypi')) {
        githubLink.innerHTML = '<i class="fab fa-python"></i> Смотреть на PyPI';
      } else if (project.externalLink.includes('instagram')) {
        githubLink.innerHTML = '<i class="fab fa-instagram"></i> Смотреть в Instagram';
      } else {
        githubLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Открыть ссылку';
      }
      githubLink.style.display = 'flex';
    } else {
      githubLink.style.display = 'none';
    }
    
    // Скрываем демо-ссылку, если она не указана
    if (project.demoLink) {
      demoLink.href = project.demoLink;
      demoLink.style.display = 'flex';
    } else {
      demoLink.style.display = 'none';
    }
    
    // Настраиваем галерею изображений
    if (modalState.images.length > 0) {
      modalImage.src = modalState.images[0];
      modalImage.alt = project.title;
      document.querySelector('.modal-gallery').style.display = 'block';
      
      // Создаем точки для навигации по изображениям
      galleryDots.innerHTML = '';
      modalState.images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => showImage(index));
        galleryDots.appendChild(dot);
      });
      
      // Отображаем или скрываем кнопки навигации
      if (modalState.images.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }
    } else {
      document.querySelector('.modal-gallery').style.display = 'none';
    }
    
    // Добавляем обработчики событий для кнопок навигации
    prevBtn.onclick = () => changeImage(-1);
    nextBtn.onclick = () => changeImage(1);
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
  }
  
  /**
   * Закрывает модальное окно
   */
  function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
    
    // Сбрасываем состояние
    modalState.currentProject = null;
    modalState.images = [];
    modalState.currentImageIndex = 0;
  }
  
  /**
   * Переключает изображение в модальном окне
   * @param {number} direction Направление (1 для следующего, -1 для предыдущего)
   */
  function changeImage(direction) {
    if (modalState.images.length <= 1) return;
    
    // Вычисляем новый индекс с учетом цикличности
    let newIndex = modalState.currentImageIndex + direction;
    if (newIndex < 0) newIndex = modalState.images.length - 1;
    if (newIndex >= modalState.images.length) newIndex = 0;
    
    showImage(newIndex);
  }
  
  /**
   * Отображает изображение с указанным индексом
   * @param {number} index Индекс изображения
   */

  function getAbsoluteFilePath(relativePath) {
    // Получаем базовый путь текущей страницы
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    
    // Очищаем relativePath от "./" или "/"
    let cleanPath = relativePath;
    if (cleanPath.startsWith('./')) cleanPath = cleanPath.substring(2);
    if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
    
    // Для file:// протокола возвращаем полный путь
    return `${basePath}/${cleanPath}`;
  }
  function createImageLoader(imagePath, title) {
    return new Promise((resolve) => {
      // Проверяем, является ли путь data URL
      if (imagePath.startsWith('data:')) {
        resolve(imagePath);
        return;
      }
      
      // Очищаем путь
      let cleanPath = imagePath;
      if (cleanPath.startsWith('./')) cleanPath = cleanPath.substring(2);
      if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
      
      // Пробуем загрузить изображение
      const img = new Image();
      
      img.onload = function() {
        resolve(cleanPath); // Изображение загрузилось успешно
      };
      
      img.onerror = function() {
        console.warn("Не удалось загрузить изображение:", imagePath);
        // Возвращаем плейсхолдер
        resolve(`https://via.placeholder.com/800x600?text=${encodeURIComponent(title)}`);
      };
      
      img.src = cleanPath;
    });
  }
  // Затем в функции showImage:
  async function showImage(index) {
    if (index < 0 || index >= modalState.images.length) return;
    
    modalState.currentImageIndex = index;
    
    const modalImage = document.getElementById('modal-image');
    const imageContainer = document.querySelector('.modal-image-container');
    
    // Удаляем класс loaded и добавляем loading
    modalImage.classList.remove('loaded');
    imageContainer.classList.add('loading');
    modalImage.style.opacity = '0.3';
    
    try {
      // Получаем действительный URL изображения
      const imageUrl = await createImageLoader(
        modalState.images[index], 
        modalState.currentProject.title
      );
      
      // Устанавливаем обработчик загрузки
      modalImage.onload = function() {
        // Когда изображение загружено, добавляем класс loaded
        modalImage.classList.add('loaded');
        setTimeout(() => {
          imageContainer.classList.remove('loading');
          modalImage.style.opacity = '1';
        }, 300);
      };
      
      // Устанавливаем изображение
      modalImage.src = imageUrl;
      
      // Обновляем активную точку
      const dots = document.querySelectorAll('.gallery-dot');
      dots.forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.getAttribute('data-index')) === index) {
          dot.classList.add('active');
        }
      });
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
      // В случае ошибки также убираем индикатор загрузки
      modalImage.classList.add('loaded');
      imageContainer.classList.remove('loading');
      modalImage.style.opacity = '1';
    }
  }
  
  /**
   * Инициализирует функциональность модального окна
   */
  function initModal() {
    // Добавляем обработчики для закрытия модального окна
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(button => {
      button.addEventListener('click', closeProjectModal);
    });
    
    // Закрытие по нажатию Escape
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeProjectModal();
      }
    });
    
    // Навигация по изображениям с помощью клавиш
    document.addEventListener('keydown', event => {
      if (!modalState.currentProject) return;
      
      if (event.key === 'ArrowLeft') {
        changeImage(-1);
      } else if (event.key === 'ArrowRight') {
        changeImage(1);
      }
    });
  }
  
  // Экспортируем функции
  window.projectModal = {
    openProjectModal,
    closeProjectModal,
    changeImage,
    showImage,
    initModal
  };