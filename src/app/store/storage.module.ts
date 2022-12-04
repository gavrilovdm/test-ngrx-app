import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '.';
import { CustomerEffects } from './effects/customer.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ CustomerEffects]),
  ],
  exports: [StoreModule]
})
export class StorageModule { }
