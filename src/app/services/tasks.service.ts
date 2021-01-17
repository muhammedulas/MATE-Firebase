import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { taskModel } from '../models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private taskRef: AngularFireList<taskModel>
  private userKey = localStorage.getItem('userKey');
  constructor(private db: AngularFireDatabase) { this.taskRef = db.list('tasks', q => q.orderByChild('assignedTo').equalTo(this.userKey)) }

  getTasks() {
    return this.taskRef
  }

  changeStatus(task: taskModel) {
    this.db.database.ref('tasks/' + task.task_key).update(task)
  }

  setStatusDesc(task: taskModel) {
    this.db.database.ref('tasks/' + task.task_key).update(task)
  }

  getUserTasks(){
    return this.db.database.ref('tasks')
  }

}
