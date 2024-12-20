import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from "@ngrx/store";

import {Ingredient} from '../shared/ingredient.model';
import {LoggingService} from "../logging.service";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // @ts-ignore
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // @ts-ignore
  private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit')
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
