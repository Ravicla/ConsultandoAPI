import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  myUser: User | any;
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params: any) => {
      let id: number = parseInt(params.iduser)
      let response = await this.usersService.getById(id);
      console.log(response);
      if(response.error){
        alert(response.error)
      }      
      this.myUser = response;
    })
  }
  deleteUser(pId: number | undefined): void {
    let result = confirm("Deseas borrar al usuario "+ this.myUser.first_name+"?");
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
