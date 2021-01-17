import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private db:AngularFireDatabase) { }

  setCompInfo(data){
    this.db.database.ref('companyInfo').set(data)
  }

  getCompInfo(){
    return this.db.database.ref('companyInfo')
  }

}
