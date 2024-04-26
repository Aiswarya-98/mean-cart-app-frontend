import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  allProducts:any=[]
  cartlistCount:number=0
  cartAmount:any=0
 

 

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getcartList()
    this.api.cartlistCount.subscribe((res:any)=>{
      this.cartlistCount=res
      console.log(res);
      
    })


  }

  getcartList(){
    this.api.getCartListAPI().subscribe((res:any)=>{
      this.allProducts=res
      console.log(this.allProducts);
      this.api.getCartListCount()
      
      for(const price of this.allProducts){
        this.cartAmount=this.cartAmount+price.price
      }
      
    })
  }


  removeCartItem(id:any){
    this.api.removeCartListAPI(id).subscribe((res:any)=>{
      this.getcartList()
    })
  }

  

 



}
