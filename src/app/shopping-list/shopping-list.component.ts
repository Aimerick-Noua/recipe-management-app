import { ShoppingList } from './../models/shopping-list.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { combineLatest, of, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  shoppingList: ShoppingList[] = [];
  total!: number;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

    const totalPrice$ = this.shoppingListService.getShoppingList().pipe(
      switchMap(ingredients => of(this.totalPrice(ingredients)))
    )
    const ingredients$ = this.shoppingListService.getShoppingList();
    combineLatest([ingredients$,totalPrice$]).subscribe({
      next:([ingredient,totalPrice])=>{
        this.shoppingList=ingredient;
        this.total=totalPrice;
      }
    })

  }

  totalPrice(ingredient: any) {
    return ingredient.reduce((acc: any, curr: any) => acc + (curr.unitPrice * curr.quantity), 0)
  }
  onAddItem(item: string) {
    if (!item.length) return;
    this.shoppingListService.onAddItem(item);
  }

  onIncrementQuantity(item: ShoppingList) {
    this.shoppingListService.onIncrementQuantity(item);
  }
  onDecrementQuantity(item: ShoppingList) {

    this.shoppingListService.onDecrementQuantity(item);

  }
}
