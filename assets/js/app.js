let cl = console.log;

const listItems = document.getElementById("listItems");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const updateBtn = document.getElementById("updateBtn");


let todoArray = [
    {
        todoItem : "Javascript",
        todoId : "1"
    }
];



const onClickEdit = (eve) => {
    let getId = eve.closest("li").id;
    localStorage.setItem("editId", getId);
    cl(eve);
    let getObject = todoArray.find(ele=>{
        return ele.todoId === getId
    })
    todoInput.value = getObject.todoItem
    addTodoBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
};

const onDelete = (eve) =>{
    let getDeleteId = eve.closest("li").id;
    let getIndex = todoArray.findIndex(ele =>{
        return ele.todoId === getDeleteId
    })
    todoArray.splice(getIndex, 1);
    localStorage.setItem("newArray", JSON.stringify(todoArray))
    document.getElementById(getDeleteId).remove()
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}


const templating = (arr) =>{
    let result = ``;
    arr.forEach(todo =>{
        result += `
        
        <li class="list-group-item d-flex justify-content-between lisT mt-4" id="${todo.todoId}">
          <span>${todo.todoItem}</span>
          <span>
            <button class="btn btn-primary" onclick="onClickEdit(this)">Edit</button>
            <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
          </span>
        </li>
  
        `
        listItems.innerHTML = result;
    })
}

const onUpdateBtn = ()=>{
    let getInputValue = todoInput.value;

    let getId = localStorage.getItem("editId");
    todoArray.forEach(ele =>{
        if(ele.todoId === getId){
            ele.todoItem = getInputValue
        }
    })
    localStorage.setItem("newArray", JSON.stringify(todoArray));
    let li = document.getElementById(getId);
    li.firstElementChild.innerHTML = getInputValue
    todoForm.reset();
    addTodoBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}

if(localStorage.getItem("newArray")){
    todoArray = JSON.parse(localStorage.getItem("newArray"))
};

templating(todoArray);

const onSubmitHandler = (eve) => {
    eve.preventDefault();
    let todoObj = {
        todoItem : todoInput.value,
        todoId : generateUniqueId()
    }
    todoArray.push(todoObj);
    localStorage.setItem("newArray", JSON.stringify(todoArray))
    templating(todoArray);
    todoForm.reset()
    Swal.fire({
       
        icon: 'success',
        title: 'New TODO Item Added Successfully !!!',
        showConfirmButton: false,
        timer: 1500
      })
};


todoForm.addEventListener("submit", onSubmitHandler);
updateBtn.addEventListener("click", onUpdateBtn)


function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.random() * 1000000; // You can adjust this range as needed
    const uniqueId = `${timestamp}-${random}`;
    return uniqueId;
  }