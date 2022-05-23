import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/account';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  edit(id: string){
    this.router.navigate(['/product-form'],{queryParams: {id: id}})
  }

}
