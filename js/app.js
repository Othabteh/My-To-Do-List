'use strict';
var form = document.getElementById('form');
var table = document.getElementById('table');
var clear = document.getElementById('clear');
ToDo.all = [];
if (!localStorage.getItem('todo')) {
    localStorage.setItem('todo', JSON.stringify([]));
} else {
    ToDo.all = JSON.parse(localStorage.getItem('todo'))
    generatTableBody();
}
// this is the constructor 
function ToDo(task, date, urqency) {
    this.task = task;
    this.date = date;
    this.urqency = urqency;
    ToDo.all.push(this);
}

// this event to save the data to the localstorage

form.addEventListener('submit', function () {
    event.preventDefault();
    var task = event.target.task.value;
    var date = event.target.date.value;
    var urqency = event.target.urqency.value
    new ToDo(task, date, urqency);
    localStorage.setItem('todo', JSON.stringify(ToDo.all));
    generatTableBody();
    form.reset();


});
// this function to create the head of the table

function generateTableHeader() {
    table.innerHTML = `<tr>
    <th>Task</th>
    <th>Date</th>
    <th>Urqency</th>
    <th>Done</th>
    </tr>`
}
// this function to create the body of the table
function generatTableBody() {
    table.innerHTML = '';
    generateTableHeader();

    var tempArr = JSON.parse(localStorage.getItem('todo'));
    for (let index = 0; index < tempArr.length; index++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = tempArr[index].task;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = tempArr[index].date;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = tempArr[index].urqency;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = `<i id="${index}" class="fa fa-trash"></i>`;
        tr.appendChild(td);
        table.appendChild(tr);


    }

}
deleteItem();
// this function to delete specific item
function deleteItem() {
    table.addEventListener('click', () => {
        if (event.target.tagName == 'I' && event.target.id) {
            ToDo.all = JSON.parse(localStorage.getItem('todo'));
            ToDo.all.splice(event.target.id, 1);
            localStorage.setItem('todo', JSON.stringify(ToDo.all));
            generatTableBody();
        }
    });
}
// this event to clear the local storage
clear.addEventListener('click', () => {
    event.preventDefault();
    if (event.target.tagName == 'BUTTON' && event.target.id) {
        localStorage.clear();
        localStorage.setItem('todo', JSON.stringify([]));
        location.reload();
generateTableHeader();    }
})