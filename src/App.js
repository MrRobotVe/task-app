$(function () {
    // Global Setting 
    let edit = false;

   console.log('JQuery is working');
   $('#task-result').hide();
   fetchTasks();

   // Buscar Tareas
   $('#search').keyup(function (e) {
       if($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                    url: 'back-end/Task/task-search.php',
                    type: 'POST',
                    data: { search },
                    success: function (response) {
                        let tasks = JSON.parse(response);

                        let template = '';

                        tasks.forEach(task => {
                            template+= `<li>
                                    ${task.name}
                                </li>`;
                        });
                        $('#container').html(template);
                        $('#task-result').show();
                    }
            });
        }
   }); 

   // Agregar Tareas
   $('#task-form').submit(function (e) {
       const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#id').val()
       };
       let url = edit === false ? 'back-end/Task/task-add.php' : 'back-end/Task/task-edit.php';

       $.post(url, postData, function (response) {
           console.log(response);
           $('#task-form').trigger('reset');
           fetchTasks();
       });
        e.preventDefault();
       
   });

   // Listar Tareas
    function fetchTasks() {
        $.ajax({
            url: 'back-end/Task/task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                
                tasks.forEach(task => {
                    template += `
                        <tr taskId=${task.id}>
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                            <td>
                                <button class='task-delete btn btn-danger'>
                                    Delete
                                </button>
                            </td>
                             <td>
                                <button class='task-edit btn btn-primary'>
                                    Edit
                                </button>
                            </td>
                        </tr>`;
                });
                $('#tasks').html(template);
            }
        });
    }

    // Eliminar Tareas
    $(document).on('click', '.task-delete', function name(params) {
        // Buscar y seleccionar el id de la tarea clickeada
        if(confirm('Are you sure you want to delete it?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
        
            $.post('back-end/Task/task-delete.php', { id }, function (response) {
                fetchTasks();
            });
        }    
    });

    // Editar Tareas:
    $(document).on('click', '.task-edit', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id= $(element).attr('taskId');
        console.log(id);

        $.post('back-end/Task/task-single.php', {id}, function (response) {
           let task = JSON.parse(response);
           $('#name').val(task.name);
           $('#description').val(task.description);
           $('#id').val(task.id);
           
           edit = true;
        });
    });
    
});