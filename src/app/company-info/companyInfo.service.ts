import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(private db: AngularFireDatabase) { }

  getCompInfo() {
    return this.db.database.ref('companyInfo')
  }
}
