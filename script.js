// Game state variables
let currentQuestion = {};
let score = 0;
let questionCount = 0;
let correctCount = 0;
let achievements = [];
let selectedAnswer = null;

// DOM elements
const difficultySelect = document.getElementById('difficulty');
const currentOperationSpan = document.getElementById('current-operation');
const questionDiv = document.getElementById('question');
const multipleChoiceDiv = document.getElementById('multiple-choice');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resultDiv = document.getElementById('result');
const newQuestionBtn = document.getElementById('new-question-btn');
const resetBtn = document.getElementById('reset-btn');
const scoreSpan = document.getElementById('score');
const questionCountSpan = document.getElementById('question-count');
const correctCountSpan = document.getElementById('correct-count');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const achievementsList = document.getElementById('achievements');

// Achievement definitions
const achievementDefinitions = [
    { id: 'first_correct', name: '🎯 Câu đầu tiên', description: 'Trả lời đúng câu hỏi đầu tiên', condition: () => correctCount === 1 },
    { id: 'streak_5', name: '🔥 Chuỗi 5', description: 'Trả lời đúng 5 câu liên tiếp', condition: () => correctCount >= 5 },
    { id: 'streak_10', name: '⭐ Chuỗi 10', description: 'Trả lời đúng 10 câu liên tiếp', condition: () => correctCount >= 10 },
    { id: 'math_master', name: '👑 Bậc thầy toán học', description: 'Trả lời đúng 20 câu', condition: () => correctCount >= 20 },
    { id: 'speed_demon', name: '⚡ Tốc độ ánh sáng', description: 'Trả lời đúng trong 3 giây', condition: () => false }, // Will be checked separately
    { id: 'perfect_score', name: '💯 Hoàn hảo', description: 'Đạt 100% chính xác trong 10 câu', condition: () => questionCount >= 10 && (correctCount / questionCount) === 1 }
];

// Initialize game
function initGame() {
    updateDisplay();
    loadAchievements();
    
    // Event listeners
    newQuestionBtn.addEventListener('click', generateNewQuestion);
    resetBtn.addEventListener('click', resetGame);
    
    // Add click listeners to choice buttons
    choiceBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => selectAnswer(index));
    });
}

// Generate multiple choice options
function generateChoices(correctAnswer) {
    const choices = [correctAnswer];
    const range = Math.max(10, Math.floor(correctAnswer * 0.5)); // Tạo phạm vi cho đáp án sai
    
    // Tạo 3 đáp án sai
    while (choices.length < 4) {
        let wrongAnswer;
        
        // Tạo đáp án sai với các chiến lược khác nhau
        const strategy = Math.floor(Math.random() * 4);
        switch (strategy) {
            case 0: // Cộng/trừ một số nhỏ
                wrongAnswer = correctAnswer + (Math.floor(Math.random() * 20) - 10);
                break;
            case 1: // Nhân/chia với số nhỏ
                wrongAnswer = Math.floor(correctAnswer * (0.5 + Math.random()));
                break;
            case 2: // Sai lệch theo phần trăm
                wrongAnswer = Math.floor(correctAnswer * (0.7 + Math.random() * 0.6));
                break;
            case 3: // Sai lệch ngẫu nhiên trong phạm vi
                wrongAnswer = correctAnswer + (Math.floor(Math.random() * range * 2) - range);
                break;
        }
        
        // Đảm bảo đáp án sai là số dương và khác với các đáp án đã có
        if (wrongAnswer > 0 && !choices.includes(wrongAnswer)) {
            choices.push(wrongAnswer);
        }
    }
    
    // Trộn thứ tự các đáp án
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    return choices;
}
// Generate random number based on difficulty
function getRandomNumber(operation) {
    const difficulty = difficultySelect.value;
    let max, min = 1;
    
    switch (difficulty) {
        case 'easy':
            max = 100;
            break;
        case 'medium':
            max = 1000;
            break;
        case 'hard':
            max = 10000;
            break;
    }
    
    // Special handling for division to ensure clean results
    if (operation === 'divide') {
        max = Math.min(max, 1000); // Keep division numbers smaller
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate new question
function generateNewQuestion() {
    const operations = ['add', 'subtract', 'multiply', 'divide'];
    const operationNames = {
        'add': 'Phép cộng (+)',
        'subtract': 'Phép trừ (-)',
        'multiply': 'Phép nhân (×)',
        'divide': 'Phép chia (÷)'
    };
    
    // Always random operation
    const selectedOperation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer, questionText, symbol;
    
    switch (selectedOperation) {
        case 'add':
            num1 = getRandomNumber('add');
            num2 = getRandomNumber('add');
            answer = num1 + num2;
            symbol = '+';
            break;
            
        case 'subtract':
            num1 = getRandomNumber('subtract');
            num2 = getRandomNumber('subtract');
            // Ensure positive result
            if (num2 > num1) {
                [num1, num2] = [num2, num1];
            }
            answer = num1 - num2;
            symbol = '-';
            break;
            
        case 'multiply':
            num1 = getRandomNumber('multiply');
            num2 = Math.floor(Math.random() * 12) + 1; // Keep multiplier small
            answer = num1 * num2;
            symbol = '×';
            break;
            
        case 'divide':
            // Generate division that results in whole numbers
            num2 = Math.floor(Math.random() * 12) + 1;
            answer = getRandomNumber('divide');
            num1 = answer * num2;
            symbol = '÷';
            break;
    }
    
    questionText = `${num1.toLocaleString()} ${symbol} ${num2.toLocaleString()} = ?`;
    
    // Generate multiple choice options
    const choices = generateChoices(answer);
    
    currentQuestion = {
        text: questionText,
        answer: answer,
        choices: choices,
        correctIndex: choices.indexOf(answer),
        operation: selectedOperation,
        startTime: Date.now()
    };
    
    // Update UI
    questionDiv.textContent = questionText;
    currentOperationSpan.textContent = operationNames[selectedOperation];
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    selectedAnswer = null;
    
    // Update choice buttons
    choiceBtns.forEach((btn, index) => {
        btn.textContent = `${String.fromCharCode(65 + index)}. ${choices[index].toLocaleString()}`;
        btn.dataset.value = choices[index];
        btn.disabled = false;
        btn.className = 'choice-btn'; // Reset classes
    });
}

// Select answer
function selectAnswer(index) {
    if (choiceBtns[index].disabled) return;
    
    // Remove previous selection
    choiceBtns.forEach(btn => btn.classList.remove('selected'));
    
    // Mark current selection
    choiceBtns[index].classList.add('selected');
    selectedAnswer = parseInt(choiceBtns[index].dataset.value);
    
    // Auto-check answer after selection
    setTimeout(() => {
        checkAnswer();
    }, 500);
}

// Check answer
function checkAnswer() {
    if (selectedAnswer === null) return;
    
    const correctAnswer = currentQuestion.answer;
    const timeTaken = (Date.now() - currentQuestion.startTime) / 1000;
    
    questionCount++;
    
    // Disable all buttons
    choiceBtns.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === correctAnswer) {
        correctCount++;
        score += calculateScore(timeTaken);
        
        resultDiv.textContent = `🎉 Chính xác! Đáp án là ${correctAnswer.toLocaleString()}`;
        resultDiv.className = 'result correct';
        questionDiv.classList.add('correct-animation');
        
        // Highlight correct answer
        choiceBtns.forEach((btn, index) => {
            if (parseInt(btn.dataset.value) === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        // Check for speed achievement
        if (timeTaken <= 3) {
            unlockAchievement('speed_demon');
        }
        
    } else {
        resultDiv.textContent = `❌ Sai rồi! Đáp án đúng là ${correctAnswer.toLocaleString()}`;
        resultDiv.className = 'result incorrect';
        questionDiv.classList.add('incorrect-animation');
        
        // Highlight correct and incorrect answers
        choiceBtns.forEach((btn, index) => {
            const btnValue = parseInt(btn.dataset.value);
            if (btnValue === correctAnswer) {
                btn.classList.add('correct');
            } else if (btnValue === selectedAnswer) {
                btn.classList.add('incorrect');
            }
        });
    }
    
    // Remove animation classes after animation completes
    setTimeout(() => {
        questionDiv.classList.remove('correct-animation', 'incorrect-animation');
    }, 600);
    
    // Update display and check achievements
    updateDisplay();
    checkAchievements();
    
    // Auto-generate new question after 3 seconds
    setTimeout(() => {
        if (choiceBtns[0].disabled) { // Only if user hasn't manually generated new question
            generateNewQuestion();
        }
    }, 3000);
}

// Calculate score based on time taken
function calculateScore(timeTaken) {
    const baseScore = 10;
    const timeBonus = Math.max(0, 10 - Math.floor(timeTaken));
    return baseScore + timeBonus;
}

// Update display
function updateDisplay() {
    scoreSpan.textContent = score;
    questionCountSpan.textContent = questionCount;
    correctCountSpan.textContent = correctCount;
    
    // Update progress bar
    const accuracy = questionCount > 0 ? (correctCount / questionCount) * 100 : 0;
    progressFill.style.width = `${accuracy}%`;
    progressText.textContent = `${Math.round(accuracy)}%`;
}

// Check and unlock achievements
function checkAchievements() {
    achievementDefinitions.forEach(achievement => {
        if (!achievements.includes(achievement.id) && achievement.condition()) {
            unlockAchievement(achievement.id);
        }
    });
}

// Unlock achievement
function unlockAchievement(achievementId) {
    if (achievements.includes(achievementId)) return;
    
    achievements.push(achievementId);
    const achievement = achievementDefinitions.find(a => a.id === achievementId);
    
    if (achievement) {
        // Add achievement to display
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        achievementElement.textContent = achievement.name;
        achievementElement.title = achievement.description;
        achievementsList.appendChild(achievementElement);
        
        // Show notification
        showNotification(`🏆 Thành tích mới: ${achievement.name}!`);
        
        // Save to localStorage
        saveAchievements();
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.5s ease;
    `;
    notification.textContent = message;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Save achievements to localStorage
function saveAchievements() {
    localStorage.setItem('mathGameAchievements', JSON.stringify(achievements));
    localStorage.setItem('mathGameStats', JSON.stringify({
        score: score,
        questionCount: questionCount,
        correctCount: correctCount
    }));
}

// Load achievements from localStorage
function loadAchievements() {
    const savedAchievements = localStorage.getItem('mathGameAchievements');
    const savedStats = localStorage.getItem('mathGameStats');
    
    if (savedAchievements) {
        achievements = JSON.parse(savedAchievements);
        
        // Display saved achievements
        achievements.forEach(achievementId => {
            const achievement = achievementDefinitions.find(a => a.id === achievementId);
            if (achievement) {
                const achievementElement = document.createElement('div');
                achievementElement.className = 'achievement';
                achievementElement.textContent = achievement.name;
                achievementElement.title = achievement.description;
                achievementsList.appendChild(achievementElement);
            }
        });
    }
    
    if (savedStats) {
        const stats = JSON.parse(savedStats);
        score = stats.score || 0;
        questionCount = stats.questionCount || 0;
        correctCount = stats.correctCount || 0;
        updateDisplay();
    }
}

// Reset game
function resetGame() {
    if (confirm('Bạn có chắc muốn làm lại từ đầu? Tất cả điểm số và thành tích sẽ bị xóa.')) {
        score = 0;
        questionCount = 0;
        correctCount = 0;
        achievements = [];
        currentQuestion = {};
        selectedAnswer = null;
        
        // Clear UI
        questionDiv.textContent = 'Nhấn "Câu hỏi mới" để bắt đầu!';
        resultDiv.textContent = '';
        resultDiv.className = 'result';
        achievementsList.innerHTML = '';
        
        // Reset choice buttons
        choiceBtns.forEach((btn, index) => {
            btn.textContent = `${String.fromCharCode(65 + index)}. `;
            btn.dataset.value = '';
            btn.disabled = true;
            btn.className = 'choice-btn';
        });
        
        // Clear localStorage
        localStorage.removeItem('mathGameAchievements');
        localStorage.removeItem('mathGameStats');
        
        updateDisplay();
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Add some fun sound effects (optional - using Web Audio API)
function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    } else if (type === 'incorrect') {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1); // G3
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'n' || e.key === 'N') {
        if (!newQuestionBtn.disabled) {
            generateNewQuestion();
        }
    } else if (e.key === 'r' || e.key === 'R') {
        if (e.ctrlKey) {
            e.preventDefault();
            resetGame();
        }
    } else if (e.key >= '1' && e.key <= '4') {
        // Allow number keys 1-4 to select answers A-D
        const index = parseInt(e.key) - 1;
        if (!choiceBtns[index].disabled) {
            selectAnswer(index);
        }
    } else if (e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= 'd') {
        // Allow A-D keys to select answers
        const index = e.key.toLowerCase().charCodeAt(0) - 97; // 'a' = 97
        if (!choiceBtns[index].disabled) {
            selectAnswer(index);
        }
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Swipe up to generate new question
    if (diff > 50 && !answerInput.disabled) {
        generateNewQuestion();
    }
});
