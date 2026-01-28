// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Фильтрация материалов по предметам
const filterButtons = document.querySelectorAll('.filter-btn');
const subjectCards = document.querySelectorAll('.subject-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс нажатой кнопке
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Показываем/скрываем карточки в зависимости от фильтра
        subjectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-subject') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Калькулятор баллов
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreInputs = document.querySelectorAll('.score-input');
const totalScoreElement = document.getElementById('totalScore');
const resultMessageElement = document.getElementById('resultMessage');

// Функция расчета суммы баллов
function calculateTotalScore() {
    let total = 0;
    let filledSubjects = 0;
    
    scoreInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        total += value;
        if (value > 0) filledSubjects++;
    });
    
    totalScoreElement.textContent = total;
    
    // Обновляем сообщение с результатом
    updateResultMessage(total, filledSubjects);
}

// Функция обновления сообщения с результатом
function updateResultMessage(total, filledSubjects) {
    if (filledSubjects === 0) {
        resultMessageElement.textContent = "Введите баллы по предметам и нажмите 'Рассчитать'";
        return;
    }
    
    let message = "";
    
    if (total >= 250) {
        message = "Отличный результат! У вас высокие шансы поступить в ведущие вузы.";
    } else if (total >= 200) {
        message = "Хороший результат! Вы сможете претендовать на бюджетные места во многих вузах.";
    } else if (total >= 150) {
        message = "Средний результат. Рассмотрите возможность подачи документов в региональные вузы.";
    } else {
        message = "Рекомендуем уделить больше времени подготовке к экзаменам.";
    }
    
    resultMessageElement.textContent = message;
}

// Функция сброса калькулятора
function resetCalculator() {
    scoreInputs.forEach(input => {
        input.value = 0;
    });
    
    totalScoreElement.textContent = "0";
    resultMessageElement.textContent = "Введите баллы по предметам и нажмите 'Рассчитать'";
}

// События для калькулятора
calculateBtn.addEventListener('click', calculateTotalScore);

resetBtn.addEventListener('click', resetCalculator);

// Автоматический пересчет при изменении значений
scoreInputs.forEach(input => {
    input.addEventListener('input', () => {
        // Ограничиваем значение максимальным баллом
        const max = parseInt(input.max) || 100;
        const value = parseInt(input.value) || 0;
        
        if (value > max) {
            input.value = max;
        } else if (value < 0) {
            input.value = 0;
        }
        
        calculateTotalScore();
    });
});

// Плавная прокрутка к разделам при клике на ссылки в меню
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Инициализация калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    calculateTotalScore();
});