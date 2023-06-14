import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    name: ['',{ validators: [Validators.required] }],
    description: ['',{ validators: [Validators.required] }],
    instruction: [''],
    ingredient: this.fb.group({
      name: [''],
      amount: ['']
    })
  });
  instructions: string[] = [];
  ingredients: Ingredient[] = [];

  error: string | null = null;

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router){}

  validate(){
    if(this.recipeForm.get('name')?.invalid){
      this.error = 'Name is required';
      return false
    }
    if(this.recipeForm.get('description')?.invalid){
      this.error = 'Description is required';
      return false
    }
    if(this.instructions.length === 0){
      this.error = 'You must add at least one instruction';
      return false
    }
    if(this.ingredients.length === 0){
      this.error = 'You must add at least one ingredient';
      return false
    }
    
    return true;
  }
  closeError(){
    this.error = null;
  }
  onSubmit(){
    if(!this.validate()){
      
      return;
    }
    const recipe = <Recipe>{
      name: this.recipeForm.get('name')?.value ?? '',
      description: this.recipeForm.get('description')?.value ?? '',
      instructions: this.instructions,
      ingredients: this.ingredients
    };
    this.recipeService.addRecipe(recipe).subscribe( (res) => {
      this.router.navigateByUrl('/recipes');
    }, e => {
      if(e.status === 401){
        this.router.navigateByUrl('/login');
      }
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
