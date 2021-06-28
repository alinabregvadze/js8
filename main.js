function getData() {
    fetch('https://ucha.ge/todo/server.php').then(function(r) {
        return r.json();
    }).then(function(r) {
        console.log(r);
        // renderListItems(r)
    })
}
getData();

function sendData(text) {
    fetch('https://ucha.ge/todo/server.php', {
        method: 'POST',
        headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=add&text= '+ encodeURIComponent(text) 
    }).then(function(r) {
        return r.json();
    }).then(function(r) {
        console.log(r);
    })
}

function updateData(id, text, boolean) {
    fetch('https://ucha.ge/todo/server.php', {
        method: 'POST',
        headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=update&id=' + encodeURIComponent(id) + '&text='+ encodeURIComponent(text) + '&done=' + boolean
    }).then(function(r) {
        return r.json();
    }).then(function(r) {
        console.log(r);
    })
}

function removeData(id) {
    fetch('https://ucha.ge/todo/server.php', {
        method: 'POST',
        headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=remove&id=' + encodeURIComponent(id)
    }).then(function(r) {
        return r.json();
    }).then(function(r) {
        console.log(r);
    })
}

let todoListDiv = document.getElementById('todo-list');
let addButton = document.getElementById('add');
let list = document.createElement('li');
let text = document.createElement('input');
text.type="text";
let checkBox = document.createElement('input');
checkBox.type="checkbox";
let saveButton = document.createElement('button');
saveButton.innerText = "save";
saveButton.classList.add('button')
let deleteButton = document.createElement('button');
deleteButton.innerText = "delete";
deleteButton.classList.add('button')

// saveButton.addEventListener('click', updateData(id, text, boolean))
// deleteButton.addEventListener('click', removeData(id))


function renderListItems(listItems) {
    for(let i = 0; i < listItems.length; i++) {
        let listItem = listItems[i];

        let id = 'm_' + listItem.id;
        // if(document.getElementById(id)) continue;
        
        list.id = id;
        text.innerText = listItem.text;
        list.appendChild(checkBox);
        list.appendChild(text);
        list.appendChild(saveButton);
        list.appendChild(deleteButton);

        document.querySelector('ul').appendChild(list);
    }
}

addButton.addEventListener('click', function() {
    let task = document.getElementById('new-task')
    let newTask = task.value;
  
    sendData(newTask).then(function(r) {
        console.log(r);
        renderListItems(r);
    });
  
    document.getElementById('new-task').value = '';
});

