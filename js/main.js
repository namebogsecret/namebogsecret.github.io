/**
 * Основной JavaScript-файл для управления портфолио
 */

document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем функциональность модального окна
    window.projectModal.initModal();
    
    // Инициализируем загрузку проектов
    window.projectLoader.initApp();
    
    // Инициализируем переключение тем
    initThemeToggle();
    
    // Проверяем предпочтение пользователя по темной теме
    checkUserThemePreference();
  });
  
  /**
   * Инициализирует переключатель темы
   */
  function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    themeToggleBtn.addEventListener('click', () => {
      // Переключаем класс темы на body
      document.body.classList.toggle('dark-theme');
      
      // Сохраняем предпочтение пользователя
      const isDarkTheme = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    });
  }
  
  /**
   * Проверяет предпочтение пользователя по темной теме
   */
  function checkUserThemePreference() {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    
    // Если тема была сохранена, применяем ее
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
    } else {
      // Если предпочтение не сохранено, проверяем системные настройки
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark-theme');
      }
    }
  }
  
  /**
   * Анимирует появление элементов при прокрутке
   */
  function initScrollAnimation() {
    // Создаем наблюдатель для анимации при появлении элементов
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // Перестаем наблюдать после анимации
        }
      });
    }, { threshold: 0.1 }); // Элемент считается видимым, когда 10% его площади видно
    
    // Наблюдаем за всеми карточками проектов
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.add('fade-in');
      fadeObserver.observe(card);
    });
    
    // Наблюдаем за заголовками секций
    document.querySelectorAll('.section-title').forEach(title => {
      title.classList.add('slide-in');
      fadeObserver.observe(title);
    });
  }
  
  /**
   * Инициализирует отслеживание аналитики
   */
  function initAnalytics() {
    // Создаем пиксель для отслеживания
    const img = new Image();
    const uniqueParam = new Date().getTime();
    img.src = `https://stat.podlevskikh.com/pixel.jpg?website=${encodeURIComponent(window.location.href)}&unique=${uniqueParam}`;
    img.style.display = "none";
    document.body.appendChild(img);
    
    // Добавляем отслеживание кликов по проектам
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        if (projectId) {
          trackEvent('project_view', { project_id: projectId });
        }
      });
    });
  }
  
  /**
   * Отслеживает пользовательское событие
   * @param {string} eventName Название события
   * @param {Object} params Параметры события
   */
  function trackEvent(eventName, params = {}) {
    // Отправляем информацию о событии
    const img = new Image();
    const paramsString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    img.src = `https://stat.podlevskikh.com/event.jpg?event=${encodeURIComponent(eventName)}&${paramsString}&time=${Date.now()}`;
    img.style.display = "none";
    document.body.appendChild(img);
  }
  
  // Добавляем анимацию появления элементов при загрузке окна
  window.addEventListener('load', () => {
    // Инициализируем анимацию прокрутки
    initScrollAnimation();
    
    // Инициализируем аналитику
    initAnalytics();
  });