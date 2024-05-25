import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { team } from 'team' ; 

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  setLoggedInUserName(name: any) {
    throw new Error('Method not implemented.');
  }
  loggedInUserName: string = '';
  private user: any;
  constructor (private http:HttpClient) {}
  getportfolio ()
  {
    return this.http.get<team[]>('http://localhost:3000/team')
  }



}
