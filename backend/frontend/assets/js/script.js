$(document).ready(function(){
  $.get("/api/items?name=kabelo&surname=masemula", function(data, status){
    // alert(`${data.status}`);
    let tasks = data.tasks;
    console.log(tasks);

    tasks.forEach(task => {
      
      $('.tasklist').append(`<li class="list-group-item">${task.task} - ${task.time}</li>`);
    });
  });
})


$(".button").click(function(){
    
    // alert('hello World');
    let task_name = $('.task-name').val();
    let task_time =$('.task-time').val();

    console.log(task_name,task_time);
    
    // debugger;

    $.post("/api/items",{
      task:{
        task:task_name,
        time:task_time
      }
    }, function(data, status){
      // alert(`${data.status}`);

      let tasks = data.tasks;
      console.log(tasks);

      $('.tasklist').html('<li class="list-group-item active">List of Todo Items</li>');
      
      tasks.forEach(task => {       
        $('.tasklist').append(`<li class="list-group-item">${task.task} - ${task.time}</li>`);
      });

    });
  });