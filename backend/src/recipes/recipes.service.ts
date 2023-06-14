import { Injectable, NotFoundException } from "@nestjs/common";
import { Recipe } from "./recipe.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class RecipesService {

    constructor(@InjectModel('Recipe') private recipeModel: Model<Recipe>){}

    async getRecipes(page: number, limit: number, search: string, username: string){
        let query = {};
        if(search.trim() !== ''){
            query = {$text: { $search: search}};
        }
        console.log(search);
        const recipes = await this.recipeModel.find({...query, username})
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({name: -1});
        return recipes as Recipe[];
    }
    async getTotalPages(limit: number, search: string, username: string){
        let query = {};
        if(search.trim() !== ''){
            query = {$text: { $search: search}};
        }
        const count = await this.recipeModel.find({...query, username}).countDocuments();
        return Math.ceil(count / limit);
    }
    async getRecipe(id: String){
        let recipe;
        try{
            recipe = await this.recipeModel.findById(id);
        }catch(e){
            throw new NotFoundException('Invalid recipe id');
        }
        if(!recipe){
            throw new NotFoundException('Could not find recipe');
        }
        return recipe as Recipe;
    }

    async addRecipe(recipe: Recipe, username: string){
        const newRecipe = new this.recipeModel({
            name: recipe.name,
            description: recipe.description,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients,
            username
        });
        const res = await newRecipe.save();
        return res as Recipe;
    }
}