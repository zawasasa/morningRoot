document.addEventListener('DOMContentLoaded', () => {
    const tasks = [
        { name: 'かおを あらう', image: './images/face_wash.svg', completed: false },
        { name: 'えんじふくを きる', image: './images/clothes.svg', completed: false },
        { name: 'ごはんを たべる', image: './images/eat.svg', completed: false },
        { name: 'はを みがく', image: './images/toothbrush.svg', completed: false },
        { name: 'かみのけを ゴムで しばる', image: './images/hair_tie.svg', completed: false },
        { name: 'おんどを はかる', image: './images/thermometer.svg', completed: false },
        { name: 'おんどを きろくする', image: './images/record.svg', completed: false },
        { name: 'ハンカチを もつ', image: './images/handkerchief.svg', completed: false },
        { name: 'おたよりバッグを もつ', image: './images/communication_bag.svg', completed: false },
        { name: 'トイレに いく', image: './images/toilet.svg', completed: false }
    ];

    // 前向きなメッセージ10通り
    const messages = [
        'ぜんぶできたね、すごい！',
        'きょうもげんきでいってらっしゃい！',
        'わあすてき、きょうのほいくえんもたのしみだね！',
        'きょうもがんばったね、えらい！',
        'きみのじゅんび、パーフェクト！',
        'きょうもニコニコでいこう！',
        'じぶんでできて、かっこいい！',
        'きょうもチャレンジだいせいこう！',
        'きみのがんばり、ピカイチだよ！',
        'きょうもいちにち、たのしもう！'
    ];

    // 派手な演出5パターン
    const effects = [
        'rainbow', // レインボーグラデーション＋カラフル紙吹雪
        'star',    // 星がキラキラ舞う
        'heart',   // ハートがふわふわ舞う
        'gold',    // キラキラ光る背景＋金色紙吹雪
        'pop'      // ポップな色のバブル
    ];

    const taskList = document.getElementById('task-list');
    const congratsMessage = document.getElementById('congrats-message');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confettiInstance = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });
    let currentEffect = null;

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const item = document.createElement('li');
            item.className = `task-item ${task.completed ? 'completed' : ''}`;
            item.innerHTML = `
                <img src="${task.image}" alt="${task.name}">
                <span class="task-name">${task.name}</span>
                <div class="checkbox ${task.completed ? 'checked' : ''}" data-index="${index}"></div>
            `;
            taskList.appendChild(item);
        });
        addCheckboxListeners();
        checkAllCompleted();
    }

    function addCheckboxListeners() {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', toggleTask);
        });
    }

    function toggleTask(event) {
        const index = event.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function checkAllCompleted() {
        const allCompleted = tasks.every(task => task.completed);
        if (allCompleted) {
            showRandomCongrats();
        } else {
            congratsMessage.classList.add('hidden');
            removeEffect();
        }
    }

    function showRandomCongrats() {
        // ランダムなメッセージと演出を選ぶ
        const message = messages[Math.floor(Math.random() * messages.length)];
        const effect = effects[Math.floor(Math.random() * effects.length)];
        congratsMessage.querySelector('h2').textContent = message;
        congratsMessage.classList.remove('hidden');
        applyEffect(effect);
        fireConfetti(effect);
    }

    function applyEffect(effect) {
        removeEffect();
        document.body.classList.add('effect-' + effect);
        currentEffect = effect;
    }

    function removeEffect() {
        if (currentEffect) {
            document.body.classList.remove('effect-' + currentEffect);
            currentEffect = null;
        }
    }

    function fireConfetti(effect) {
        // パターンごとに紙吹雪の色や形を変える
        let options = {};
        switch (effect) {
            case 'rainbow':
                options = { particleCount: 200, spread: 200, origin: { y: 0.6 }, colors: ['#ff5e62','#ff9966','#f9d423','#a8e063','#38ef7d','#43cea2','#185a9d','#5f2c82'] };
                break;
            case 'star':
                options = { particleCount: 150, spread: 180, origin: { y: 0.6 }, shapes: ['star'], colors: ['#fff700','#ffe600','#ffd700','#fff','#f9d423'] };
                break;
            case 'heart':
                options = { particleCount: 150, spread: 180, origin: { y: 0.6 }, shapes: ['circle'], colors: ['#ff69b4','#ffb6c1','#ff8fab','#fff'] };
                break;
            case 'gold':
                options = { particleCount: 180, spread: 200, origin: { y: 0.6 }, colors: ['#ffd700','#fff8dc','#fff700','#fff'] };
                break;
            case 'pop':
                options = { particleCount: 180, spread: 220, origin: { y: 0.6 }, colors: ['#ff5e62','#ff9966','#f9d423','#38ef7d','#43cea2','#5f2c82','#ff69b4','#fff'] };
                break;
            default:
                options = { particleCount: 150, spread: 180, origin: { y: 0.6 } };
        }
        confettiInstance(options);
    }

    renderTasks();
});
