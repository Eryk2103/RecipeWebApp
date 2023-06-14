import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
    name: String,
    amount: String
})

export const RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    instructions: [String],
    ingredients: [IngredientSchema],
    username: String
}).index({
    name: 'text'
})

export interface Recipe{
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
};

export interface Ingredient{
    id: number
    name: string;
    amount: string;
};
