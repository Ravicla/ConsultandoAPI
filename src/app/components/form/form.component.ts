import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', [])
    }, [])
  }
  async getDataForm() : Promise<void>{
    let newUser = this.userForm.value;
    //newUser.id=200;
      console.log(newUser);
      if(newUser.id){
        let response = await this.usersServices.update(newUser);
        console.log(response)

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
          username: new FormControl(user?.username, []),
          email: new FormControl(user?.email, []),
          image: new FormControl(user?.image, []),
          id: new FormControl(user?.id, [])
        }, [])
      }
    })
  }

}
