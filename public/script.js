console.log("Script file is loading")
const  RESPONSE_DONE = 4;
const STATUS_OK = 200;
var ACTIVE_TODOS_ID = 'activeTodos';
var COMPLETE_TODOS_ID = 'completeTodos';
var DELETED_TODOS_ID = 'deletedTodos'

window.onload = getTodosAJAX();




function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var body_data ="todo_status=COMPLETE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {    //means response is ready
            if (xhr.status == STATUS_OK) {
                //refresh the todo elements
                add_todo_elements(xhr.responseText);
            }else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}


function createTodoElement(id,todo_oject) {
    var todo_element = document.createElement("div");
    todo_element.setAttribute("data-id",id);

    if(todo_oject.status == 'ACTIVE'){
        var c_box = document.createElement('input');
        c_box.type = "checkbox";
        c_box.name = todo_oject.title;
        c_box.value = todo_oject.title;
        c_box.id = id;
        c_box.setAttribute("data-id",id);
        c_box.setAttribute("onchange","completeTodoAJAX("+id+")");
        c_box.setAttribute('class','checkbox');
        todo_element.appendChild(c_box);

        var label_title = document.createElement("label");
        label_title.innerText = todo_oject.title;
        label_title.setAttribute("class",'active_status');

        todo_element.appendChild(label_title);

        var label = document.createElement("label");
        label.innerText = "x";
        label.setAttribute("onclick" , "deleteTodoAJAX("+id+")");
        label.setAttribute("class",'delete_label');
        todo_element.appendChild(label);
    }

    if(todo_oject.status == 'COMPLETE'){
        var c_box = document.createElement('input');
        c_box.type = "checkbox";
        c_box.id = id;
        c_box.checked = true;
        c_box.setAttribute("data-id",id);
        c_box.setAttribute("onchange","activeTodoAJAX("+id+")");
        c_box.setAttribute('class','checkbox');
        todo_element.appendChild(c_box);

        var label_title = document.createElement("label");
        label_title.innerText = todo_oject.title;
        label_title.setAttribute("class",'complete_status');
        todo_element.appendChild(label_title);


        var label = document.createElement("label");
        label.innerText = "x";
        label.setAttribute("class",'delete_label');
        label.setAttribute("onclick" , "deleteTodoAJAX("+id+")");

        todo_element.appendChild(label);
    }


    if(todo_oject.status == 'DELETED'){
        var label = document.createElement("label");
        label.innerText = todo_oject.title;
        label.setAttribute("class",'delete_status');

        todo_element.appendChild(label);
    }

    return todo_element;
}

function add_todo_elements(todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    var parent_active = document.getElementById(ACTIVE_TODOS_ID);
    var parent_complete = document.getElementById(COMPLETE_TODOS_ID);
    var parent_delete = document.getElementById(DELETED_TODOS_ID);
    parent_active.innerHTML = "";
    parent_complete.innerHTML = "";
    parent_delete.innerHTML = "";
    if(parent){
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createTodoElement(key,todos[key]);
                if(todos[key].status == 'ACTIVE') {
                    parent_active.appendChild(todo_element);
                }
                else if(todos[key].status == 'COMPLETE'){
                    parent_complete.appendChild(todo_element);
                }
                else if(todos[key].status == 'DELETED'){
                    parent_delete.appendChild(todo_element);
                }


            }
        )
    }
}


function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_elements(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}


function addTodoAjax() {
    var title = document.getElementById('new_todo_input').value;
    document.getElementById('new_todo_input').value = "";

    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);

    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var body_data ="todo_title="+ encodeURI(title);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {    //means response is ready
            if (xhr.status == STATUS_OK) {
                //refresh the todo elements
                add_todo_elements(xhr.responseText);
            }else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}

function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id,true);

    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var body_data ="todo_status=DELETED";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {    //means response is ready
            if (xhr.status == STATUS_OK) {
                //refresh the todo elements
                add_todo_elements(xhr.responseText);
            }else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}

function activeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);

    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var body_data ="todo_status=ACTIVE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {    //means response is ready
            if (xhr.status == STATUS_OK) {
                //refresh the todo elements
                add_todo_elements(xhr.responseText);
            }else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}


function visibility_check(id){

    var hidden_div_id ='';
    var src_label = '';
    if (id == 'hide_completed'){
        hidden_div_id = COMPLETE_TODOS_ID;
        src_label = 'hide_completed';
    }
    if(id == 'hide_deleted'){
        hidden_div_id = DELETED_TODOS_ID;
        src_label = 'hide_deleted';
    }

    var visibility = document.getElementById(hidden_div_id).style.display;

    if(visibility!='none'){
        document.getElementById(hidden_div_id).style.display = 'none';
        document.getElementById(src_label).innerHTML = 'Show';
    }
    else {
        document.getElementById(hidden_div_id).style.display = 'block';
        document.getElementById(src_label).innerHTML = 'Hide';
    }
}
