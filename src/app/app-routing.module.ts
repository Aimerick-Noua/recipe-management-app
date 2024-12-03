import { NgModule, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AddRecipeComponent } from "./recipes/add-recipe/add-recipe.component";
import { FavoritesComponent } from "./recipes/favorites/favorites.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { Recipes } from "./models/recipe.model";
import { RecipeService } from "./recipes/recipe.service";


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipes/:id', component: RecipeDetailsComponent },
    { path: 'add-recipe', component: AddRecipeComponent },
    { path: 'update-recipe/:id', component: AddRecipeComponent },
    { path: 'favorite-recipe', component: FavoritesComponent },
    { path: 'shopping-list', component: ShoppingListComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {


}   