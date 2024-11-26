import { Injectable } from '@angular/core';
import { Recipes } from '../models/recipe.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {



  constructor() { }

  private recipeData: Recipes[] = [
    new Recipes(
      this.generateUUID(),
      'Spaghetti Carbonara',
      'Italian',
      'https://i.notrefamille.com/1800x0/smart/2020/11/26/52098-large.jpg',
      ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Garlic', 'Black pepper'],
      new Date('2024-11-15'),
      'A classic Roman pasta dish made with creamy egg-based sauce, crispy pancetta, and parmesan cheese.',
      false
    ),
    new Recipes(
      this.generateUUID(),
      'Chicken Tikka Masala',
      'Indian',
      'https://th.bing.com/th/id/OIP.AJZRy9KsqA4wT1lGU2z7dwHaFz?w=571&h=447&rs=1&pid=ImgDetMain',
      ['Chicken', 'Yogurt', 'Tomatoes', 'Cream', 'Garam Masala', 'Ginger', 'Garlic'],
      new Date('2024-11-10'),
      'A creamy, spiced curry dish with tender chicken pieces cooked in a rich tomato-based sauce.',
      false
    ),
    new Recipes(
      this.generateUUID(),
      'Classic Margherita Pizza',
      'Italian',
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
      ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Fresh basil', 'Olive oil'],
      new Date('2024-11-12'),
      'A simple and iconic pizza with a crispy crust, fresh mozzarella, tomato sauce, and basil leaves.',
      false
    ),
    new Recipes(
      this.generateUUID(),
      'Beef Tacos',
      'Mexican',
      'https://static.vecteezy.com/system/resources/previews/026/853/394/non_2x/shawarma-sandwich-created-with-generative-ai-photo.jpg',
      ['Ground beef', 'Taco shells', 'Cheddar cheese', 'Lettuce', 'Tomatoes', 'Taco seasoning'],
      new Date('2024-11-17'),
      'A vibrant Mexican dish featuring seasoned ground beef, fresh veggies, and cheese served in crispy taco shells.',
      false
    ),
    new Recipes(
      this.generateUUID(),
      'Greek Salad',
      'Mediterranean',
      'https://img.freepik.com/premium-photo/greek-salad-white-background_969751-315.jpg',
      ['Cucumber', 'Tomatoes', 'Feta cheese', 'Red onion', 'Kalamata olives', 'Olive oil', 'Oregano'],
      new Date('2024-11-05'),
      'A refreshing salad packed with crisp vegetables, tangy feta cheese, olives, and a drizzle of olive oil.',
      false
    ),
    new Recipes(
      this.generateUUID(),
      'Hamburger',
      'Mediterranean',
      'https://www.dvo.com/newsletter/weekly/2014/05-09-115/w_images/hamburgers.jpg',
      ['Salade', 'Tomatoes', 'Meat', 'Red onion', 'Kalamata olives', 'Ketchup', 'Bread'],
      new Date('2024-11-05'),
      'Hamburger is a popular fast food dish consisting of a patty of ground beef, often served in a bun.',
      false
    )
  ];
  private todoSubject = new BehaviorSubject<Recipes[]>(this.recipeData);
  recipe$: Observable<Recipes[]> = this.todoSubject.asObservable();

   generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
  getRecipes(): Observable<Recipes[]> {
    return this.recipe$;
  }

  addRecipe(recipe: Recipes) {
    this.recipeData.push({ ...recipe, createdOn: new Date() });
    this.todoSubject.next(this.recipeData);
  }

  updateRecipe(id: string, value: any) {
    const index = this.recipeData.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.recipeData[index] = { ...this.recipeData[index], ...value };
      this.todoSubject.next(this.recipeData);
    }
    
  }

  deleteRecipe(id: string) {
    const index = this.recipeData.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.recipeData.splice(index, 1);
      this.todoSubject.next(this.recipeData);
    }
  }

  updateRecipePreference(id: string, isFavorite: boolean) {
    // const index = this.recipeData.findIndex((r) => r.name === recipe.name);
    // if (index !== -1) {
    //   this.recipeData[index].isFavorite = isFavorite;
    //   this.todoSubject.next(this.recipeData);
    // }

    const recipe = this.recipeData.find((r) => r.id === id);
    if (recipe) {
      recipe.isFavorite = isFavorite;
      this.todoSubject.next(this.recipeData);
    }
  }

  getRecipeById(id: string): Observable<Recipes | undefined> {
    return this.recipe$.pipe(
      map((recipes) => recipes.find((recipe) => recipe.id === id))
    );
  }
}
