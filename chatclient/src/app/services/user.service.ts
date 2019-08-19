import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient) { }

  register(user: User) : Observable<any>{
    return this.http.post<any>(environment.APP_URL+'user/auth/register', user);
  }
  login(user: User)  : Observable<any>{
    return this.http.post<any>(environment.APP_URL+'user/auth/login', user)
  }          
  edit(user: User) : Observable<any> {
    return this.http.put<any>(environment.APP_URL+'user/edit', user);
  }
  getUser()  : Observable<any> {
    return this.http.get<any>(environment.APP_URL+'user/getUser');
  }
  getUserList()  : Observable<any> {
    return this.http.get<any>(environment.APP_URL+'user/getAllUsers');
  }
  notOnline(user: User) : Observable<any> {
    return this.http.put<any>(environment.APP_URL+'user/auth/notOnline', user);
  }
  uploadImage(image: File) : Observable<any> {
    console.log(image);
    const uploadData = new FormData();
    uploadData.append('myFile', image, image.name);  
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    let options = {headers:headers};
    console.log(uploadData);
    console.log(headers);
    return this.http.post<any>(environment.APP_URL+'user/uploadImage', uploadData, options);
  }
}