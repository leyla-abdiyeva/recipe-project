import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  // @ts-ignore
  id: number;
  editMode = false;
  // @ts-ignore
  recipeForm: FormGroup;

  // @ts-ignore
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipesActions.UpdateRecipe({
        index: this.id,
        newRecipe: this.recipeForm.value
      }))
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipe(
        this.recipeForm.value)
      )
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {
        // @ts-ignore
        recipeName = recipe.name;
        // @ts-ignore
        recipeImagePath = recipe.imagePath;
        // @ts-ignore
        recipeDescription = recipe.description;
        // @ts-ignore
        if (recipe['ingredients']) {
          // @ts-ignore
          for (let ingredient of recipe.ingredients) {

            recipeIngredients.push(
              // @ts-ignore
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      })
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
