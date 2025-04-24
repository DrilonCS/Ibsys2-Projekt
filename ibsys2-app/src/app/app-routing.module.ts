import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeschaffungsplanungComponent } from './components/beschaffungsplanung/beschaffungsplanung.component';
import { ErgebnisseComponent } from './components/ergebnisse/ergebnisse.component';
import { MaterialPlanungComponent } from './components/material-planung/material-planung.component';
import { ProduktionsProgrammComponent } from './components/produktions-programm/produktions-programm.component';
import { XMLUploadComponent } from './components/xmlupload/xmlupload.component';
import { KapazitaetsplanungComponent } from './components/kapazitaetsplanung/kapazitaetsplanung.component';
import { ProduktionsplanungComponent } from './components/produktionsplanung/produktionsplanung.component';
import { sequentialRouteGuard } from './components/guards/sequential-route.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'xml-upload',
		pathMatch: 'full'
	},
	{
		path: 'xml-upload',
		component: XMLUploadComponent,
	},
	{
		path: 'produktionsprogramm',
		component: ProduktionsProgrammComponent,
		canActivate: [sequentialRouteGuard]
	},
	{
		path: 'materialplanung',
		component: MaterialPlanungComponent,
	},
	{
		path: 'kapazitaetsplanung',
		component: KapazitaetsplanungComponent,
	},
	{
		path: 'beschaffungsplanung',
		component: BeschaffungsplanungComponent,
	},
	{
		path: 'produktionsplanung',
		component: ProduktionsplanungComponent,
	},
	{
		path: 'ergebnisse',
		component: ErgebnisseComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
