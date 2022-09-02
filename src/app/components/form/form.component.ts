import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2' 
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userForm: FormGroup
  type: string = 'Registrar';
  constructor(
    private usersServices: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
    this.userForm = new FormGroup({

      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),

      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),

      email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),

      image: new FormControl('', [ 
        Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ])
    }, [])
  }

  async getDataForm() : Promise<void>{
    if(this.userForm.valid) { } 
    else {
      Swal.fire(
      'Informacion!',
      'El formulario no esta bien relleno',
      'info');
    }
    
    let newUser = this.userForm.value;  
    if(newUser.id) {
      let response = await this.usersServices.update(newUser);
      if(response.id) {
        Swal.fire(
          'OK!',
          'Usuario actualizado',
          'success')
          .then((result) => {
            this.router.navigate(['/home']);
        });          
      } 
      else {
        Swal.fire(
          'Error!',
          response.error,
          'error')
          .then((result) => {
            this.router.navigate(['/home']);
        });
      }  
    } 
    else {
      let response = await this.usersServices.create(newUser)
      if(response.id) {
        Swal.fire(
          'OK!',
          'Usuario creado',
          'success')
          .then((result) => {
            this.router.navigate(['/home']);
        });
      } 
      else {
        Swal.fire(
          'Error!',
          'Hubo un error',
          'error')
          .then((result) => {
            this.router.navigate(['/home']);
        });
      }   
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params: any) => {
      let id: number = parseInt(params.iduser);
      if(id){
        this.type = 'Actualizar'
        const response = await this.usersServices.getById(id)
        const user: User = response
        this.userForm = new FormGroup({
          first_name: new FormControl(user?.first_name, []),
          last_name: new FormControl(user?.last_name, []),
          email: new FormControl(user?.email, []),
          image: new FormControl(user?.image, []),
          id: new FormControl(user?.id, [])
        }, [])
      }
    })
  }

  checkControl(pControlName: string, pError: string): boolean{
    if(this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched){
      return true;
    } 
    else {
      return false;
    }
  }

}
