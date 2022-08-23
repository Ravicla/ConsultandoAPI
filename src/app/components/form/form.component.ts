import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

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
        Validators.minLength(3)
      ]),

      last_name: new FormControl('', [
      ]),

      email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),

      image: new FormControl('', [ 
      ])

    }, [])
  }

  async getDataForm() : Promise<void>{

    if(this.userForm.valid) {
    } else {
      alert ('el formulario no esta bien relleno')
    }



    let newUser = this.userForm.value;
      if(newUser.id){
        let response = await this.usersServices.update(newUser);
        if(response.id) {
          alert('Usuario actualizado')
          this.router.navigate(['/home']);
        }else{
          alert(response.error);
          this.router.navigate(['/home']);
        }  
      } else {
      let response = await this.usersServices.create(newUser)
      console.log(response)
      if(response.id) {
        this.router.navigate(['/home'])
      } else {
        alert('hubo un herror');
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

}
