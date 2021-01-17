import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../administrativeServices/company.service';
import { companyModel } from './companyModel';
import { WavesModule, ButtonsModule, CardsModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
  public edit:boolean
  public temp:companyModel = {
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
  constructor(private service:CompanyService) { }

  ngOnInit() {
    this.service.getCompInfo().once('value',snapshot=>{
      this.temp = snapshot.val()
    })
    this.edit=false
  }

  toggleEdit(){
    if(this.edit==false){
      this.edit=true
    }
    else this.edit=false
  }

  updateInfo(){
    this.service.setCompInfo(this.temp)
  }

    toggleMaps(){
      if(this.temp.googleMaps.googleMapsActive == true){
        this.temp.googleMaps.googleMapsActive=false
        this.service.setCompInfo(this.temp)
      }
      else{
        this.temp.googleMaps.googleMapsActive = true
        this.service.setCompInfo(this.temp)
      }
    }
}
