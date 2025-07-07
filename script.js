document.addEventListener('DOMContentLoaded', () => {
    const tasks = [
        { name: 'かおを あらう', image: 'images/face_wash.png', completed: false },
        { name: 'きがえる', image: 'images/clothes.png', completed: false },
        { name: 'ごはんを たべる', image: 'images/eat.png', completed: false },
        { name: 'はを みがく', image: 'images/toothbrush.png', completed: false },
        { name: 'おんどを はかる', image: 'images/thermometer.png', completed: false },
        { name: 'おんどを きろくする', image: 'images/record.png', completed: false },
        { name: 'もちものを かくにんする', image: 'images/bag_check.png', completed: false },
        { name: 'すいとうを もつ', image: 'images/water_bottle.png', completed: false },
        { name: 'トイレに いく', image: 'images/toilet.png', completed: false },
        { name: 'かさを もつか かくにん', image: 'images/umbrella.png', completed: false }
    ];

    const taskList = document.getElementById('task-list');
    const congratsMessage = document.getElementById('congrats-message');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confettiInstance = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

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
            congratsMessage.classList.remove('hidden');
            fireConfetti();
        } else {
            congratsMessage.classList.add('hidden');
        }
    }

    function fireConfetti() {
        confettiInstance({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 }
        });
    }

    renderTasks();
});
