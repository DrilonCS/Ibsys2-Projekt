import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { XMLValidationService } from '../../services/xml-validation.service';
import { NavigationProgressService } from '../../services/navigation-progress.service';

@Component({
	selector: 'app-xmlupload',
	standalone: false,
	templateUrl: './xmlupload.component.html',
	styleUrl: './xmlupload.component.css'
})
export class XMLUploadComponent {
	fileName = signal<string>('');
	fileContent = signal<string>('');
	isUploading = signal<boolean>(false);
	isFileValid = signal<boolean | null>(null);
	errorMessage = signal<string>('');

	constructor(
		private xmlValidationService: XMLValidationService,
		private navigationProgressService: NavigationProgressService,
		private router: Router
	) { }

	onFileSelected(event: any): void {
		const file = event.target.files[0];
		if (file) {
			this.fileName.set(file.name);
			this.isUploading.set(true);
			this.isFileValid.set(null);
			this.errorMessage.set('');

			const reader = new FileReader();

			reader.onload = (e) => {
				const content = e.target?.result as string;
				this.fileContent.set(content);
				this.validateXML(content);
			};

			reader.onerror = () => {
				this.isUploading.set(false);
				this.isFileValid.set(false);
				this.errorMessage.set('Fehler beim Lesen der Datei.');
			};

			reader.readAsText(file);
		}
	}

	validateXML(xmlContent: string): void {
		const isValid = this.xmlValidationService.validateXML(xmlContent);
		this.isFileValid.set(isValid);
		this.isUploading.set(false);

		if (!isValid) {
			const errorMessages = this.xmlValidationService.getValidationErrorMessages();
			this.errorMessage.set(`Die XML-Datei entspricht nich t dem erforderlichen Schema: ${errorMessages.join(', ')}`);
		}
	}

	proceedToNextStep(): void {
		if (this.isFileValid()) {
			this.navigationProgressService.completeCurrentStep();
			this.router.navigate(['produktionsprogramm']);
		}
	}
}
