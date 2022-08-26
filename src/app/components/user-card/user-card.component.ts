import { Component, Input, OnInit } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "Deseas borrar al usuario " + this.myUser.first_name+"?",
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        if(pId !== undefined) {
          this.usersService.delete(pId).then(response => {
            if (response.id) {
              Swal.fire('Usuario borrado '+ this.myUser.first_name, '', 'success');
            }else{
              Swal.fire(response.error, '', 'error');
            }
          })
          .catch(err => console.log(err))
        }          
      } 
    })
  } 
}
