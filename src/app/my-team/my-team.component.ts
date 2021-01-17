import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TaskManagementService } from '../administration/administrativeServices/TaskManagement.service';
import { UsersService } from '../administration/administrativeServices/users.service';
import { taskModel } from '../models/taskModel';
import { userModel } from '../models/userModel';
import { MyTeamService } from '../services/my-team.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {
  public userName = localStorage.getItem('userName')
  public userKey = localStorage.getItem('userKey')
  public teamName = localStorage.getItem('teamName')
  public membersList: userModel[]=[];
  public taskList: taskModel[]=[];
  public teamKey = localStorage.getItem('teamKey')
  public tempTask: taskModel = {
    header: "",
    description!: "",
    assignedTo!: "",
    assignedTo_name!: "",
    createdAt!: null,
    modifiedAt!: null,
    deadline!: null,
    assignedBy!: this.userKey,
    assignedBy_name!: this.userName,
    task_key: "",
    status!: "Beklemede",
    result!: "",
    status_description!: ""

  }
  constructor(private taskService: TaskManagementService, private myTeamService: MyTeamService) { }

  ngOnInit() {
    this.myTeamService.getMembers().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.membersList = data;
    });

    this.taskService.getTasks().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.taskList = data;
    });
  }


  createTask() {
    var date = new Date().toLocaleString()
    this.tempTask.createdAt = date
    this.tempTask.modifiedAt = date
    this.taskService.createTask(this.tempTask)
  }

  assign(user: userModel) {
    this.tempTask.assignedTo = user.key
    this.tempTask.assignedTo_name = user.displayName
  }

  deleteTask(key){
    this.taskService.deleteTask(key)
  }

  resetForm(){
    this.tempTask ={
      header: "",
      description!: "",
      assignedTo!: "",
      assignedTo_name!: "",
      createdAt!: null,
      modifiedAt!: null,
      deadline!: null,
      assignedBy!: this.userKey,
      assignedBy_name!: this.userName,
      task_key: "",
      status!: "Beklemede",
      result!: "",
      status_description!: ""
  
    }
  }

  isManager(){
    if(localStorage.getItem('role')=='Ekip Lideri'){
      return true
    }
    else return false
  }
}
