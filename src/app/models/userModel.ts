export class userModel {
    mail!: string;
    password?: string;
    uid!: string;
    displayName!: string;
    additionalInfo!: string;
    firstName!: string;
    lastName!: string;
    phone!: string;
    adress!: {
        country: string;
        province: string;
        district: string;
        openAdress: string;
        postalCode: string;
    }
    authLevel!: string;
    key: string;
    team_key!: string;
    team_name!: string;
    role!: string

}