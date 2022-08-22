import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = 'https://peticiones.online/api/users/'
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl))
  }
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`))
  }

  create(pUser: User) : Promise<User> {
    /*const httpOptions = {
      headers: new HttpHeaders({
        "Content-typo": "aplication/json",
    })
    }*/
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, pUser))
  }

  delete(pId: number) : Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
  }

  update(pUser: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl} + ${pUser.id}`, pUser))
  }

}



