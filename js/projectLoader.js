/**
 * Модуль для загрузки и отображения проектов из JSON-файла
 */

// Состояние приложения
const state = {
    projects: [],
    currentFilter: 'all',
    currentModalProject: null,
    currentImageIndex: 0
  };
  
  /**
   * Загружает проекты из JSON-файла
   * @returns {Promise<Array>} Массив проектов
   */
//   async function loadProjects() {
//     try {
//       const response = await fetch('data/projects.json');
//       if (!response.ok) {
//         throw new Error('Не удалось загрузить данные о проектах');
//       }
      
//       const data = await response.json();
//       state.projects = data.projects;
//       return state.projects;
//     } catch (error) {
//       console.error('Ошибка при загрузке проектов:', error);
//       return [];
//     }
//   }
function loadProjects() {
    state.projects = [
              {
                "id": "pomodoro_timer",
                "title": "Pomodoro Timer",
                "icon": "fa-github",
                "description": "Productivity-enhancing desktop application with customizable intervals and notification.\n\nNothing beats the simplicity of a Pomodoro timer for boosting productivity and focus.\n\nIf you cannot make you do it, let this timer help you do it.\n\n+100% productivity",
                "categories": ["utilities"],
                "technologies": ["Python", "GUI framework"],
                "skills": ["Desktop application development", "UI/UX design"],
                "githubLink": "https://github.com/namebogsecret/Pomodoro",
                "images": [
                  "./images/projects/pomodoro_timer_1.png", 
                  "./images/projects/pomodoro_timer_2.png"
                ]
              },
              {
                "id": "butch_filename_substring_remover",
                "title": "Batch Filename Substring Remover",
                "icon": "fa-python",
                "description": "Efficient file management utility available on PyPI for bulk file renaming and directory processing.\n\nInstead of complex command: 'find /path/to/directory -depth -name \"*substring1*\" -o -name \"*substring2*\" -o -name \"*substring3*\" -exec bash -c 'new_name=\"${0//substring1/}\"; new_name=\"${new_name//substring2/}\"; new_name=\"${new_name//substring3/}\"; mv \"$0\" \"$new_name\"' {} \\;'\n\nYou can use simple 'butch-rename /path/to/directory substring1 substring2'\n\n+150% to your time",
                "categories": ["utilities"],
                "technologies": ["Python", "OS libraries", "PyPI"],
                "skills": ["File system operations", "Command-line tool development", "Package distribution"],
                "githubLink": "https://pypi.org/project/butch-filename-substring-remover/",
                "images": [],
                "externalLink": "https://pypi.org/project/butch-filename-substring-remover/"
              },
              {
                "id": "server_manager",
                "title": "Server Manager",
                "icon": "fa-telegram",
                "description": "Comprehensive server management solution via Telegram interface for remote command execution, status monitoring, and alert system.\n\n400% time savings in server maintenance.",
                "categories": ["automation-bots"],
                "technologies": ["Python", "Telegram API", "Linux"],
                "skills": ["System administration", "Secure remote management", "Bot development"],
                "githubLink": "https://github.com/namebogsecret/server_manager",
                "images": [
                  "./images/projects/server_manager_1.jpeg",
                  "./images/projects/server_manager_2.jpeg",
                  "./images/projects/server_manager_3.jpeg",
                  "./images/projects/server_manager_4.jpeg",
                  "./images/projects/server_manager_5.jpeg"
                ],
                "featured": true
              },
              {
                "id": "instagram",
                "title": "Instagram Content Automation Bot",
                "icon": "fa-instagram",
                "description": "Automated content creation and posting for Instagram with scheduling.\n\nA project of Dall-e and GPT-4 integration.\n\nCompleatly unique content for your Instagram account.\n\nNo more boring posts.\nAnd no more time waste.",
                "categories": ["automation-bots"],
                "technologies": ["Python", "Instagram API", "NLP libraries"],
                "skills": ["Social media automation", "Content management", "API integration"],
                "externalLink": "https://www.instagram.com/globalviewsai/",
                "images": [
                  "./images/projects/instagram_1.jpeg",
                  "./images/projects/instagram_2.jpeg",
                  "./images/projects/instagram_3.jpeg"
                ],
                "featured": true
              },
              {
                "id": "learnarmenianalphabet",
                "title": "Armenian Alphabet Learning Bot",
                "icon": "fa-github",
                "description": "Educational Telegram bot for language learning with chatGPT integration.\n\nLearn Armenian alphabet with the help of AI.\n\nAI will help you to learn Armenian alphabet in a fun and interactive way.\n\n+39 Armenian letters to your knowledge",
                "categories": ["automation-bots"],
                "technologies": ["Python", "Telegram Bot API", "Language learning algorithms"],
                "skills": ["Educational technology", "Language processing", "Interactive bot design"],
                "githubLink": "https://github.com/namebogsecret/learnarmenianalphabet",
                "images": [
                  "./images/projects/armenian_1.jpeg"
                ]
              },
              {
                "id": "namebogsecret.github.io",
                "title": "Personal Portfolio Website",
                "icon": "fa-github",
                "description": "Showcase of professional projects and skills with responsive design, project gallery, and contact form.\n\n+100% to your personal brand\n+100% to your professional image\n\n+300% invitations to interviews",
                "categories": ["web"],
                "technologies": ["HTML", "CSS", "JavaScript", "GitHub Pages"],
                "skills": ["Web development", "Personal branding", "Version control"],
                "githubLink": "https://github.com/namebogsecret/namebogsecret.github.io",
                "images": []
              },
              {
                "id": "first-contributions",
                "title": "Open Source Contribution Guide",
                "icon": "fa-github",
                "description": "Resource for newcomers to open source development with step-by-step tutorials, best practices, and contribution opportunities.\n\nTest project, where you can make your first contribution to open source.\n\nLearn how to make your first contribution to open source.\n\n+100% to your open source experience",
                "categories": ["web"],
                "technologies": ["Markdown", "Git", "GitHub"],
                "skills": ["Technical writing", "Open source collaboration", "Community building"],
                "githubLink": "https://github.com/namebogsecret/first-contributions",
                "images": []
              },
              {
                "id": "Automatizator",
                "title": "Automatizator: Customer Service Automation",
                "icon": "fa-github",
                "description": "Streamlined customer request handling for tutoring platforms with automated responses and statistics tracking via Telegram.\n\nAutomated customer service for tutoring platform with OpenAI integration.\n\n+300% more customers.\n+200% more time for you.",
                "categories": ["automation-bots"],
                "technologies": ["Python", "Telegram Bot API", "SQL"],
                "skills": ["Process automation", "Data analysis", "Bot development"],
                "githubLink": "https://github.com/namebogsecret/Automatizator",
                "images": [
                  "./images/projects/otklik_1.jpeg",
                  "./images/projects/otklik_2.jpeg"
                ]
              },
              {
                "id": "notificator",
                "title": "Notificator: Multi-Service Notification System",
                "icon": "fa-github",
                "description": "Centralized notification handler for various server services with custom alerts and multi-channel notifications.\n\nCentralized notification system for server services with custom alerts and multi-channel notifications.\n\n+100% uptime\n+100% faster response",
                "categories": ["automation-bots"],
                "technologies": ["Python", "Multiple APIs"],
                "skills": ["System integration", "API development", "Notification optimization"],
                "githubLink": "https://github.com/namebogsecret/notificator",
                "images": [
                  "./images/projects/uvedomlenia_1.jpeg"
                ]
              },
              {
                "id": "sqlite_to_postgress",
                "title": "SQLite to PostgreSQL Migration Tool",
                "icon": "fa-github",
                "description": "Efficient database migration utility for schema transfer, data integrity checks, and performance optimization.\n\nEasy and fast migration from SQLite to PostgreSQL.\n\n+100% performance",
                "categories": ["utilities"],
                "technologies": ["Python", "SQLite", "PostgreSQL"],
                "skills": ["Database management", "Data migration", "SQL optimization"],
                "githubLink": "https://github.com/namebogsecret/sqlite_to_postgress",
                "images": []
              },
              {
                "id": "assistent",
                "title": "Jarvis: Advanced Voice Assistant",
                "icon": "fa-github",
                "description": "Custom voice assistant leveraging OpenAI technology for voice recognition, natural language understanding, and task automation.\n\nAI voice assistant with OpenAI integration. (Developed before OpenAI released there own voice assistant)\n\n+100% productivity",
                "categories": ["ai-nlp", "automation-bots"],
                "technologies": ["Python", "OpenAI API", "Speech Recognition"],
                "skills": ["AI implementation", "Speech processing", "System integration"],
                "githubLink": "https://github.com/namebogsecret/assistent",
                "images": [],
                "featured": true
              },
              {
                "id": "gpt_telegram_bot",
                "title": "GPT-4 Powered Telegram Bot",
                "icon": "fa-github",
                "description": "Full-featured AI assistant using OpenAI's GPT-4 API for text generation, image creation/editing, and Q&A.\n\nAI assistant with OpenAI's GPT-4, Dall-e, Whispers and image recognition models integration.\n\n+100% productivity.\nWorks even when ChatGPT is down.",
                "categories": ["ai-nlp", "automation-bots"],
                "technologies": ["Python", "Telegram API", "OpenAI API", "Docker"],
                "skills": ["AI integration", "API development", "NLP"],
                "githubLink": "https://github.com/namebogsecret/gpt_telegram_bot",
                "images": [
                  "./images/projects/gpt_1.jpeg",
                  "./images/projects/gpt_2.jpeg"
                ],
                "featured": true
              },
    ];
    return state.projects;
  }
  /**
   * Создает HTML-элемент карточки проекта
   * @param {Object} project Данные о проекте
   * @returns {HTMLElement} Элемент карточки проекта
   */
  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);
    card.setAttribute('data-categories', project.categories.join(' '));
    
    // Определение, есть ли изображение для превью
    const hasImage = project.images && project.images.length > 0;
    
    card.innerHTML = `
      <div class="card-thumb">
        ${hasImage ? 
          `<img src="${project.images[0]}" alt="${project.title}">` : 
          `<div class="placeholder-image">
            <i class="${project.icon.startsWith('fa-') ? 'fab' : 'fas'} ${project.icon}"></i>
          </div>`
        }
      </div>
      <div class="card-content">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-description">${project.description.split('\n')[0]}</p>
        <div class="card-tags">
          ${project.technologies.slice(0, 3).map(tech => `<span class="card-tag">${tech}</span>`).join('')}
        </div>
      </div>
    `;
    
    // Добавляем обработчик события для открытия модального окна
    card.addEventListener('click', () => openProjectModal(project));
    
    return card;
  }
  
  /**
   * Отображает проекты на странице
   * @param {Array} projects Массив проектов для отображения
   */
  function renderProjects(projects) {
    const featuredProjectsGrid = document.getElementById('featured-projects-grid');
    const allProjectsGrid = document.getElementById('projects-grid');
    
    // Очищаем текущие проекты
    featuredProjectsGrid.innerHTML = '';
    allProjectsGrid.innerHTML = '';
    
    // Сначала отображаем избранные проекты
    const featuredProjects = projects.filter(project => project.featured);
    featuredProjects.forEach(project => {
      featuredProjectsGrid.appendChild(createProjectCard(project));
    });
    
    // Затем все остальные проекты
    projects.forEach(project => {
      if (!project.featured) {
        allProjectsGrid.appendChild(createProjectCard(project));
      }
    });
    
    // Скрываем секцию избранных проектов, если их нет
    const featuredSection = document.querySelector('.featured-projects');
    featuredSection.style.display = featuredProjects.length > 0 ? 'block' : 'none';
  }
  
  /**
   * Применяет фильтр к проектам
   * @param {string} filter Категория фильтра
   */
  function filterProjects(filter) {
    state.currentFilter = filter;
    
    // Если фильтр "все", показываем все проекты
    if (filter === 'all') {
      renderProjects(state.projects);
      return;
    }
    
    // Фильтруем проекты по выбранной категории
    const filteredProjects = state.projects.filter(project => 
      project.categories.includes(filter)
    );
    
    renderProjects(filteredProjects);
  }
  
  /**
   * Инициализирует приложение
   */
  async function initApp() {
    // Загружаем проекты
    const projects = await loadProjects();
    if (projects.length === 0) return;
    
    // Отображаем проекты
    renderProjects(projects);
    
    // Настраиваем фильтры
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс к нажатой кнопке
        button.classList.add('active');
        
        // Фильтруем проекты
        const filter = button.getAttribute('data-filter');
        filterProjects(filter);
      });
    });
  }
  
  // Экспортируем функции для использования в других модулях
  window.projectLoader = {
    loadProjects,
    renderProjects,
    filterProjects,
    initApp
  };