import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private  recipes: Recipe[] = [
        new Recipe('A test Recipe',
         'This is simply a test',
        'http://maxpixel.freegreatpicture.com/static/photo/2x/Food-Dishes-Eat-Gastronomy-Lunch-Recipe-2760200.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Fries', 20)
        ]),
        new Recipe('Another test Recipe',
         'This is simply another test',
        'http://maxpixel.freegreatpicture.com/static/photo/2x/Food-Dishes-Eat-Gastronomy-Lunch-Recipe-2760200.jpg',  
        [
            new Ingredient('Meat', 1),
            new Ingredient('Buns', 2)
        ])
    ];

    constructor(private slServie: ShoppingListService) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slServie.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
