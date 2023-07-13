// 선언
const todoTextBox = document.getElementById('todoText')
const submitButton = document.getElementById('submitButton')
const todoList = document.getElementById('todoList')
let todoSavelist =[]

// 2번 함수 호출
submitButton.addEventListener('click', addtodoList)

// 2. 사용자는 입력 필드에 할 일을 입력하고 "추가" 버튼을 클릭하여 리스트에 할 일을 추가할 수 있습니다
// 3. 사용자는 "추가" 버튼을 츨릭하면, 입력 필드의 내용이 리스트에 추가됩니다.
// 4. 사용자는 여러개의 할 일을 추가할 수 있습니다
function addtodoList()
{
    const todoSmallList = document.createElement('li')
    // 앞의 빈값 지우기
    const todoText=todoTextBox.value.trim()
    if(todoText !== '')
    {
        todoSmallList.textContent = todoText
        todoList.appendChild(todoSmallList)
        // 7 함수 불러오기
        createRemoveButton(todoSmallList)
        todoSavelist.push(todoText)
        todoSave(todoSavelist)
        // 5,6 함수 불러오기
        todoList.addEventListener('click', todoComplete)
    }
    // 3-1 입력필드는 비워집니다
    todoTextBox.value=''
}

// 5. 사용자는 리스트에서 특정 할 일을 클릭하여 완료 표시 할 수 있습니다
// 6. 완료된 한 일은 리스트에서 취소선이 생기고 글자색이 변경됩니다
function todoComplete(event)
{
    const todoSmallList = event.target.closest('li')
    todoSmallList.classList.toggle('complete')
}

// 7. 사용자는 리스트에서 삭제하고자 하는 할 일의 '삭제' 버튼을 클릭하여 할 일을 삭제 할 수 있습니다 
// 8. 삭제된 한 일은 리스트에서 사라집니다
function createRemoveButton(todoSmallList)
{
    const removeButton = document.createElement('button')
    removeButton.textContent = '삭제'
    todoSmallList.appendChild(removeButton)
    removeButton.addEventListener('click', ()=>{
        todoList.removeChild(todoSmallList)
    })
}

// 9. 페이지가 새로 고침 되더라도 목록의 데이터를 유지합니다
function todoSave()
{
    localStorage.setItem('todoSavelist', JSON.stringify(todoSavelist)) 
}
function todoLoad()
{
    const todoLoadtext = localStorage.getItem('todoSavelist')
    if(todoLoadtext)
    {
        const todoSavelist2 = JSON.parse(todoLoadtext)
        for(let i=0; i< todoSavelist2.length; i++)
        {
            todoTextBox.value=todoSavelist2[i]
            addtodoList()
            todoTextBox.value=''
        }
    }
}
window.addEventListener('load',todoLoad)