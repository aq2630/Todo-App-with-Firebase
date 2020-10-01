var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function(data){
   
    
     // create li element
     var li = document.createElement('li');
     var new_todo_text = document.createTextNode(data.val().value);
     li.appendChild(new_todo_text);


    // create delete button
    var delbtn = document.createElement("button");
    var deltext = document.createTextNode("Delete");
    delbtn.setAttribute("class", "btn btn-danger mx-2");
    delbtn.setAttribute("id", data.val().key)
    delbtn.setAttribute("onclick", "deleteItem(this)");
        delbtn.appendChild(deltext);


    // create edit button
    var editbtn = document.createElement("button");
    var edittext = document.createTextNode("Edit");
    editbtn.appendChild(edittext);
    editbtn.setAttribute("id",data.val().key);
    editbtn.setAttribute("onclick","editItem(this)");
    editbtn.setAttribute("class","btn btn-warning mx-2");

    li.appendChild(delbtn)
    li.appendChild(editbtn)

    list.appendChild(li)
});

function addtodo() {
 
    var todo_text = document.getElementById("todo-text")
    var database = firebase.database().ref('todos');  
    var key = database.push().key;
    var todo = {
        value: todo_text.value,
        key: key
    };

    database.child(key).set(todo);




   

    // todo_text.value = "";

}


function deleteItem(e) {
  firebase.database().ref('todos').child(e.id).remove();
  e.parentNode.remove();
}
    
   
function editItem(e) {

   
    var val = prompt("Enter Updated Value", e.parentNode.firstChild.nodeValue);
    var edittodo = {
        value: val,
        key: e.id,
    };
    console.log(edittodo);
    firebase.database().ref('todos').child(e.id).set(edittodo);
    e.parentNode.firstChild.nodeValue = edittodo.value;
}

function deleteAll() {
    list.innerHTML = "";
}

    



    // if (todo_text.value == '' )  {
    //     alert("Please Enter Text");
    // } else {
      
      
        
    // }
