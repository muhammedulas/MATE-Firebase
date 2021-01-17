import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { taskModel } from '../../models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
private tasksLoc = '/tasks'
tasksRef:AngularFireList<taskModel>
constructor(private db:AngularFireDatabase) { this.tasksRef = db.list(this.tasksLoc)}

getTasks(){
  return this.tasksRef
}

createTask(task:taskModel){
 var key = this.tasksRef.push(task).key
 task.task_key = key
 this.updateTask(task)
}

updateTask(task:taskModel){
  var date = new Date
  task.modifiedAt = date.toISOString().slice(0,-8)
  this.db.database.ref('tasks/' + task.task_key).set(task)
}

updateTaskByAdm(task:taskModel){
  this.db.database.ref('tasks/' + task.task_key).set(task)
}

deleteTask(task_key){
  this.db.database.ref('tasks/' + task_key).remove()
}

dateTest(){
  var test = new Date
  console.log(test.toDateString)
}

}
