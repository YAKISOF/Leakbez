const wheel = document.querySelector('.wheel');
const segments = document.querySelectorAll('.segment');
const spinButton = document.getElementById('spin-button');
const backButton = document.getElementById('back-button');
const enlargedContainer = document.querySelector('.enlarged-container');
const enlargedImg = document.querySelector('.enlarged-img');
const background = document.querySelector('.background');

let isSpinning = false;
let totalRotation = 0;
const segmentCount = segments.length;
const segmentAngle = 360 / segmentCount;

function startButtonAnimation() {
    spinButton.classList.add('hidden');
}

function showBackButton() {
    backButton.classList.add('visible');
    backButton.style.display = 'block';
}

function resetState() {
    backButton.classList.remove('visible');
    backButton.style.display = 'none';
    spinButton.classList.remove('hidden');
    enlargedContainer.classList.remove('active');
    enlargedContainer.style.display = 'none';
    background.classList.remove('win-effect');
    document.querySelector('.segments').classList.remove('hidden');
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    totalRotation = 0;

    // Отключаем кнопку "Прокрутить" на 5 секунд
    spinButton.disabled = true;
    setTimeout(() => {
        spinButton.disabled = false; // Разблокируем кнопку через 5 секунд
    }, 3000);
}

spinButton.addEventListener('click', () => {
    if (isSpinning || spinButton.disabled) return; // Проверяем, не отключена ли кнопка
    isSpinning = true;

    const randomRotation = Math.floor(Math.random() * 360) + 360 * 5;
    totalRotation += randomRotation;

    wheel.style.transition = 'transform 5s ease-in-out';
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    startButtonAnimation();

    setTimeout(() => {
        isSpinning = false;
        const finalDegree = totalRotation % 360;
        const selectedSegment = getSelectedSegment(finalDegree);
        if (selectedSegment) {
            highlightWinner(selectedSegment);
            showBackButton();
        }
    }, 5000);
});

backButton.addEventListener('click', () => {
    resetState();
});

function getSelectedSegment(degree) {
    const finalDegree = degree % 360;
    const segmentAngle = 360 / segmentCount;
    const adjustedDegree = (360 - finalDegree) % 360;
    let selectedIndex = Math.floor(adjustedDegree / segmentAngle);
    selectedIndex = (selectedIndex + segmentCount) % segmentCount;
    return segments[selectedIndex];
}

function highlightWinner(segment) {
    document.querySelector('.segments').classList.add('hidden');
    const img = segment.querySelector('.segment-img');
    if (img) {
        enlargedImg.src = img.src;
        enlargedContainer.style.display = 'block';

        setTimeout(() => {
            enlargedContainer.classList.add('active');
            setTimeout(() => {
                background.classList.add('win-effect');
            }, 300); // Задержка 0.3 секунды после начала увеличения изображения
        }, 3);
    }
}
// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Разворачиваем приложение на полный экран
tg.expand();

// Убедимся, что приложение готово
tg.ready();