import { Component, OnInit } from '@angular/core';
import { companyModel } from '../administration/company-information/companyModel';
import { CompanyInfoService } from './companyInfo.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  private bounds=null
  public info:companyModel = {
    shortName!:"",
    title!:"",
    phone!:"",
    fax!:"",
    mail!:"",
    adress!: {
        country: "",
        province: "",
        district: "",
        openAdress: "",
        postalCode: "",
    },
    googleMaps:{
      googleMapAPIKey:"",
      googleMapsActive:false,
      lat:0,
      lng:0
    }
  }
  
  constructor(private service:CompanyInfoService,) {}

  ngOnInit() {
    this.service.getCompInfo().once('value',snap=>{
      this.info = snap.val()
      console.log(snap.val())
    })
  }

}
