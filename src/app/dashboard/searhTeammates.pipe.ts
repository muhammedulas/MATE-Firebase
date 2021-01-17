import { Pipe, PipeTransform } from '@angular/core';
import { userModel } from '../models/userModel';

@Pipe({
  name: 'searhTeammates'
})
export class SearhTeammatesPipe implements PipeTransform {

  transform(users:userModel[],searchValue:string): userModel[] {

    if (!users || !searchValue){
      return users
    }
    else{
    return users.filter(user=>
      user.displayName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.mail.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.phone.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.authLevel.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
    }
  }
}
