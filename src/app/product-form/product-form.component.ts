// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Category } from '../models/transaction';
// import { User } from '../models/user';
// import { CategoryService } from '../services/category.service';
// import { ProductService } from '../services/product.service';
// import { UserService } from '../services/user.service';

// @Component({
//   selector: 'app-product-form',
//   templateUrl: './product-form.component.html',
//   styleUrls: ['./product-form.component.css']
// })
// export class ProductFormComponent implements OnInit {

//   productForm: FormGroup = this.formBuilder.group({
//     id: [],
//     title: [''],
//     description: [''],
//     price: [0, Validators.min(1)],
//     imgUrl: ['https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png', Validators.pattern(/^http/)],
//     brand: [''],
//     categories: [],
//     uploader: []
//   });

//   users: User[] = [];
//   categories: Category[] = [];

//   constructor(
//     private productService: ProductService,
//     private categoryService: CategoryService,
//     private userService: UserService,
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private activatedRoute: ActivatedRoute) { }

//   async ngOnInit(): Promise<void> {
//     this.users = await this.userService.getUsers();
    
//     const id = this.activatedRoute.snapshot.queryParams.id;

//     if (id) {
//       const product = await this.productService.get(id);
//       this.productForm.setValue(product);
//     }
//     this.categories = await this.categoryService.getCategories();

//   }
//   get f(): { [key: string]: AbstractControl } {
//     return this.productForm.controls;
//   }

//   async addProduct() {
//     const product = this.productForm.value;
//     await this.productService.addproduct(product);
//     this.router.navigateByUrl('');
//   }

//   compareUsers(user1: User, user2: User): boolean {
//     return user1 && user2 && user1.id === user2.id
//   }

//   compareCats(cat1: Category, cat2: Category): boolean {
//     return cat1 && cat2 && cat1.id === cat2.id
//   }
// }
