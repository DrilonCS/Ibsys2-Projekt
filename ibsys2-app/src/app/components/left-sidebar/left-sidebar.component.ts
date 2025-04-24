import { Component, effect, input, OnInit, output } from '@angular/core';
import { NavigationProgressService } from '../../services/navigation-progress.service';
import { Router } from '@angular/router';

@Component({
	standalone: false,
	selector: 'app-left-sidebar',
	templateUrl: './left-sidebar.component.html',
	styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent implements OnInit {
	currentProgressIndex = 0;

	isLeftSidebarCollapsed = input.required<boolean>();
	changeIsLeftSidebarCollapsed = output<boolean>();

	items = [
		{
			routeLink: 'xml-upload',
			icon: 'fal fa-home',
			label: 'XML-Datei hochladen',
			requiresUpload: true,
			steps: 0,
		},
		{
			routeLink: 'produktionsprogramm',
			icon: 'fal fa-industry',
			label: 'Produktionprogramm',
			steps: 1,
		},
		{
			routeLink: 'materialplanung',
			icon: 'fal fa-cubes',
			label: 'Materialplanung',
			steps: 2,
		},
		{
			routeLink: 'kapazitaetsplanung',
			icon: 'fal fa-chart-line',
			label: 'Kapazitätsplanung',
			steps: 3,
		},
		{
			routeLink: 'beschaffungsplanung',
			icon: 'fal fa-truck-loading',
			label: 'Beschaffungsplanung',
			steps: 4,
		},
		{
			routeLink: 'produktionsplanung',
			icon: 'fal fa-project-diagram',
			label: 'Produktionsplanung',
			steps: 5,
		},
		{
			routeLink: 'ergebnisse',
			icon: 'fal fa-clipboard-check',
			label: 'Ergebnisse',
			steps: 6,
		},
	];

	constructor(
		private readonly navigationProgressService: NavigationProgressService,
		private router: Router
	) {
		effect(() => {
			const accessibleRoutes = this.navigationProgressService.accessibleRoutes();
			this.currentProgressIndex = accessibleRoutes.length - 1;
		});
	}

	ngOnInit(): void {
		this.currentProgressIndex = this.navigationProgressService.getCurrentProgressIndex();
	}

	isItemAccessible(item: any): boolean {
		if (item.routeLink === 'xml-upload') {
			return true;
		}
		return item.steps <= this.currentProgressIndex;
	}

	toggleCollapse(): void {
		this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
	}

	closeSidenav(): void {
		this.changeIsLeftSidebarCollapsed.emit(true);
	}

	navigateToPreviousStep(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();

		const currentIndex = this.navigationProgressService.getCurrentProgressIndex();
		if (currentIndex > 0) {
			const previousRoute = this.items[currentIndex - 1].routeLink;
			this.router.navigate([`/${previousRoute}`]);
		}
	}

	navigateToNextStep(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();

		const currentIndex = this.navigationProgressService.getCurrentProgressIndex();
		if (currentIndex < this.items.length - 1 && this.isItemAccessible(this.items[currentIndex + 1])) {
			const nextRoute = this.items[currentIndex + 1].routeLink;
			this.router.navigate([`/${nextRoute}`]);
		}
	}

	navigateToRoute(item: any, event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();

		if (this.isItemAccessible(item)) {
			this.router.navigate([`/${item.routeLink}`]);
		}
	}
}
