import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipes } from '../models/recipe.model';
import { Subscription, pipe, filter } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit, OnDestroy {


  private subscription!: Subscription;
  selectedOption = 'all';
  constructor(private recipesService: RecipeService) { }

  recipeCategory: string[] = [];
  recipesData: Recipes[] = [];
  filteredRecipes: Recipes[] = [];

  ngOnInit(): void {
    this.subscription = this.recipesService.getRecipes().subscribe((recipes) => {
      this.recipesData = recipes;
      this.filteredRecipes = recipes;
    })
    this.recipeCategory = this.recipesService.recipeCategory;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSearchTermChange(searchTerm: string) {
    this.filteredRecipes = this.recipesData.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  toggleFavorite(name: string) {
    // this.recipesData=this.recipesService.getRecipes().map((recipe)=>recipe.name===name?{...recipe,isFavorite:!recipe.isFavorite}:recipe);
    this.recipesData = this.recipesData.map((recipe) => recipe.name === name ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe);
  }
}
