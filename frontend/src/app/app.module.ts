import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRecipesPageComponent } from './components/user-recipes-page/user-recipes-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipesFiltersComponent } from './components/recipes-filters/recipes-filters.component';
import { NewRecipePageComponent } from './components/new-recipe-page/new-recipe-page.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecipeDetailPageComponent } from './components/recipe-detail-page/recipe-detail-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRecipesPageComponent,
    HomePageComponent,
    TopNavComponent,
    RecipesListComponent,
    RecipesFiltersComponent,
    NewRecipePageComponent,
    RecipeFormComponent,
    PaginatorComponent,
    LoginComponent,
    RegisterComponent,
    RecipeDetailPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
