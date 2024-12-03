import { ActivatedRoute } from '@angular/router';
import { formatPercent } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {

  addRecipeForm!: FormGroup
  recipeCategory: string[] = []
  id!: string;
  @ViewChild('ingredient') ingredient!: ElementRef;


  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipeCategory = this.recipeService.recipeCategory;
    this.id = this.route.snapshot.params['id'];
    if (!this.id) {
      this.addRecipeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        imageUrl: new FormControl('', Validators.required),
        description: new FormControl(null, [Validators.required, Validators.minLength(20)]),
        category: new FormControl('', Validators.required),
        ingredients: new FormArray([]),
      });
    } else {
      this.recipeService.getRecipeById(this.id).subscribe((recipe) => {
        this.addRecipeForm = new FormGroup({
          name: new FormControl(recipe?.name, Validators.required),
          imageUrl: new FormControl(recipe?.imageUrl, Validators.required),
          description: new FormControl(recipe?.description, [Validators.required, Validators.minLength(20)]),
          category: new FormControl(recipe?.category, Validators.required),
          ingredients: new FormArray(recipe?.ingredients?.map((ing: string) => new FormControl(ing)) || []),
        });
      })
    }

  }
  resetForm(event: Event) {
    event.preventDefault();
    this.addRecipeForm.get('ingredients')?.reset();
    this.addRecipeForm.reset();
  }

  addIngredient(value?: string, $event?: Event) {
    $event?.preventDefault();
    if (value) {
      const ingredientsArray = <FormArray>this.addRecipeForm.get('ingredients');
      ingredientsArray.push(new FormControl(value.trim()));
      this.ingredient.nativeElement.value = '';
    }
  }

  onSubmit() {
    console.log(this.addRecipeForm.value);
    if (!this.id) {
      this.recipeService.addRecipe(this.addRecipeForm.value);
    } else {
      this.recipeService.updateRecipe(this.id, this.addRecipeForm.value);
    }
    this.router.navigate(['/recipes']);
  }

  get ingredients() {
    return (<FormArray>this.addRecipeForm.get('ingredients'));
  }

  removeIngredient(index: number) {
    const ingredientsArray = <FormArray>this.addRecipeForm.get('ingredients');
    ingredientsArray.removeAt(index);
  }

}
