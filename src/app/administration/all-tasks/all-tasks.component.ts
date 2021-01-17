import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { map } from 'rxjs/operators';
import { userModel } from '../..//models/userModel';
import { taskModel } from '../../models/taskModel';
import { TaskManagementService } from '../administrativeServices/TaskManagement.service';
import { UsersService } from '../administrativeServices/users.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent implements OnInit {
  public tasksList:taskModel[];
  public searchBoxValue:string;
  public searchUsers1;
  public searchUsers2;
  public users:userModel[];
  public userKey:string;
  public userName:string;
  public tempTask:taskModel ={
    header : "",
    description!:"",
    assignedTo!:"",
    assignedTo_name!:"",
    createdAt!:null,
    modifiedAt!:null,
    deadline!:null,
    assignedBy!:"",
    assignedBy_name!:"",
    task_key:"",
    status!:"",
    result!:"",
    status_description!:""
    
  }
  
  constructor(private taskService:TaskManagementService, private usersService:UsersService) { }

  ngOnInit() {
    this.taskService.getTasks().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.tasksList = data;
      console.log(this.tasksList)
    });
    this.userKey = localStorage.getItem('userKey')
    this.userName = localStorage.getItem('userName')

    this.usersService.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })
        ))
    ).subscribe(data =>
      this.users = data)
  }


  createTask(){
    var date = new Date
    //this.tempTask.createdAt = date
    this.taskService.createTask(this.tempTask)
  }


  resetTemp(){
    this.tempTask={
      header : "",
      description!:"",
      assignedTo!:"",
      assignedTo_name!:"",
      createdAt!:null,
      modifiedAt!:null,
      deadline!:null,
      assignedBy!:"",
      assignedBy_name!:"",
      task_key:"",
      status!:"",
      result!:"",
      status_description!:""
      
    }
  }

  deleteTask(key){
    this.taskService.deleteTask(key)
  }

  updateTask(task){
    this.taskService.updateTaskByAdm(task)
  }
}
