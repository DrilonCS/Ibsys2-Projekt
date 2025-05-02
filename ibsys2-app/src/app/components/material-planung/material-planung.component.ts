import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ForecastData, InputDataService, MaterialRequirement, PRODUCT_COMPONENTS } from '../../services/input-data.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationProgressService } from '../../services/navigation-progress.service';

@Component({
  selector: 'app-material-planung',
  standalone: false,
  templateUrl: './material-planung.component.html',
  styleUrl: './material-planung.component.css'
})
export class MaterialPlanungComponent implements OnInit {
  forecastData: ForecastData = { p1: 0, p2: 0, p3: 0 };
  materialRequirements: { [key: string]: MaterialRequirement[] } = {};
  materialForm: FormGroup;
  activeTab: string = 'p1';
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  products = [
    { key: 'p1', label: 'Kinderrad' },
    { key: 'p2', label: 'Damenrad' },
    { key: 'p3', label: 'Herrenrad' },
  ];

  constructor(
    private inputService: InputDataService,
    private fb: FormBuilder,
    private router: Router,
    private navigationProgressService: NavigationProgressService
  ) {
    this.materialForm = this.fb.group({
      p1: this.fb.array([]),
      p2: this.fb.array([]),
      p3: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.inputService.getForecast().subscribe({
      next: (forecast) => {
        this.forecastData = forecast;

        // Create an array of observables for each product's material requirements
        const requirementsObservables = this.products.map(product =>
          this.inputService.calculateMaterialRequirements(
            product.key,
            forecast[product.key as keyof ForecastData]
          )
        );

        // Wait for all observables to complete
        forkJoin(requirementsObservables).subscribe({
          next: (results) => {
            // Store the results in the materialRequirements object
            this.products.forEach((product, index) => {
              this.materialRequirements[product.key] = results[index];

              // Initialize form controls for each component
              const formArray = this.materialForm.get(product.key) as FormArray;
              formArray.clear(); // Clear existing controls

              results[index].forEach(requirement => {
                formArray.push(this.fb.group({
                  id: [requirement.id],
                  safetyStock: [requirement.safetyStock]
                }));
              });
            });

            this.isLoading = false;
          },
          error: (err) => {
            this.handleError(err);
          }
        });
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  // Get the form array for the active tab
  getFormArray(): FormArray {
    return this.materialForm.get(this.activeTab) as FormArray;
  }

  // Update the safety stock value in the material requirements
  updateSafetyStock(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const safetyStock = Number(value);

    if (!isNaN(safetyStock)) {
      // Update the material requirement
      this.materialRequirements[this.activeTab][index].safetyStock = safetyStock;

      // Recalculate the requirement
      const requirement = this.materialRequirements[this.activeTab][index];
      requirement.calculatedRequirement = Math.max(0,
        requirement.productionOrder +
        requirement.previousQueue +
        safetyStock -
        requirement.warehouseStock -
        requirement.currentQueue -
        requirement.workInProgress
      );
    }
  }

  // Save and navigate to the next step
  saveAndNavigate(): void {
    // Here you would typically save the form data if needed

    // Complete the current step to enable the next step
    this.navigationProgressService.completeCurrentStep();

    // Navigate to kapazitaetsplanung
    this.router.navigate(['/kapazitaetsplanung']);
  }

  handleError(error: any): void {
    console.error('Error loading material planning data:', error);
    this.isLoading = false;
    this.hasError = true;
    this.errorMessage = 'Fehler beim Laden der Materialplanungsdaten. Bitte versuchen Sie es später erneut.';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getComponentsForProduct(productKey: string): string[] {
    return PRODUCT_COMPONENTS[productKey as keyof typeof PRODUCT_COMPONENTS] || [];
  }

  // Helper method to check if a value is negative
  isNegative(value: number): boolean {
    return value < 0;
  }
}
