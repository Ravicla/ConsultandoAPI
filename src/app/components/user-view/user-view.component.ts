import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
        Swal.fire(response.error, '', 'error');
      }      
      this.myUser = response;
    })
  }
  
  deleteUser(pId: number | undefined): void {
    Swal.fire({
      title: "Deseas borrar al usuario "+ this.myUser.first_name+"?",
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) { 
        if(pId !== undefined) { 
          this.usersService.delete(pId).then(response => {
            if (response != null) {
              Swal.fire(
              'OK!',
              'Usuario borrado',
              'success')
            }
          })
          .catch(err => console.log(err))
        }       
      }
    })      
  } 
}

