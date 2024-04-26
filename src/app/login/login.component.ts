import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // email: string = ''; // Property to bind to the email input field
  // password: string = ''; // Property to bind to the password input field

  // constructor() {}


  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })
  constructor(private toaster:ToastrService,private fb:FormBuilder, private api:ApiService, private router:Router) {}


  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password

      const user = {email,password}
      this.api.loginAPI(user).subscribe({
        next:(res:any)=>{

          // alert(`${res.existingUser.username} logged in successfully`)
          this.toaster.success(`${res.existingUser.username} logged in successfully!`)
          sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
          sessionStorage.setItem("token",res.token)
          this.api.getWishListCount()
          this.loginForm.reset()
          this.router.navigateByUrl("")
        },error:(reason:any)=>{
          // alert(reason.error)
          this.toaster.warning(reason.error)
        }
      })
    }else{
      // alert("Invalid email or password")
      this.toaster.warning("Invalid email or password!!")
    }
  }
}
