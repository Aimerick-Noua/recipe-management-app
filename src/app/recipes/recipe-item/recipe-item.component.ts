import { RecipeService } from '../recipe.service';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Recipes } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe!: Recipes;


  constructor(private recipeService: RecipeService) { }
  isShort = false;
  // isFavorite = false;
  showShortenDescription() {
    if (this.isShort) {
      this.isShort = false
    } else {
      this.isShort = true
    }
  }

  toggleFavorite() {
    this.recipeService.updateRecipePreference(this.recipe.id, !this.recipe.isFavorite)
  }
}
