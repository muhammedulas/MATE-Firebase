import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { data } from 'jquery';
import { personalTaskModel } from '../models/personelTaskModel';
import { taskModel } from '../models/taskModel';
import { userModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  tempTodoItem: personalTaskModel;
  public datas = [];
  public labels = [];

  todosRef: AngularFireList<personalTaskModel>
  constructor(private db: AngularFireDatabase) { this.todosRef = this.db.list('personal_tasks', q => q.orderByChild('ownerKey').equalTo(localStorage.getItem('userKey'))) }

  addTodoItem(todo: personalTaskModel) {
    this.tempTodoItem = todo
    this.tempTodoItem.taskKey = this.db.database.ref('personal_tasks/' + todo.ownerKey).push(todo).key
    this.updateItem(todo)
  }

  getTodos(user_key) {
    return this.db.database.ref('personal_tasks/' + user_key)
  }

  updateItem(todo: personalTaskModel) {
    this.db.database.ref('personal_tasks/' + todo.ownerKey + '/' + todo.taskKey).set(todo)
  }

  taskAnalyses() {
    return this.db.database.ref('tasks').orderByChild('assignedTo').equalTo(localStorage.getItem('userKey'))
  }

  teamComparison() {
    this.labels = []
    this.datas = []
    this.db.database.ref('users').orderByChild('team_key').equalTo(localStorage.getItem('teamKey')).on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        var user: userModel = childSnapshot.val()
        var total = 0
        var successful = 0
        var completed = 0
        this.db.database.ref('tasks').orderByChild('assignedTo').equalTo(user.key).on('value', snap => {
          snap.forEach(childSnap => {
            var task: taskModel = childSnap.val()
            total++
            if (task.status == 'Kapandı') {
              if (task.result == 'Başarılı') {
                completed++
                successful++
              }
              if (task.result == 'Başarısız') {
                completed++
              }
            }
          })
          this.datas.push((100 / completed) * successful)
          this.labels.push(user.displayName)
          return this.datas,this.labels
        })
      })
    })
    console.log(this.datas, this.labels)

  }
}
