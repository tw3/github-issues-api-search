import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';

const importsAndExports = [
  BrowserModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...importsAndExports,
  ],
  exports: [
    ...importsAndExports
  ]
})
export class SharedModule {
}
