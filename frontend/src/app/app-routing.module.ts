import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserRecipesPageComponent } from './components/user-recipes-page/user-recipes-page.component';
import { NewRecipePageComponent } from './components/new-recipe-page/new-recipe-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'recipes', component: UserRecipesPageComponent},
  {path: 'new-recipe', component: NewRecipePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
