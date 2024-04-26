import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})



export class AllProductsComponent implements OnInit {

  allProducts:any=[]

  constructor(private api:ApiService, private toaster:ToastrService){}

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.api.getAllProductsAPI().subscribe({
      next:(res:any)=>{
        this.allProducts = res
        console.log(this.allProducts);
        
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
      
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){

      // proceed to api
      this.api.addWishlistAPI(product).subscribe({
        next:(res:any)=>{
          alert(`Product ${res.title} has added to wishlist`)
          this.api.getWishListCount()
        },
        error:(reason:any)=>{
          console.log(reason);
          alert(reason.error)
          
        }
      })

    }else{
      this.toaster.warning("Please login")
    }
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
