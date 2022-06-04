// import { Component, OnInit } from '@angular/core';
// import {Transaction } from '../models/transaction';
// import { TransactionService } from '../services/transaction.service';

// @Component({
//   selector: 'app-category-form',
//   templateUrl: './category-form.component.html',
//   styleUrls: ['./category-form.component.css']
// })
// export class CategoryFormComponent implements OnInit {

//   categories: Transaction[] = [];

//   newCategoryTitle: string = ''

//   constructor(private categoryService: TransactionService) { }

//   async ngOnInit(): Promise<void> {
//     this.categories = await this.categoryService.getTransactions();
//   }

//   async createCategory(){
//     const newCategory = await this.categoryService.createTransaction({
//       id: null || 0, 
//       title: this.newCategoryTitle
//     });

//     this.categories.push(newCategory)
//   }

//   async deleteCategory(id: number){
//     await this.categoryService.delete(id);
//     this.categories = await this.categoryService.getCategories();
//   }


// }
