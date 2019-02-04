document.addEventListener('DOMContentLoaded',
function (event) {

    const projects = [];
    const sample = { title: "Groceries", description: "Thing to get at the store", dueDate: "Tomorrow", priority: "1", tasks: ["2lbs ground beef","1lb onions","1 bag carrots"] }
    projects.push(sample)
    render(sample)
    console.log(sample.tasks)
    sample.tasks.map(x => renderTask(x,0))
    $('#project0').children().eq(6).toggleClass('changed')

    let formButton = document.querySelector('.addproject')
    formButton.addEventListener('click', addProjects)

    // Adds form data to array and clears form
    function addProjects() {
        let myProject = {}
        let title = document.querySelector('.title').value
        let description = document.querySelector('.description').value
        let dueDate = document.querySelector('.due-date').value
        let priority = document.querySelector('.priority').value
        myProject = { title, description, dueDate, priority, tasks: [] }
        projects.push(myProject)
        document.querySelector('.title').value = ''
        document.querySelector('.description').value = ''
        document.querySelector('.due-date').value = ''
        document.querySelector('.priority').value = ''
        render(myProject);
    }

    function render(myProject) {
        $('.projects').append(mapItems(myProject))
        console.log(myProject)
        function mapItems(x) {
            console.log(x)
            return `<div class="project" id="project${projects.indexOf(x)}">
            <p>${x.title}</p>
            <p>${x.description}</p>
            <p>${x.dueDate}</p>
            <p>${x.priority}</p>
            <div class="btn-group dropright">
            <button type="button" class="btn btn-secondary dropdown-toggle" id="${projects.indexOf(x)}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item options add" data-toggle="modal" data-target="#exampleModal" data-id=${projects.indexOf(x)} id="${projects.indexOf(x)}" href="#">Add task</a>
                <a class="dropdown-item options delete" id="${projects.indexOf(x)}" href="#">Delete Project</a>
            </div>
            </div>
        </div>
    `}
        addTaskListeners();


    }
    function renderTask(task,projectID){
        $(`#project${projectID}`).append(renderTemplate(task))
        function renderTemplate(task){
            return `<div class="task"><p>${task}</p></div>`
        }
        addTaskDivListeners();
    }

    // Add tasks to projects

    function addTaskListeners() {
        let deleteNode = document.querySelectorAll('.delete')
        deleteNode.forEach(x => x.addEventListener('click', function () {
            document.getElementById(`project${x.id}`).remove()
        }))
    }

    function addTask(e) {
        let task = $('#exampleModal #task').val()

        projects[e.target.id]["tasks"].push(task)
        renderTask(task,e.target.id)
        $('#exampleModal #task').val('')
        $('#exampleModal').modal('hide')
    }
    function addTaskDivListeners() {
        let taskDiv = document.querySelectorAll('.task')
        $('.task').off()
        $('.task').on('click',function(){
            $(this).toggleClass('changed')
        })    
        
        
    }
    // add project name to modal on task create
    $('#exampleModal').on('show.bs.modal', function (event) {
        let saveTask = document.querySelector('.saveTask')
        saveTask.addEventListener('click', addTask)
        var button = $(event.relatedTarget)
        var recipient = button.data('id')
        var modal = $(this)
        modal.find('.modal-title').text('Add Task to ' + projects[recipient].title)
        modal.find('.saveTask').attr('id', `${recipient}`)
    })





})