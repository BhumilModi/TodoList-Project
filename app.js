
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click' , delCheck);
filterOption.addEventListener('click' , filterTodo);



function addTodo(event){
    event.preventDefault();

    const tododiv = document.createElement('div');
    tododiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    tododiv.appendChild(newTodo);

    savingTodo(todoInput.value);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
    checkButton.classList.add('checked-button');
    tododiv.appendChild(checkButton);
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="far fa-calendar-times"></i>';
    deleteButton.classList.add('delete-button');
    tododiv.appendChild(deleteButton);
    
    todoList.appendChild(tododiv);

    todoInput.value = "";
}


function delCheck(e){
    const item =e.target;
    

    if(item.classList[0] === 'delete-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodo(todo);
        todo.addEventListener('transitionend' , function(){
            todo.remove();
        });
    }
    if(item.classList[0] === 'checked-button'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "left":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function savingTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const tododiv = document.createElement('div');
        tododiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        tododiv.appendChild(newTodo);

        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
        checkButton.classList.add('checked-button');
        tododiv.appendChild(checkButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="far fa-calendar-times"></i>';
        deleteButton.classList.add('delete-button');
        tododiv.appendChild(deleteButton);
        
        todoList.appendChild(tododiv);
    })
}

function removeTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoValue = todo.children[0].innerText;
    const todoIndex = todos.indexOf(todoValue);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos', JSON.stringify(todos));
}