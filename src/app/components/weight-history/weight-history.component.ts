import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { registerables } from 'chart.js/auto';
import { WeightService } from '../../services/weight.service';
import { IWeight } from '../../models/weight';
import { PigService } from '../../services/pig.service';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-weight-history',
  templateUrl: './weight-history.component.html',
  styleUrls: ['./weight-history.component.css']
})
export class WeightHistoryComponent implements OnInit {

  weights: IWeight[] = [];
  selectedAnimalTag: string | null = null;
  chart: any;
  animalTags: string[] = [];

  @ViewChild('weightChart', { static: true }) weightChart!: ElementRef;

  constructor(private weightService: WeightService, private pigService: PigService) { }

  ngOnInit(): void {

    Chart.register(...registerables);

    this.pigService.getAllPigTags().subscribe((tags: string[]) => {
      this.animalTags = tags;
      if (this.animalTags.length > 0) {
        this.selectedAnimalTag = this.animalTags[0];
        this.loadWeightHistory(this.selectedAnimalTag);
      }
    });
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.weightChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Peso',
          data: [],
          borderColor: 'blue',
          backgroundColor: 'lightblue',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              parser: 'DD/MM/YYYY',
              tooltipFormat: 'll',
              displayFormats: {
                day: 'DD/MM/YYYY'
              },

            },
          },
          y: {
            title: {
              display: true,
              text: 'Peso (kg)'
            }
          }
        }
      }
    });
  }

  loadWeightHistory(animalTag: string): void {
    this.weightService.getWeightHistory(animalTag).subscribe(weights => {
      this.weights = weights.map(weight => ({
        ...weight,
        weighingDate: new Date(weight.weighingDate).toLocaleDateString('pt-BR')
      }));
      this.updateChart();
    });
  }

  updateChart(): void {
    if (!this.chart) {
      return;
    }

    this.weights.sort((a, b) => {
      return new Date(a.weighingDate).getTime() - new Date(b.weighingDate).getTime();
    });

    const labels = this.weights.map(weight => weight.weighingDate);
    const data = this.weights.map(weight => weight.weight);

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  onAnimalSelectChange(event: MatSelectChange): void {
    this.selectedAnimalTag = event.value;
    if (this.selectedAnimalTag) {
      this.loadWeightHistory(this.selectedAnimalTag);
    }
  }

}
