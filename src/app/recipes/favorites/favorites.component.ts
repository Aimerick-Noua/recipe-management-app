import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { Recipes } from "../../models/recipe.model";

@Component({
    selector: 'app-favorites',
    template: `
    <h1 class="text-3xl text-center text-gray-500">Favorite Recipes</h1>
    <div class="flex items-center justify-center h-[70vh]" *ngIf="!favorites.length">
        <div  class="text-xl bg-green-100 p-10 rounded-md">No favorite recipes yet</div>
    </div>
    <div class=" w-full row-auto flex flex-wrap gap-2 overflow-y-scroll ">
        <app-recipe-item *ngFor="let recipe of favorites" [recipe]="recipe"></app-recipe-item>
    </div>    `
})
export class FavoritesComponent implements OnInit {

    favorites: Recipes[] = []
    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.recipeService.getRecipes().subscribe(
            recipes => {
                this.favorites = recipes.filter(recipe => recipe.isFavorite);
            }
        );
    }
}