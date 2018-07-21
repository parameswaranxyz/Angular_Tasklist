import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _url_signup:string = " /api/createUser";
  _url_login:string = " /api/userLogin";
  _url_logout:string = " /api/userLogout";
  
  constructor(private http:HttpClient) { }
 
  signup(username,password){
    return this.http.post(this._url_signup,JSON.stringify({"username": username,"password":password}));
  }

  login(username,password){
    return this.http.post(this._url_login,JSON.stringify({"username": username,"password":password}));
  }

  logout(username,password){
    return this.http.post(this._url_logout,JSON.stringify({"username": username,"password":password}));
  }
}