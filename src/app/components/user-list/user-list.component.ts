import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  arrUsers: User[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.gotoPage()
  }

  async gotoPage(pPage: number = 1): Promise<void> {
    try{
      let response = await this.usersService.getAll(pPage)
      this.currentPage = response.page;
      this.arrUsers = response;
      this.totalPages = response.totalPages;
    } catch(err) {

    }
  }

   
 

}
