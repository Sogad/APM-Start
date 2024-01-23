import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";


@Component({
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
    errorMessage: string = 'Error';
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string = '';
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    sub!: Subscription;

  constructor(private productService: ProductService){}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
    console.log('listfilter:' + this.listFilter)
    this.filteredProducts = this.performFilter(this.listFilter);
  }

  performFilter(filterBy: string) : IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(this.listFilter));
  }


  onRatingClicked(message:string): void {
    console.log(message);
  }

  ngOnInit(): void {
      console.log('Bjr');
      this.productService.getProducts().subscribe({
        next: products => { 
                          this.products = products;
                          this.filteredProducts = this.products;
                          },
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    console.log('Unsubscribe');
    
  }
}