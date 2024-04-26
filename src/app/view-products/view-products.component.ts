import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  product:any={}

  constructor(private route:ActivatedRoute, private api:ApiService,private toaster:ToastrService){}


  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} = res
      this.getProduct(id)
    })
  }

  getProduct(pid:any){
    this.api.viewProductAPI(pid).subscribe((res:any)=>{
      this.product=res;
      console.log(this.product);
      
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
