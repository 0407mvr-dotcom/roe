// ============================================================
// ПРЕЛОАДЕР
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    
    if (!preloader) return;
    
    let progress = 0;
    let progressInterval;
    
    // Функция обновления прогресса
    function updateProgress() {
        if (progress < 100) {
            progress += Math.random() * 8 + 2;
            if (progress > 100) progress = 100;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        } else {
            clearInterval(progressInterval);
        }
    }
    
    // Запускаем прогресс
    progressInterval = setInterval(updateProgress, 200);
    
    // Ждем полной загрузки страницы
    window.addEventListener('load', function() {
        // Доводим прогресс до 100%
        progress = 100;
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Небольшая задержка перед скрытием
        setTimeout(function() {
            preloader.classList.add('hide');
            clearInterval(progressInterval);
            
            // Разблокируем скролл
            document.body.style.overflow = '';
            
            // Запускаем анимации появления контента
            document.querySelectorAll('.hero-content, .slider-wrapper').forEach(el => {
                if (el) {
                    el.style.animation = 'none';
                    void el.offsetHeight; // Триггер перерисовки
                    el.style.animation = '';
                }
            });
        }, 600);
    });
    
    // Аварийное закрытие через 10 секунд (на случай ошибок загрузки)
    setTimeout(function() {
        if (!preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
            clearInterval(progressInterval);
            document.body.style.overflow = '';
        }
    }, 10000);
});


// ============================================================
// 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (СВЕТЛАЯ / ТЁМНАЯ)
// ============================================================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
}

// ============================================================
// 2. БУРГЕР-МЕНЮ (МОБИЛЬНАЯ ВЕРСИЯ)
// ============================================================
const burgerMenu = document.getElementById('burgerMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function toggleMobileMenu(open) {
    if (open === undefined) {
        burgerMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    } else if (open) {
        burgerMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
    } else {
        burgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
    }
    document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
}

if (burgerMenu && mobileMenuOverlay) {
    burgerMenu.addEventListener('click', () => toggleMobileMenu());

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
    }

    mobileMenuOverlay.addEventListener('click', function (e) {
        if (e.target === this) {
            toggleMobileMenu(false);
        }
    });

    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMobileMenu(false));
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            toggleMobileMenu(false);
        }
    });
}

// ============================================================
// 3. ПОИСКОВАЯ СТРОКА
// ============================================================
const headerSearch = document.getElementById('headerSearch');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchForm = document.getElementById('searchForm');

function toggleSearch(open) {
    if (open === undefined) {
        searchOverlay.classList.toggle('active');
    } else if (open) {
        searchOverlay.classList.add('active');
    } else {
        searchOverlay.classList.remove('active');
    }
    if (searchOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const input = document.querySelector('.search-input');
            if (input) input.focus();
        }, 300);
    } else {
        document.body.style.overflow = '';
    }
}

if (headerSearch && searchOverlay) {
    headerSearch.addEventListener('click', () => toggleSearch(true));

    if (searchClose) {
        searchClose.addEventListener('click', () => toggleSearch(false));
    }

    searchOverlay.addEventListener('click', function (e) {
        if (e.target === this) {
            toggleSearch(false);
        }
    });

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('.search-input');
            const query = input ? input.value : '';
            if (query && query.trim()) {
                alert('Поиск: ' + query.trim());
                toggleSearch(false);
                this.reset();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            toggleSearch(false);
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch(true);
        }
    });
}

// ============================================================
// 4. СКРОЛЛ ХЕДЕРА (ПОЛНОСТЬЮ ПРОЗРАЧНЫЙ)
// ============================================================
const siteHeader = document.getElementById('siteHeader');
let ticking = false;

if (siteHeader) {
    // Устанавливаем прозрачный фон сразу
    siteHeader.style.background = 'transparent';
    siteHeader.style.backdropFilter = 'none';
    
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                
                // Просто добавляем/убираем класс для других стилей
                if (currentScroll > 50) {
                    siteHeader.classList.add('scrolled');
                } else {
                    siteHeader.classList.remove('scrolled');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================================
// 5. АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ
// ============================================================
document.querySelectorAll('.header-nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.header-nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================================
// 6. СЛАЙДЕР (АВТОПРОКРУТКА + КЛИК ПО ТОЧКАМ)
// ============================================================
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    if (!slides.length || !dots.length) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    if (!slides.length) return;
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

if (dots.length && slides.length) {
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const index = parseInt(this.dataset.slide, 10);
            if (!isNaN(index) && index >= 0 && index < slides.length) {
                goToSlide(index);
                resetInterval();
            }
        });
    });

    function startInterval() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();

    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startInterval);
        
        // Для touch-устройств
        slider.addEventListener('touchstart', () => clearInterval(slideInterval));
        slider.addEventListener('touchend', startInterval);
    }
}

// ============================================================
// 7. МОДАЛЬНОЕ ОКНО
// ============================================================
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalForm = document.getElementById('modalForm');

if (modalOverlay && modalClose) {
    // Открытие модалки по всем кнопкам с классом modal-trigger
    document.querySelectorAll('.modal-trigger').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    if (modalForm) {
        modalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Собираем данные
            const formData = new FormData(this);
            const name = formData.get('modalName') || '';
            const email = formData.get('modalEmail') || '';
            const phone = formData.get('modalPhone') || '';
            const message = formData.get('modalMessage') || '';

            // Простая валидация
            if (!name.trim()) {
                alert('Пожалуйста, заполните поле "Ваше имя"');
                return;
            }
            if (!email.trim()) {
                alert('Пожалуйста, заполните поле "Email"');
                return;
            }
            // Простая проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                alert('Пожалуйста, введите корректный email');
                return;
            }

            alert('Спасибо, ' + name + '! Мы свяжемся с вами в ближайшее время.');
            
            // Здесь можно добавить отправку данных на сервер
            // console.log('Данные формы:', { name, email, phone, message });

            modalForm.reset();
            closeModal();
        });
    }
}

// ============================================================
// 8. ФОРМА НА СТРАНИЦЕ КОНТАКТОВ
// ============================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {
            name: formData.get('name') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || '',
            message: formData.get('message') || '',
        };

        if (!data.name.trim()) {
            alert('Пожалуйста, заполните поле "Ваше имя"');
            return;
        }

        if (!data.email.trim()) {
            alert('Пожалуйста, заполните поле "Email"');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email.trim())) {
            alert('Пожалуйста, введите корректный email');
            return;
        }

        alert('Спасибо, ' + data.name + '! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// ============================================================
// 9. ПАРАЛЛАКС ДЛЯ 3D ФОНА (ОПЦИОНАЛЬНО)
// ============================================================
let isParallaxEnabled = true;
let parallaxTimeout;

// Проверяем, что устройство не мобильное и не touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
    isParallaxEnabled = false;
}

if (isParallaxEnabled) {
    const splineBg = document.querySelector('.spline-bg');
    if (splineBg) {
        document.addEventListener('mousemove', function (e) {
            if (parallaxTimeout) {
                cancelAnimationFrame(parallaxTimeout);
            }
            
            parallaxTimeout = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 8;
                const y = (e.clientY / window.innerHeight - 0.5) * 8;
                splineBg.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
            });
        });

        // Возврат в исходное положение при уходе мыши
        document.addEventListener('mouseleave', function () {
            if (parallaxTimeout) {
                cancelAnimationFrame(parallaxTimeout);
            }
            splineBg.style.transform = 'translate(0, 0) scale(1)';
            splineBg.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            setTimeout(() => {
                splineBg.style.transition = '';
            }, 800);
        });
    }
}

// ============================================================
// 10. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК
// ============================================================
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================================
// 11. КАРУСЕЛЬ ПРОЕКТОВ (горизонтальный скролл с кнопками)
// ============================================================
const track = document.querySelector('.projects-track');
const leftBtn = document.getElementById('scrollLeft');
const rightBtn = document.getElementById('scrollRight');

if (track && leftBtn && rightBtn) {
    function scrollProjects(direction) {
        const scrollAmount = 340;
        track.scrollBy({ 
            left: direction * scrollAmount, 
            behavior: 'smooth' 
        });
    }

    leftBtn.addEventListener('click', () => scrollProjects(-1));
    rightBtn.addEventListener('click', () => scrollProjects(1));

    function checkScrollButtons() {
        if (track.scrollWidth <= track.clientWidth) {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';
        } else {
            leftBtn.style.display = 'flex';
            rightBtn.style.display = 'flex';
            
            // Показываем/скрываем кнопки в зависимости от положения скролла
            const scrollLeft = track.scrollLeft;
            const maxScroll = track.scrollWidth - track.clientWidth;
            
            leftBtn.style.opacity = scrollLeft <= 10 ? '0.3' : '1';
            leftBtn.style.pointerEvents = scrollLeft <= 10 ? 'none' : 'auto';
            
            rightBtn.style.opacity = scrollLeft >= maxScroll - 10 ? '0.3' : '1';
            rightBtn.style.pointerEvents = scrollLeft >= maxScroll - 10 ? 'none' : 'auto';
        }
    }

    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    
    track.addEventListener('scroll', checkScrollButtons);
}

// ============================================================
// 12. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
// ============================================================
const animateOnScroll = (function() {
    const elements = document.querySelectorAll('.stat-card, .service-item, .why-card, .process-step, .project-card-new');
    
    if (!elements.length) return;

    let observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s`;
        observer.observe(el);
    });
})();

// ============================================================
// 13. ОБРАБОТКА ТЕЛЕФОННОГО ПОЛЯ (МАСКА)
// ============================================================
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length === 0) {
            this.value = '+7';
            return;
        }
        
        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (';
            formatted += value.substring(1, 4);
        }
        if (value.length >= 5) {
            formatted += ') ';
            formatted += value.substring(4, 7);
        }
        if (value.length >= 8) {
            formatted += '-';
            formatted += value.substring(7, 9);
        }
        if (value.length >= 10) {
            formatted += '-';
            formatted += value.substring(9, 11);
        }
        
        this.value = formatted;
        
        // Устанавливаем позицию курсора в конец
        const pos = this.value.length;
        this.setSelectionRange(pos, pos);
    });

    // Очистка при фокусе, если пусто
    input.addEventListener('focus', function () {
        if (this.value === '') {
            this.value = '+7';
        }
    });
});

// ============================================================
// 14. КОНТРОЛЬ ВЕРСИИ (ДЛЯ ОТЛАДКИ)
// ============================================================
console.log('🚀 ROE Digital Agency — сайт загружен');
console.log('📱 Версия: 2.0');
console.log('📅 Дата: ' + new Date().toLocaleDateString('ru-RU'));

// ============================================================
// 15. ПРЕДОТВРАЩЕНИЕ ДВОЙНОГО КЛИКА НА КНОПКАХ
// ============================================================
document.querySelectorAll('button, .btn-menu, .hero-btn-primary, .contact-submit, .modal-submit, .mobile-menu-btn, .nav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.dataset.clicked) {
            e.preventDefault();
            return;
        }
        this.dataset.clicked = 'true';
        setTimeout(() => {
            delete this.dataset.clicked;
        }, 1000);
    });
});

// ============================================================
// 16. ПРОВЕРКА ПОДДЕРЖКИ WEBP
// ============================================================
function checkWebPSupport() {
    const img = new Image();
    img.onload = function() {
        document.documentElement.classList.add('webp');
    };
    img.onerror = function() {
        document.documentElement.classList.add('no-webp');
    };
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
}
checkWebPSupport();

// ============================================================
// 17. ОБРАБОТКА КЛАВИШИ ESC ДЛЯ ВСЕХ ОВЕРЛЕЕВ
// ============================================================
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        // Закрываем модалку
        if (modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
        // Закрываем поиск
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            toggleSearch(false);
        }
        // Закрываем мобильное меню
        if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            toggleMobileMenu(false);
        }
    }
});

// ============================================================
// 18. ЗАПУСК ПОСЛЕ ПОЛНОЙ ЗАГРУЗКИ СТРАНИЦЫ
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли сохраненная тема
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Активируем первую ссылку в навигации, если нет активной
    const activeLink = document.querySelector('.header-nav-link.active');
    if (!activeLink) {
        const firstLink = document.querySelector('.header-nav-link');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }

    console.log('✅ DOM полностью загружен');
});

// ============================================================
// 19. ОБРАБОТКА ОШИБОК ЗАГРУЗКИ ИЗОБРАЖЕНИЙ
// ============================================================
document.addEventListener('error', function(e) {
    const target = e.target;
    if (target.tagName === 'IMG') {
        target.style.opacity = '0.3';
        target.alt = 'Изображение не загрузилось';
    }
}, true);

// ============================================================
// 20. ПРОФИЛИРОВАНИЕ ПРОИЗВОДИТЕЛЬНОСТИ (ДЛЯ РАЗРАБОТКИ)
// ============================================================
if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`⏱ Время загрузки страницы: ${loadTime}ms`);
}