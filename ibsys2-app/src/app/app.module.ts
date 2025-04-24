import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MainComponent } from './components/main/main.component';
import { XMLUploadComponent } from './components/xmlupload/xmlupload.component';
import { ProduktionsProgrammComponent } from './components/produktions-programm/produktions-programm.component';
import { MaterialPlanungComponent } from './components/material-planung/material-planung.component';
import { KapazitaetsplanungComponent } from './components/kapazitaetsplanung/kapazitaetsplanung.component';
import { BeschaffungsplanungComponent } from './components/beschaffungsplanung/beschaffungsplanung.component';
import { ProduktionsplanungComponent } from './components/produktionsplanung/produktionsplanung.component';
import { ErgebnisseComponent } from './components/ergebnisse/ergebnisse.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

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
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
