import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModal } from '../userModal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userModal:any=[]

  SERVER_URL = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  getAllProductsAPI(){
    return this.http.get(`${this.SERVER_URL}/allproducts`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }
}
