document.addEventListener('DOMContentLoaded', () => {
    const tasksListContainer = document.getElementById('tasksListContainer');
  
    // Función para cargar y mostrar las tareas desde la API
    const loadTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
  
        // Limpiar el contenedor antes de agregar las tareas
        tasksListContainer.innerHTML = '';
  
        tasks.forEach(task => {
          const taskElement = createTaskElement(task);
          tasksListContainer.appendChild(taskElement);
        });
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };
  
    // Función para crear un elemento de tarea
    const createTaskElement = (task) => {
      const taskElement = document.createElement('div');
      taskElement.className = `task ${task.isFinished ? 'completed' : ''}`;
      taskElement.innerHTML = `
        <span>${task.name}: ${task.description}</span>
        <button class="removeButton" onclick="deleteTask('${task._id}')">Eliminar</button>
        <button class="finishButton" onclick="completeTask('${task._id}', ${task.isFinished})">Check</button>
      `;
      return taskElement;
    };
  
    // Función para agregar una nueva tarea
    document.getElementById('addTaskForm').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const taskName = document.getElementById('taskName').value;
      const taskDescription = document.getElementById('taskDescription').value;
  
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: taskName,
            description: taskDescription,
            isFinished: false,
          }),
        });
  
        const newTask = await response.json();
        console.log('Nueva tarea agregada:', newTask);
  
        // Crear un nuevo elemento de tarea y agregarlo al contenedor
        const newTaskElement = createTaskElement(newTask);
        tasksListContainer.appendChild(newTaskElement);
      } catch (error) {
        console.error('Error al agregar la tarea:', error);
      }
    });
    
    // Función para marcar o desmarcar una tarea como completada
    window.completeTask = async (taskId, isFinished) => {
      try {
        await fetch(`http://localhost:3000/tasks/${taskId}/complete`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isFinished: !isFinished,
          }),
        });
  
        loadTasks(); // Recargar las tareas
      } catch (error) {
        console.error('Error al cambiar el estado de la tarea:', error);
      }
    };
    
    // Función para eliminar una tarea
    window.deleteTask = async (taskId, isFinished) => {
      try {
        await fetch(`http://localhost:3000/tasks/${taskId}`, { method: 'DELETE' });
        loadTasks(); // Recargar las tareas
      } catch (error) {
        console.error('Error al cambiar el estado de la tarea:', error);
      }
    };
    
  // Cargar las tareas al cargar la página
  loadTasks();
});