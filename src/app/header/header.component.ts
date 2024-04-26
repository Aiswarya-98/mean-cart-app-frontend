import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUsername:string=""
  wishlistCount:number=0
  cartlistCount:number=0

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem('existingUser')){
      this.loginUsername=JSON.parse(sessionStorage.getItem("existingUser")||"").username.split()
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistCount=res
      })
      this.api.cartlistCount.subscribe((res:any)=>{
        this.cartlistCount=res
      })
    }else{
      this.loginUsername=""
    }
  }


  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('')
    
  }

}
