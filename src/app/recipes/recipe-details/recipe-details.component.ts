import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipes } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";


@Component({
    selector: 'app-recipe-details',
    template: `
    <div class="p-4 mb-3">

        <div class="flex justify-end">
            <button (click)="updateRecipe()" class="text-green-600 bg-gray-200 font-bold py-2 px-4 rounded mr-4">Update</button>
            <button (click)="deleteRecipe()" class="text-white bg-red-500 font-bold py-2 px-4 rounded">Delete</button>
    </div>
    <div class="h-[500px] w-full md:flex md:items-center gap-4">
        <h1 class="text-2xl pt-4 pb-2">Recipe Details</h1>
        <div class="md:w-1/2 image-container ">
            <img [src]="recipe?.imageUrl" alt="" class="recipe-image rounded-xl">
       </div>
       <div class="md:w-1/2 space-y-4">
        <h2 class="text-3xl font-medium pt-6 pb-2">{{recipe?.name}}</h2>
        <div>
            <h3 class="text-xl font-medium space-y-2 mb-2">Ingredients</h3>
            <ul>
                <li class="ml-4 inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2" *ngFor="let ingredient of recipe?.ingredients">> {{ingredient}}</li>
               
            </ul>
        </div>
        <div>
            <h3 class="text-xl font-medium space-y-2 mb-2">Description</h3>
          <p class="ml-4 max-w-md">{{recipe?.description}}</p>
        </div>
        <div>
            <h3 class="text-xl font-medium space-y-2 mb-2">Category</h3>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-4 mb-2" [ngClass]="{'text-red-400':recipe?.category==='Italian','text-green-600':recipe?.category==='Mexican','text-blue-600':recipe?.category==='Indian','text-gray-400':recipe?.category!=='Italian' && recipe?.category!=='Mexican' && recipe?.category!=='Indian'}">{{recipe?.category}}</span>
            </div>
            <div>
                <h3 class="text-xl font-medium space-y-2 mb-2">Created On</h3>
                <p class="ml-4">{{recipe?.createdOn|date:'medium'}}</p>
            </div>
        </div>
          
    </div>
    </div>
    `,
})
export class RecipeDetailsComponent {


    recipe: Recipes | undefined

    constructor(private route: ActivatedRoute, private recipeService: RecipeService,private router:Router) { }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.recipeService.getRecipeById(params['id']).subscribe((recipe) => {
                this.recipe = recipe;
            });
        });
    }

    updateRecipe() {
        this.router.navigate(['/update-recipe', this.recipe?.id]);
    }
    deleteRecipe() {
        const confirmation = confirm('Are you sure you want to delete this recipe?');
        if (!confirmation) return;
        this.recipeService.deleteRecipe(this.recipe?.id || '');
        this.router.navigate(['/recipes']);
    }
    backToRecipeList() {
        throw new Error('Method not implemented.');
    }
}