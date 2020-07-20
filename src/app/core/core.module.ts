import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { headerReducer } from './header/state/header.reducer';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forFeature('header', headerReducer),
  ],
  exports: [HeaderComponent, BrowserModule, HttpClientModule],
})
export class CoreModule {}
