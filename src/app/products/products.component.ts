import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: [] =[];

  public productList : any ;

  public searchTerm !: string;

  public filterCategory : any

  searchKey:string ="";

  constructor(private api : ApiService,private cartService : CartService) { }



  ngOnInit(): void {

    this.api.getProduct()

    .subscribe(res=>{

      this.productList = res;

      this.filterCategory = res;

      this.productList.forEach((a:any) =>{

        if(a.category ==="women's clothing" || a.category ==="men's clothing"){

          a.category='fashion'

        }

        Object.assign(a,{quantity:1,total:a.price});

      })

    });

    this.cartService.search.subscribe((val:any)=>{

      this.searchKey = val;

    })

   

  }
  search(event:any){



    this.searchTerm = (event.target as HTMLInputElement).value;



    console.log(this.searchTerm);



    this.cartService.search.next(this.searchTerm);



  }




addtocart(item: any){

  this.cartService.addtoCart(item);

 }

 filter(category:string){



  this.filterCategory = this.productList



  .filter((a:any)=>{



    if(a.category == category || category==''){



      return a;



    }



  })



}





}
 