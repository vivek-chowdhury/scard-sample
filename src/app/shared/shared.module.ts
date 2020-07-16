import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class SharedModule {}
