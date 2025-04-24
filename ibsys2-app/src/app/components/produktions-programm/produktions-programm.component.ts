import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ForecastData, InputDataService} from '../../services/input-data.service';
import {Router} from '@angular/router';
import {NavigationProgressService} from '../../services/navigation-progress.service';

@Component({
  selector: 'app-produktions-programm',
  standalone: false,
  templateUrl: './produktions-programm.component.html',
  styleUrl: './produktions-programm.component.css'
})
export class ProduktionsProgrammComponent implements OnInit {
  forecastForm!: FormGroup;
  forecastData: ForecastData = {p1: 0, p2: 0, p3: 0};

  products = [
    {key: 'p1', label: 'Kinderrad'},
    {key: 'p2', label: 'Damenrad'},
    {key: 'p3', label: 'Herrenrad'},
  ];

  constructor(
    private fb: FormBuilder,
    private inputService: InputDataService,
    private router: Router,
    private navigationProgressService: NavigationProgressService
  ) {
  }

  ngOnInit(): void {
    this.forecastForm = this.fb.group({});
    for (let p of this.products) {
      for (let i = 1; i <= 4; i++) {
        this.forecastForm.addControl(`verkauf_${p.key}_p${i}`, this.fb.control(0));
        this.forecastForm.addControl(`produktion_${p.key}_p${i}`, this.fb.control(0));
      }
      this.forecastForm.addControl(`dir_betrag_${p.key}`, this.fb.control(0));
      this.forecastForm.addControl(`dir_preis_${p.key}`, this.fb.control(0));
      this.forecastForm.addControl(`dir_strafe_${p.key}`, this.fb.control(0));
    }

    this.inputService.getForecast().subscribe((data) => {
      this.forecastData = data;
      for (let p of this.products) {
        this.forecastForm.patchValue({
          [`verkauf_${p.key}_p1`]: data[p.key as keyof ForecastData],
          [`produktion_${p.key}_p1`]: data[p.key as keyof ForecastData]
        });
      }
    });
  }

  getTotal(period: number): number {
    return this.products.reduce((sum, p) => {
      return sum + Number(this.forecastForm.get(`produktion_${p.key}_p${period}`)?.value || 0);
    }, 0);
  }

  saveAndNavigate(): void {
    // Here you would typically save the form data
    // For example: this.inputService.saveForecast(this.forecastForm.value);

    // Complete the current step to enable the next step
    this.navigationProgressService.completeCurrentStep();

    // Navigate to materialplanung
    this.router.navigate(['/materialplanung']);
  }
}
