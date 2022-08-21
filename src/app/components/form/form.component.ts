import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userForm: FormGroup
  constructor() { 
    this.userForm = new FormGroup({
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', [])
    }, [])
  }
  getDataForm() : void{
    console.log(this.userForm)

  }

  ngOnInit(): void {
  }

}
