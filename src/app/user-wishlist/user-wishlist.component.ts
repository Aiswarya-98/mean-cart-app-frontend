import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit {

  allProducts:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getWishListAPI().subscribe((res:any)=>{
      this.allProducts=res
      console.log(this.allProducts);
      this.api.getWishListCount()
      
    })
  }

  removeItem(id:any){
    this.api.removeWishListAPI(id).subscribe((res:any)=>{
      this.getWishlist()
    })
  }

  addToCart(product:any){

    if(sessionStorage.getItem("token")){
      this.api.addcartlistAPI(product).subscribe({
        next:(res:any)=>{
          alert(`product ${res.title} has been added to cart`)
          this.api.getCartListCount()
        },
        error:(reason:any)=>{
          console.log(reason);
          alert(reason.error)
          
        }
      })

    }else{
      alert("Please login")
    }

  }
}
