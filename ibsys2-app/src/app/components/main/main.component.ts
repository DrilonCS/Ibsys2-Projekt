import { Component, computed, input } from '@angular/core';

@Component({
	standalone: false,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
	isLeftSidebarCollapsed = input.required<boolean>();
	screenWidth = input.required<number>();
	sizeClass = computed(() => {
		const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
		if (isLeftSidebarCollapsed) {
			return '';
		}
		return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
	})
}
