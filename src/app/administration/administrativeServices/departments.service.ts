import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { departmentModel } from '../../models/departmentModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  public depToAdd: departmentModel
  private dbDeps = '/departments'
  depsRef: AngularFireList<departmentModel>
  constructor(private db: AngularFireDatabase) { this.depsRef = db.list(this.dbDeps) }

  createDepartment(dep) {
    var kayit_key = this.depsRef.push(dep).key
    console.log(kayit_key + " created")
    dep.department_key = kayit_key
    this.depsRef.update(kayit_key, dep)
  }

  getDeps() {
    return this.depsRef
  }

  deleteDep(dep_key) {
    this.depsRef.remove(dep_key)

  }

  updateDep(dep: departmentModel) {
    // this.db.database.ref().update(updates)
    this.depsRef.update(dep.department_key, dep)
  }
}
