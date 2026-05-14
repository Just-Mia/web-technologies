const IMAGES = [
    'https://i.imgur.com/OMxGSO8.gif',
    'https://i.redd.it/rdpmn4brm31c1.gif',
    'https://cdn.dribbble.com/userupload/3605419/file/original-ec71d40008bad7a5bf8f47ed231d9b42.gif',
    'https://art.pixilart.com/26a2052a052be73.gif',
    'https://ih1.redbubble.net/image.840234060.3781/aps,504x498,medium,transparent-pad,600x600,f8f8f8.u4.jpg',
    'https://dk2dv4ezy246u.cloudfront.net/widgets/sSzANXNQtKe_large.jpg'
];

let config = { rows: 4, cols: 4, difficulty: 120, players: 1, totalRounds: 1 };
let state = {
    currentRound: 1,
    currentPlayer: 1,
    moves: 0,
    matches: 0,
    timeLeft: 0,
    timerId: null,
    history: [] 
};
let flippedCards = [];


const modal = document.getElementById('settings-modal');
const overlay = document.getElementById('game-overlay');

document.getElementById('open-settings').onclick = () => modal.style.display = 'flex';
document.getElementById('close-settings').onclick = () => modal.style.display = 'none';

document.getElementById('player-mode').onchange = (e) => {
    document.getElementById('p2-name').style.display = e.target.value === "2" ? "block" : "none";
};

document.getElementById('reset-settings').onclick = () => location.reload();


const handleStart = () => {
    config.rows = parseInt(document.getElementById('rows').value);
    config.cols = parseInt(document.getElementById('cols').value);
    config.difficulty = parseInt(document.getElementById('difficulty').value);
    config.players = parseInt(document.getElementById('player-mode').value);
    config.totalRounds = parseInt(document.getElementById('rounds-limit').value);

    if ((config.rows * config.cols) % 2 !== 0) {
        alert("Must be even");
        return;
    }

    modal.style.display = 'none';
    state.currentRound = 1;
    state.currentPlayer = 1;
    state.history = [];
    startSession();
};

document.getElementById('start-game').onclick = handleStart;
if (document.getElementById('restart-game')) {
    document.getElementById('restart-game').onclick = handleStart;
}

function startSession() {
    state.moves = 0;
    state.matches = 0;
    state.timeLeft = config.difficulty;
    flippedCards = [];
    clearInterval(state.timerId);

    const name = document.getElementById(`p${state.currentPlayer}-name`).value || `Player ${state.currentPlayer}`;
    document.getElementById('cur-player-name').innerText = name;
    document.getElementById('cur-round').innerText = state.currentRound;

    renderBoard();
    updateUI();
    startTimer();
}

function renderBoard() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${config.cols}, auto)`;

    const pairs = (config.rows * config.cols) / 2;
    let deckImages = [];
    for (let i = 0; i < pairs; i++) deckImages.push(IMAGES[i % IMAGES.length]);

    const deck = [...deckImages, ...deckImages].sort(() => Math.random() - 0.5);

    deck.forEach(src => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
                <div class="card-front"><img src="https://img.icons8.com/?size=100&id=118858&format=png&color=FFFFFF" width="30"></div>
                <div class="card-back"><img src="${src}"></div>
            `;
        card.onclick = () => flipCard(card);
        container.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains('toggled') || flippedCards.length === 2) return;

    card.classList.add('toggled');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        state.moves++;
        const s1 = flippedCards[0].querySelector('.card-back img').src;
        const s2 = flippedCards[1].querySelector('.card-back img').src;

        if (s1 === s2) {
            state.matches++;
            flippedCards = [];
            if (state.matches === (config.rows * config.cols) / 2) endSession(true);
        } else {
            setTimeout(() => {
                flippedCards.forEach(c => c.classList.remove('toggled'));
                flippedCards = [];
            }, 800);
        }
        updateUI();
    }
}

function startTimer() {
    state.timerId = setInterval(() => {
        state.timeLeft--;
        updateUI();
        if (state.timeLeft <= 0) endSession(false);
    }, 1000);
}

function updateUI() {
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    document.getElementById('timer').innerText = `${m}:${s < 10 ? '0' + s : s}`;
    document.getElementById('move-display').innerText = `Moves: ${state.moves}`;
    document.getElementById('pair-display').innerText = `Pairs: ${state.matches} / ${(config.rows * config.cols) / 2}`;
}

function endSession(isSuccess) {
    clearInterval(state.timerId);

    
    state.history.push({
        player: state.currentPlayer,
        name: document.getElementById(`p${state.currentPlayer}-name`).value || `Player ${state.currentPlayer}`,
        round: state.currentRound,
        moves: state.moves,
        time: config.difficulty - state.timeLeft,
        success: isSuccess
    });

    let title = isSuccess ? "Round finished" : "Time's Up";
    let text = isSuccess ? `All pairs found in ${state.moves} moves.` : `You had  ${state.moves} `;

    if (config.players === 2 && state.currentPlayer === 1) {
        showOverlay(title, `${text}<br>Next player..`, () => {
            state.currentPlayer = 2;
            startSession();
        });
    } else if (state.currentRound < config.totalRounds) {
        showOverlay(title, `${text}<br>Preparing for next round...`, () => {
            state.currentRound++;
            state.currentPlayer = 1;
            startSession();
        });
    } else {
        showResults(); 
    }
}

function showOverlay(title, text, callback) {
    overlay.style.display = 'flex';
    document.getElementById('overlay-title').innerText = title;
    document.getElementById('overlay-text').innerHTML = text; 
    document.getElementById('next-session-btn').onclick = () => {
        overlay.style.display = 'none';
        callback();
    };
}

function showResults() {
    let p1 = { wins: 0, moves: 0, time: 0, name: document.getElementById('p1-name').value || "Player 1" };
    let p2 = { wins: 0, moves: 0, time: 0, name: document.getElementById('p2-name').value || "Player 2" };

  
    let detailedStats = `<div style="text-align: left; font-size: 0.9em; margin-top: 15px; max-height: 200px; overflow-y: auto; border-top: 1px solid #ccc; padding-top: 10px;">`;
    detailedStats += `<b>Round details:</b><br>`;

    state.history.forEach(h => {
        let p = (h.player === 1) ? p1 : p2;
        if (h.success) p.wins++;
        p.moves += h.moves;
        p.time += h.time;

        detailedStats += `R${h.round} | ${h.name}:  ${h.moves} moves in ${h.time} s<br>`;
    });
    detailedStats += `</div>`;

    
    let winnerMsg = "";
    if (config.players === 1) {
        winnerMsg = `Game is finished !<br>Wins: ${p1.wins} / ${config.totalRounds}<br>Total moves: ${p1.moves} | Time: ${p1.time}s`;
    } else {
        if (p1.wins > p2.wins) winnerMsg = `Won: ${p1.name}`;
        else if (p2.wins > p1.wins) winnerMsg = `Won: ${p2.name}`;
        else {
           
            winnerMsg = p1.moves <= p2.moves ? `Won: ${p1.name} (less moves)` : `Won: ${p2.name} (less moves)`;
        }
    }

   
    overlay.style.display = 'flex';
    document.getElementById('overlay-title').innerText = "Final results";
    document.getElementById('overlay-text').innerHTML = `<b>${winnerMsg}</b>${detailedStats}`;

    document.getElementById('next-session-btn').innerText = "Try again";
    document.getElementById('next-session-btn').onclick = () => location.reload();
}




//div2

class Slider {
    constructor(selector, options) {
        this.container = document.querySelector(selector);
        this.track = this.container.querySelector('.slider-track');

      
        this.config = {
            images: options.images || [],
            duration: options.duration || 500,
            autoplay: options.autoplay ?? true,
            showArrows: options.showArrows ?? true,
            showDots: options.showDots ?? true,
            interval: options.interval || 3000
        };

        this.currentIndex = 0;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.renderSlides();
        if (this.config.showArrows) this.renderArrows();
        if (this.config.showDots) this.renderDots();

        this.update();
        this.setupEventListeners();

        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }

    renderSlides() {
        this.config.images.forEach(src => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${src}" alt="Slide">`;
            this.track.appendChild(slide);
        });
        this.track.style.transitionDuration = `${this.config.duration}ms`;
    }

    renderArrows() {
        const prev = document.createElement('button');
        prev.className = 'slider-arrow prev-arrow';
        prev.innerText = '<-';
        prev.onclick = () => this.prev();

        const next = document.createElement('button');
        next.className = 'slider-arrow next-arrow';
        next.innerText = '->';
        next.onclick = () => this.next();

        this.container.appendChild(prev);
        this.container.appendChild(next);
    }

    renderDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        this.config.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goTo(index));
            dotsContainer.appendChild(dot);
        });

        this.container.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.dot');
    }

    update() {
     
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        
        if (this.config.showDots && this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }
    }

    next() {
        
        this.currentIndex = (this.currentIndex + 1) % this.config.images.length;
        this.update();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.config.images.length) % this.config.images.length;
        this.update();
    }

    goTo(index) {
        this.currentIndex = index;
        this.update();
    }

    setupEventListeners() {
       
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

       
        if (this.config.autoplay) {
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoPlayInterval = setInterval(() => this.next(), this.config.interval);
    }

    stopAutoplay() {
        clearInterval(this.autoPlayInterval);
    }
}


const mySlider = new Slider('#my-slider', {
    images: [
        'https://i.imgur.com/OMxGSO8.gif',
        'https://ih1.redbubble.net/image.840234060.3781/aps,504x498,medium,transparent-pad,600x600,f8f8f8.u4.jpg',
        'https://dk2dv4ezy246u.cloudfront.net/widgets/sSzANXNQtKe_large.jpg'
    ],
    duration: 600,
    autoplay: true,
    interval: 4000,
    showArrows: true,
    showDots: true
});





//div3

const columns = document.querySelectorAll(".task-column");

columns.forEach((column) => {
    column.addEventListener("dragover", (event) => {
      
        if (event.dataTransfer.types.includes("task")) {
            event.preventDefault();
        }
    });
});

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart", (event) => {
        task.id = "dragged-task";
        event.dataTransfer.effectAllowed = "move";
        
        event.dataTransfer.setData("task", "");
    });

    task.addEventListener("dragend", (event) => {
        task.removeAttribute("id");
    });
});

columns.forEach((column) => {
    column.addEventListener("drop", (event) => {
        event.preventDefault();

        const draggedTask = document.getElementById("dragged-task");
        draggedTask.remove();
        column.children[1].appendChild(draggedTask);
    });
});



function makePlaceholder(draggedTask) {
    const placeholder = document.createElement("li");
    placeholder.classList.add("placeholder");
    placeholder.style.height = `${draggedTask.offsetHeight}px`;
    return placeholder;
}

function movePlaceholder(event) {
    if (!event.dataTransfer.types.includes("task")) {
        return;
    }
    event.preventDefault();
  
    const draggedTask = document.getElementById("dragged-task");
    const column = event.currentTarget;
    const tasks = column.children[1];
    const existingPlaceholder = column.querySelector(".placeholder");

    if (existingPlaceholder) {
        const placeholderRect = existingPlaceholder.getBoundingClientRect();
        if (
            placeholderRect.top <= event.clientY &&
            placeholderRect.bottom >= event.clientY
        ) {
            return;
        }
    }

    for (const task of tasks.children) {
        if (task.getBoundingClientRect().bottom >= event.clientY) {
            if (task === existingPlaceholder) return;
            existingPlaceholder?.remove();
            if (task === draggedTask || task.previousElementSibling === draggedTask)
                return;
            tasks.insertBefore(
                existingPlaceholder ?? makePlaceholder(draggedTask),
                task,
            );
            return;
        }
    }

    existingPlaceholder?.remove();
    if (tasks.lastElementChild === draggedTask) return;
    tasks.append(existingPlaceholder ?? makePlaceholder(draggedTask));
}

columns.forEach((column) => {
    column.addEventListener("dragover", movePlaceholder);
    column.addEventListener("dragleave", (event) => {
    
        if (column.contains(event.relatedTarget)) return;
        const placeholder = column.querySelector(".placeholder");
        placeholder?.remove();
    });
    column.addEventListener("drop", (event) => {
        event.preventDefault();

        const draggedTask = document.getElementById("dragged-task");
        const placeholder = column.querySelector(".placeholder");
        if (!placeholder) return;
        draggedTask.remove();
        column.children[1].insertBefore(draggedTask, placeholder);
        placeholder.remove();
    });
});


//div4


const grid = document.getElementById('cardGrid');
const editBtn = document.getElementById('editToggle');
let isEditMode = false;


for (let i = 1; i <= 10; i++) {
    createCard(i);
}

function createCard(id) {
    const card2 = document.createElement('div');
    card2.className = 'card2';
    card2.textContent = `Card ${id}`;
    card2.setAttribute('draggable', 'false');

    const del = document.createElement('div');
    del.className = 'delete-btn';
    del.innerHTML = '&times;';

    del.onclick = (e) => {
        e.stopPropagation();
        card2.remove();
    };

    card2.appendChild(del);
    grid.appendChild(card2);
    setupDragEvents(card2);
}

editBtn.addEventListener('click', () => {
    isEditMode = !isEditMode;
    document.body.classList.toggle('edit-mode', isEditMode);

    const cards2 = document.querySelectorAll('.card2');
    cards2.forEach(card2 => {
        card2.setAttribute('draggable', isEditMode);
    });

    editBtn.textContent = isEditMode ? 'Save' : 'Edit';
    editBtn.classList.toggle('active', isEditMode);
});

let draggedItem = null;

function setupDragEvents(card2) {
    card2.addEventListener('dragstart', (e) => {
        if (!isEditMode) {
            e.preventDefault();
            return;
        }
        draggedItem = card2;
        setTimeout(() => {
            card2.classList.add('dragging');
        }, 0);
    });

    card2.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }
    });

   
    grid.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!isEditMode || !draggedItem) return;

        const afterElement = getDragAfterElement(grid, e.clientX, e.clientY);
        if (afterElement == null) {
            grid.appendChild(draggedItem);
        } else {
            grid.insertBefore(draggedItem, afterElement);
        }
    });
}


function getDragAfterElement(container, x, y) {
 
    const draggableElements = [...container.querySelectorAll('.card2:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();

        
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;

        
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

        if (distance < closest.offset) {
            return { offset: distance, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.POSITIVE_INFINITY }).element;
}