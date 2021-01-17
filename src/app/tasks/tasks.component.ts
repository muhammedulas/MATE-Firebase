import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { taskModel } from '../models/taskModel';
import { TasksService } from '../services/tasks.service';
import { CdkDragDrop, DragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public search:string = ""
  public onHoldList: taskModel[] = []
  public inProgressList: taskModel[] = []
  public closedList: taskModel[] = []
  public tempTask: taskModel = {
    header!: "",
    description!: "",
    assignedTo!: "",
    assignedTo_name!: "",
    createdAt!: "",
    modifiedAt!: "",
    closed: "",
    deadline!: "",
    assignedBy!: "",
    assignedBy_name!: "",
    task_key: "",
    status!: "",
    result!: "",
    status_description!: "",
  }
  constructor(private taskService: TasksService, private shared: SharedService) { }

  ngOnInit() {
    this.shared.getSearchValue().subscribe(value=>{
      this.search = value
    }
    )
    this.taskService.getTasks().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.onHoldList = data.filter(singleData => singleData.status.includes('Beklemede'));
    });

    this.taskService.getTasks().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.inProgressList = data.filter(singleData => singleData.status.includes('Devam Ediyor'));
    });

    this.taskService.getTasks().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.closedList = data;
    });
    console.log(this.closedList)
  }

  changeStatusInProgress() {
    this.tempTask.status = "Devam Ediyor"
    this.taskService.changeStatus(this.tempTask)
  }
  changeStatusClosed() {
    var date = new Date().toLocaleString()
    this.tempTask.closed = date
    this.tempTask.status = "Kapandı"
    this.taskService.changeStatus(this.tempTask)
  }
  changeStatusOnHold() {
    this.tempTask.closed = ""
    this.tempTask.status = "Beklemede"
    this.taskService.changeStatus(this.tempTask)
  }

  setStatusDesc() {
    this.taskService.setStatusDesc(this.tempTask)
  }

}