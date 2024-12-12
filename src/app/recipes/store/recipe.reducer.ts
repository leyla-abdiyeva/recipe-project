import {Recipe} from "../recipe.model";
import * as RecipesActions from './recipe.actions'

export interface State {
  recipes: Recipe[];
}


const initialState: State = {
  // @ts-ignore
  recipe: []
}

export function recipeReducer(
  state = initialState, action: RecipesActions.RecipesActions
) {
  // @ts-ignore
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]// this will pull out all the elements from the recipes we are getting and add these recipes here, to this recipe array of the new state
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    // @ts-ignore
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipes = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };

      const updatedRecipe = [...state.recipes];
      // @ts-ignore
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })// filter will always return a new list, so we don't mutate the old list
      }

    default:
      return state;
  }
}

