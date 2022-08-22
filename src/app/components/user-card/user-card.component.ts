import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  
  @Input()myUser!: User;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  deleteUser(pId: number | undefined): void {
    let result = confirm("Deseas borrar al usuario " + this.myUser.first_name+"?");
    if(result){
      if(pId !== undefined) {
        this.usersService.delete(pId).then(response => {
          if (response != null) {
            alert('Usuario borrado')
          }
        })
        .catch(err => console.log(err))
      }
    }
  } 
}
