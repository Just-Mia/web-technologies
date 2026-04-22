'use strict';


let state = {
    products: [],
    todos: [],
    productFilter: 'All',
    productSort: null,
    todoSort: null,
    editingProductId: null
};




const addProduct = (list, data) => [...list, { ...data, id: Date.now(), created: new Date(), updated: new Date() }];
const deleteProduct = (list, id) => list.filter(p => p.id !== id);
const updateProduct = (list, id, data) => list.map(p =>
    p.id === id ? { ...p, ...data, updated: new Date() } : p
);
const getProducts = (list, filter, sort) => {
    let result = filter === 'All' ? [...list] : list.filter(p => p.category === filter);
    if (sort === 'price') result.sort((a, b) => a.price - b.price);
    if (sort === 'created') result.sort((a, b) => b.created - a.created);
    if (sort === 'updated') result.sort((a, b) => b.updated - a.updated);
    return result;
};


const createTodo = (list, text) => [...list, { id: Date.now(), text, done: false, created: new Date(), updated: new Date() }];
const editTodoText = (list, id, text) => list.map(t => t.id === id ? { ...t, text, updated: new Date() } : t);
const toggleTodoStatus = (list, id) => list.map(t => t.id === id ? { ...t, done: !t.done, updated: new Date() } : t);
const getTodos = (list, sort) => {
    let result = [...list];
    if (sort === 'date') result.sort((a, b) => b.created - a.created);
    if (sort === 'status') result.sort((a, b) => a.done - b.done);
    if (sort === 'updated') result.sort((a, b) => b.updated - a.updated);
    return result;
};



const showSnackbar = (msg) => {
    const el = document.getElementById('snackbar');
    el.textContent = msg;
    el.className = "show";
    setTimeout(() => el.className = "", 3000);
};

const render = () => {
  
    const categories = ['All', 'Fruits', 'Berries', 'Unnamed category'];
    document.getElementById('category-filters').innerHTML = categories.map(c =>
        `<button class="${state.productFilter === c ? 'btn-main' : 'btn-secondary'}" onclick="setProdFilter('${c}')">${c}</button>`
    ).join('');

  
    const prodContainer = document.getElementById('product-list');
    const filteredProds = getProducts(state.products, state.productFilter, state.productSort);

    prodContainer.innerHTML = filteredProds.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p><strong>ID:</strong> ${p.id}</p>
            <p><strong>Category:</strong> ${p.category}</p>
            <p><strong>Price:</strong> ${p.price} uah</p>
            <div class="btn-group" style="justify-content:center">
                <button class="btn-main" onclick="openEditModal(${p.id})">Edit</button>
                <button class="btn-danger" onclick="handleDeleteProduct(${p.id})">Delete</button>
            </div>
        </div>
    `).join('');

    document.getElementById('empty-msg').classList.toggle('hidden', state.products.length > 0);
    const total = state.products.reduce((acc, p) => acc + Number(p.price), 0);
    document.getElementById('total-price-display').textContent = `Total Value: ${total} uah`;


    const todoContainer = document.getElementById('todo-list');
    const sortedTodos = getTodos(state.todos, state.todoSort);

    todoContainer.innerHTML = sortedTodos.map(t => `
        <li class="todo-item">
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="handleToggleTodo(${t.id})">
            <div class="todo-text ${t.done ? 'completed' : ''}" 
                 contenteditable="true" 
                 onblur="handleEditTodo(${t.id}, this.innerText)">${t.text}</div>
            <button class="btn-secondary" onclick="handleDeleteTodo(${t.id})">Remove</button>
        </li>
    `).join('');
};




window.setProdFilter = (c) => { state.productFilter = c; render(); };
document.getElementById('sort-price').onclick = () => { state.productSort = 'price'; render(); };
document.getElementById('sort-created').onclick = () => { state.productSort = 'created'; render(); };
document.getElementById('sort-updated').onclick = () => { state.productSort = 'updated'; render(); };
document.getElementById('reset-prod-sort').onclick = () => { state.productSort = null; render(); };

window.handleDeleteProduct = (id) => {
    const p = state.products.find(item => item.id === id);
    state.products = deleteProduct(state.products, id);
    showSnackbar(`Successfully deleted: ${p.name}`);
    render();
};

window.openEditModal = (id) => {
    const p = state.products.find(item => item.id === id);
    state.editingProductId = id;
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-category').value = p.category;
    document.getElementById('p-image').value = p.image;
    document.getElementById('modal').classList.remove('hidden');
};

document.getElementById('product-form').onsubmit = (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('p-name').value,
        price: document.getElementById('p-price').value,
        category: document.getElementById('p-category').value,
        image: document.getElementById('p-image').value
    };

    if (state.editingProductId) {
        state.products = updateProduct(state.products, state.editingProductId, data);
        showSnackbar(`Updated item ID: ${state.editingProductId} (${data.name})`);
    } else {
        state.products = addProduct(state.products, data);
        showSnackbar(`Product added: ${data.name}`);
    }
    document.getElementById('modal').classList.add('hidden');
    state.editingProductId = null;
    e.target.reset();
    render();
};


document.getElementById('add-todo-btn').onclick = () => {
    const input = document.getElementById('todo-input');
    if (input.value.trim()) {
        state.todos = createTodo(state.todos, input.value.trim());
        input.value = '';
        render();
    }
};

document.getElementById('sort-todo-date').onclick = () => { state.todoSort = 'date'; render(); };
document.getElementById('sort-todo-status').onclick = () => { state.todoSort = 'status'; render(); };
document.getElementById('sort-todo-updated').onclick = () => { state.todoSort = 'updated'; render(); };

window.handleToggleTodo = (id) => { state.todos = toggleTodoStatus(state.todos, id); render(); };
window.handleDeleteTodo = (id) => { state.todos = state.todos.filter(t => t.id !== id); render(); };
window.handleEditTodo = (id, txt) => { state.todos = editTodoText(state.todos, id, txt); render(); };


document.getElementById('open-add-modal').onclick = () => {
    state.editingProductId = null;
    document.getElementById('product-form').reset();
    document.getElementById('modal').classList.remove('hidden');
};
document.getElementById('close-modal').onclick = () => document.getElementById('modal').classList.add('hidden');

render();