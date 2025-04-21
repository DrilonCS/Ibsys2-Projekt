import { Component, input, output } from '@angular/core';

@Component({
	standalone: false,
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
	isLeftSidebarCollapsed = input.required<boolean>();
	changeIsLeftSidebarCollapsed = output<boolean>();
	items = [
		{ 
			routeLink: 'xml-upload',
			icon: 'fal fa-home',
			label: 'XML-Datei hochladen',
		},
		{ 
			routeLink: 'produktionsprogramm',
			icon: 'fal fa-industry',
			label: 'Produktionprogramm',
		},
		{ 
			routeLink: 'materialplanung',
			icon: 'fal fa-cubes',
			label: 'Materialplanung',
		},
		{ 
			routeLink: 'kapazitaetsplanung',
			icon: 'fal fa-chart-line',
			label: 'Kapazitätsplanung',
		},
		{ 
			routeLink: 'beschaffungsplanung',
			icon: 'fal fa-truck-loading',
			label: 'Beschaffungsplanung',
		},
		{ 
			routeLink: 'produktionsplanung',
			icon: 'fal fa-project-diagram',
			label: 'Produktionsplanung',
		},
		{ 
			routeLink: 'ergebnisse',
			icon: 'fal fa-clipboard-check',
			label: 'Ergebnisse',
		},
	]

	toggleCollapse(): void {
		this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
	}

	closeSidenav(): void {
		this.changeIsLeftSidebarCollapsed.emit(true);
	}
}