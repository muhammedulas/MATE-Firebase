export class companyModel{
    shortName!:string;
    title!:string;
    phone!:string;
    fax!:string;
    mail!:string;
    adress!: {
        country: string;
        province: string;
        district: string;
        openAdress: string;
        postalCode: string;
    }
    googleMaps?:{
        googleMapAPIKey?:string;
        googleMapsActive?:boolean;
        lat?:number;
        lng?:number;
    }
}