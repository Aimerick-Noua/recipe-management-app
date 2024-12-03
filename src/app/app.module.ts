import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { ShortenTextPipe } from "./pipes/shorten-text.pipe";
import { SearchComponent } from './recipes/search/search.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { FavoritesComponent } from "./recipes/favorites/favorites.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { ShortenIngredientPipe } from "./pipes/shorten-ingredient.pipe";
import { CapitalizePipe } from "./pipes/capitalize.pipe";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { LoaderComponent } from "./utilities/loader.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        RecipesComponent,
        HomeComponent,
        RecipeItemComponent,
        ShortenTextPipe,
        SearchComponent,
        AddRecipeComponent,
        FavoritesComponent,
        RecipeDetailsComponent,
        FilterPipe,
        ShortenIngredientPipe,
        CapitalizePipe,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers:[ {
        provide: ShoppingListService,
        useFactory: () => new ShoppingListService(),
        deps: [],
      },],
    bootstrap: [AppComponent],
})
export class AppModule {

}