import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainComponent } from './main/main.component';
import { XMLUploadComponent } from './xmlupload/xmlupload.component';
import { ProduktionsProgrammComponent } from './produktions-programm/produktions-programm.component';
import { MaterialPlanungComponent } from './material-planung/material-planung.component';
import { KapazitaetsplanungComponent } from './kapazitaetsplanung/kapazitaetsplanung.component';
import { BeschaffungsplanungComponent } from './beschaffungsplanung/beschaffungsplanung.component';
import { ProduktionsplanungComponent } from './produktionsplanung/produktionsplanung.component';
import { ErgebnisseComponent } from './ergebnisse/ergebnisse.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    MainComponent,
    XMLUploadComponent,
    ProduktionsProgrammComponent,
    MaterialPlanungComponent,
    KapazitaetsplanungComponent,
    BeschaffungsplanungComponent,
    ProduktionsplanungComponent,
    ErgebnisseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
