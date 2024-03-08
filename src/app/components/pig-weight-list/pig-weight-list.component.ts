import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeightService } from '../../services/weight.service';
import { IWeight } from '../../models/weight';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PigWeightRegistrationComponent } from '../pig-weight-registration/pig-weight-registration.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-pig-weight-list',
  templateUrl: './pig-weight-list.component.html',
  styleUrls: ['./pig-weight-list.component.css']
})
export class PigWeightListComponent implements OnInit {

  weights: IWeight[] = [];
  displayedColumns: string[] = ['animalTag', 'weighingDate', 'weight', 'actions'];
  isLoading = true;

  constructor(private weightService: WeightService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.loadWeights();
    this.weightService.getWeightListUpdated().subscribe(() => {
      this.loadWeights();
    });
  }

  loadWeights(): void {
    this.weightService.getAllWeights().subscribe(weights => {
      if (weights) {
        const weightsArray = Object.values(weights);
        console.log(weightsArray);
        this.weights = weightsArray;
      } else {
        console.log('Nenhum histórico de peso encontrado.');
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PigWeightRegistrationComponent, {
      width: '800px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('Modal fechado');
    });
  }

  openEditDialog(weightId: string): void {
    const weight = this.weights.find(w => w.id === weightId);
    if (weight) {
      const weightIndex = this.weights.indexOf(weight);
      const dialogRef = this.dialog.open(PigWeightRegistrationComponent, {
        width: '800px',
        data: { action: 'edit', weightIndex: weightIndex, weight: weight }
      });

      dialogRef.afterClosed().subscribe(result => {
        //console.log('Modal fechado');
      });
    }
  }

  openDeleteConfirmation(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePig(id);
      }
    });
  }

  deletePig(id: string): void {
    this.weightService.deleteWeight(id).subscribe(() => {
      this.showNotification("Peso excluído com sucesso")
      this.loadWeights();
    });
  }


  showNotification(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, // 3 segundos
    });
  }


}
