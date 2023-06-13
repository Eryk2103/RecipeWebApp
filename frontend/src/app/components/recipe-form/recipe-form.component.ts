import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

  recipeForm = this.fb.group({
    name: [''],
    description: [''],
    instruction: [''],
    ingredient: this.fb.group({
      name: [''],
      amount: ['']
    })
  });
  instructions: string[] = [];
  ingredients: Ingredient[] = [];

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router){}

  onSubmit(){
    const recipe = <Recipe>{
      name: this.recipeForm.get('name')?.value ?? '',
      description: this.recipeForm.get('description')?.value ?? '',
      instructions: this.instructions,
      ingredients: this.ingredients
    };
    this.recipeService.addRecipe(recipe).subscribe( (res) => {
      this.router.navigateByUrl('/recipes');
    });
  }

  addInstruction(){
    const instruction = this.recipeForm.get('instruction')?.value;
    console.log(instruction)
    if(instruction){
      this.instructions.push(instruction);
    }
    this.recipeForm.get('instruction')?.setValue('');
  }
  addIngredient(){
    const name = this.recipeForm.get('ingredient.name')?.value;
    const amount = this.recipeForm.get('ingredient.amount')?.value;
    if(name && amount){
      this.ingredients.push({name, amount })
    }
    this.recipeForm.get('ingredient.name')?.setValue('');
    this.recipeForm.get('ingredient.amount')?.setValue('');
  }
  removeInstruction(index: number){
    this.instructions.splice(index, 1);
  }
  removeIngredient(index: number){
    this.ingredients.splice(index, 1);
  }
}
