import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from "@angular/router"

import { ContactDetailsPageRoutingModule } from './contact-details-routing.module';

import { ContactDetailsPage } from './contact-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContactDetailsPage]
})
export class ContactDetailsPageModule {}
