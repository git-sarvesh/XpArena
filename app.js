function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Language selection
function setLanguage() {
    let lang = document.getElementById('language_select').value;
    document.getElementById('current_lang').innerText = lang;
    showPage('home');
}

// Pomodoro Timer logic
let pomoInterval = null, pomoTime = 1500, pomoActive = false;
document.getElementById('pomo_select').addEventListener('change', function(){
    if(this.value === 'custom') {
        document.getElementById('custom_minutes').style.display = '';
        pomoTime = parseInt(document.getElementById('custom_minutes').value) * 60;
    } else {
        document.getElementById('custom_minutes').style.display = 'none';
        pomoTime = parseInt(this.value);
    }
    document.getElementById('pomo_time').innerText = minsec(pomoTime);
});
document.getElementById('custom_minutes').addEventListener('input', function() {
    pomoTime = parseInt(this.value) * 60;
    document.getElementById('pomo_time').innerText = minsec(pomoTime);
});
function minsec(t) {
    let mins = Math.floor(t/60), secs = t%60;
    return `${('0'+mins).slice(-2)}:${('0'+secs).slice(-2)}`;
}
function startPomodoro() {
    if(pomoInterval) clearInterval(pomoInterval);
    pomoActive = true;
    document.getElementById('pomo_status').innerText = "🚀 Stay focused!";
    pomoInterval = setInterval(function(){
        if(pomoTime <= 0) {
            clearInterval(pomoInterval);
            pomoActive = false;
            document.getElementById('pomo_status').innerText = "🎉 Pomodoro complete! Take a short break.";
            document.getElementById('pomo_time').innerText = minsec(0);
        } else {
            pomoTime--;
            document.getElementById('pomo_time').innerText = minsec(pomoTime);
        }
    }, 1000);
}
function pausePomodoro() {
    if(pomoInterval) clearInterval(pomoInterval);
    pomoActive = false;
    document.getElementById('pomo_status').innerText = "⏸️ Paused. Ready to restart?";
}
function resetPomodoro() {
    if(pomoInterval) clearInterval(pomoInterval);
    let select = document.getElementById('pomo_select');
    pomoTime = select.value === 'custom'
        ? parseInt(document.getElementById('custom_minutes').value) * 60
        : parseInt(select.value);
    document.getElementById('pomo_time').innerText = minsec(pomoTime);
    document.getElementById('pomo_status').innerText = "Set your focus time then click Start to begin your Pomodoro session! 🎯";
    pomoActive = false;
}

// Games menu logic
function startGame() {
    const chosen = document.getElementById('game_select').value;
    showPage(chosen);
}

// MCQ Quiz generator (front-end only)
function generateQuiz() {
    const num = document.getElementById('num_questions').value;
    const subject = document.getElementById('subject_select').value;
    const curriculum = document.querySelector('input[name="curriculum"]:checked').value;
    const language = document.getElementById('quiz_lang').value;

    let quizArea = document.getElementById('quiz_content');
    quizArea.innerHTML = "<b>Questions Being Generated....</b>";
    setTimeout(function() {
        let qHtml = "";
        for(let i=1; i<=num; i++) {
            qHtml += `
            <div class="mcq">
                <b>Q${i}: (${curriculum}, ${language}, ${subject}) Sample question ${i}?</b>
                <div><input type="radio" name="q${i}"> Option A</div>
                <div><input type="radio" name="q${i}"> Option B</div>
                <div><input type="radio" name="q${i}"> Option C</div>
                <div><input type="radio" name="q${i}"> Option D</div>
            </div>
            `;
        }
        quizArea.innerHTML = qHtml + '<button onclick="alert(\'Submit logic not implemented\')">Submit Answers</button>';
    }, 1200);
}

// Initial page
showPage('home');
