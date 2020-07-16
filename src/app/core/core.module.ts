import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule],
  exports: [HeaderComponent, BrowserModule, HttpClientModule],
})
export class CoreModule {}
