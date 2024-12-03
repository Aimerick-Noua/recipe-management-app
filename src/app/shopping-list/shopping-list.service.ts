import { BehaviorSubject, Observable } from "rxjs";
import { ShoppingList } from "../models/shopping-list.model";
import { Injectable } from "@angular/core";
 


export class ShoppingListService {

    shoppingList: ShoppingList[] = [
        { id: "1", name: "Milk", quantity: 1,unitPrice: 2.99, price: 2.99 },
        { id: "2", name: "Bread", quantity: 1,unitPrice: 1.99, price: 1.99 },
        { id: "3", name: "Eggs", quantity: 1,unitPrice: 0.99, price: 0.99 },
        { id: "4", name: "Butter", quantity: 1,unitPrice: 1.99, price: 1.99 },
        { id: "5", name: "Cheese", quantity: 1,unitPrice: 1.99, price: 1.99 }
    ];
    itemPrices: any = {
        "Milk": 3.49,
        "Bread": 2.49,
        "Eggs": 3.99,
        "Butter": 4.49,
        "Cheese": 4.99,
        "Rice": 1.20,
        "Potato": 0.89,
        "Onion": 0.99,
        "Black pepper": 2.99,
        "Salt": 0.89,
        "Spaghetti": 1.29,
        "Chicken": 5.49,
        "Pancetta": 6.99,
        "Yogurt": 0.99,
        "Lettuce": 1.49,
        "Tomatoes": 2.49,
        "Garlic": 0.50,
        "Garlic powder": 1.99,
        "Olive oil": 7.99,
        "Tomato sauce": 1.50,
        "Mozzarella cheese": 3.99,
        "Fresh basil": 2.99,
        "Cucumber": 0.99,
        "Red onion": 1.29,
        "Pineapple": 3.99,
        "Avocado": 1.79,
        "Spinach": 2.99,
        "Cilantro": 0.89,
        "Salsa": 3.49,
        "Sour cream": 2.99,
        "Cheddar cheese": 4.99,
        "Bacon": 5.99,
    };

    shopping = new BehaviorSubject<ShoppingList[]>(this.shoppingList);
    totalAmount = new BehaviorSubject<number>(0);
    totalAmountSubject$ = this.totalAmount.asObservable();
    shoppingSubject$ = this.shopping.asObservable();
    total=0;
    constructor() { }

    getShoppingList() {
        return this.shoppingSubject$;
    }

    onAddItem(item: string) {
        let id = crypto.randomUUID().toString()
        let unitPrice = this.itemPrices[item] ?? 1.59;
        let quantity = 1;
        let priceTotal = unitPrice * quantity;
        this.shoppingList.push({ name: item, id: id, unitPrice: unitPrice, price: priceTotal, quantity: quantity });
        this.shopping.next(this.shoppingList);
    }

    onAddToShoppingList(ingredients: string[]) {
        this.shoppingList.push(...ingredients.map((item) => (
            
            { name: item, id: (this.shoppingList.length + 1).toString(), unitPrice: this.itemPrices[item]?? 1.99, price: this.itemPrices[item], quantity: 1 })));
        this.shopping.next(this.shoppingList); // Update the shopping list observable
      }

      onIncrementQuantity(item: ShoppingList) {
        let itemObject = this.shoppingList.find((i) => i.id === item.id);
        if (itemObject) {
          // Increment the quantity
          itemObject.quantity++;
          itemObject.price=itemObject.quantity*itemObject.unitPrice;
          // Recalculate the total for this item
        }
        this.shopping.next(this.shoppingList);
       

      }
      
      onDecrementQuantity(item: ShoppingList) {
        let itemObject = this.shoppingList.find((i) => i.id === item.id);
        if (itemObject) {
          // Decrement the quantity only if it is greater than 1
          if (itemObject.quantity > 1) {
            itemObject.quantity--;
          }
          itemObject.price = itemObject.price/itemObject.quantity
          this.shopping.next(this.shoppingList);
        }
      }
      
      
}