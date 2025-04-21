import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationProgressService {
	private readonly ROUTE_SEQUENCE = [
    'xml-upload',
    'produktionsprogramm',
    'materialplanung',
    'kapazitaetsplanung',
    'beschaffungsplanung',
    'produktionsplanung',
    'ergebnisse'
  ];

	private currentProgressIndex = signal<number>(0);
	
	public accessibleRoutes = computed(() => {
    const maxIndex = this.currentProgressIndex();
    return this.ROUTE_SEQUENCE.filter((_, index) => index <= maxIndex);
  });

  constructor() { }

	public isRouteAccessible(routePath: string): boolean {
    const routeIndex = this.ROUTE_SEQUENCE.indexOf(routePath);
    return routeIndex <= this.currentProgressIndex();
  }

	public setProgress(routePath: string): void {
    const routeIndex = this.ROUTE_SEQUENCE.indexOf(routePath);
    if (routeIndex >= 0 && routeIndex <= this.ROUTE_SEQUENCE.length - 1) {
      this.currentProgressIndex.set(routeIndex);
    }
  }

	public getNextRoutePath(): string | null {
    const nextIndex = this.currentProgressIndex() + 1;
    return nextIndex < this.ROUTE_SEQUENCE.length ? 
      this.ROUTE_SEQUENCE[nextIndex] : null;
  }

  public getCurrentProgressIndex(): number {
    return this.currentProgressIndex();
  }

	public completeCurrentStep(): void {
		const currentIndex = this.currentProgressIndex();
		if (currentIndex < this.ROUTE_SEQUENCE.length - 1) {
			this.currentProgressIndex.set(currentIndex + 1);
		}
	}
}