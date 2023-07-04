import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserRecipesPageComponent } from './components/user-recipes-page/user-recipes-page.component';
import { NewRecipePageComponent } from './components/new-recipe-page/new-recipe-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecipeDetailPageComponent } from './components/recipe-detail-page/recipe-detail-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'recipes', component: UserRecipesPageComponent, canActivate: [AuthGuard]},
  {path: 'new-recipe', component: NewRecipePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recipe/:id', component: RecipeDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
