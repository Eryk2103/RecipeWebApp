import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.model";

@Controller('recipes')
export class RecipesController {

    constructor(private recipesService: RecipesService){}

    @Get()
    async getRecipes(@Query('page') pageParam, @Query('search') searchParam){
        const limit = 2;
        const page = Number(pageParam);
        const res = await this.recipesService.getRecipes(page, limit, searchParam);
        const totalPages = await this.recipesService.getTotalPages(limit, searchParam);
        return {totalPages, currentPage: page, data: res};
    }
    @Get(':id')
    async getRecipe(@Param('id') id: string){
        const res = await this.recipesService.getRecipe(id);
        return res;
    }
    @Post()
    async addRecipe(@Body() body: Recipe){
        const res = await this.recipesService.addRecipe(body);
        return res;
    }

}