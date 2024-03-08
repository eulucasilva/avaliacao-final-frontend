import { Component, OnInit } from '@angular/core';
import { PigService } from '../../services/pig.service';
import { ISuino } from '../../models/pig';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PigFormComponent } from '../pig-form/pig-form.component';
import { PigDetailsComponent } from '../pig-details/pig-details.component';

@Component({
  selector: 'app-piglist',
  templateUrl: './pig-list.component.html',
  styleUrl: './pig-list.component.css'
})
export class PigListComponent implements OnInit {

  displayedColumns: string[] = ['animalTag', 'fatherTag', 'motherTag', 'birthDate', 'departureDate', 'status', 'sex', 'actions'];
  suinos: ISuino[] = [];
  isLoading: boolean = true;

  constructor(private suinoService: PigService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.loadPigs();
    this.suinoService.getPigListUpdated().subscribe(() => {
      this.loadPigs();
    });
  }

  loadPigs(): void {
    this.suinoService.getAllPigs().subscribe(pigs => {
      if (pigs) {
        const pigsArray = Object.values(pigs);
        console.log(pigsArray);
        this.suinos = pigsArray;
      } else {
        console.log('Nenhum suíno encontrado.');
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PigFormComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fechado');
    });
  }

  openEditDialog(pigId: string): void {
    const suino = this.suinos.find(s => s.id === pigId);
    if (suino) {
      const pigIndex = this.suinos.indexOf(suino);
      const dialogRef = this.dialog.open(PigFormComponent, {
        width: '800px',
        data: { action: 'edit', pigIndex: pigIndex, pig: suino }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Modal fechado');
      });
    }
  }

  openDeleteConfirmation(pigId: string): void {
    const suino = this.suinos.find(s => s.id === pigId);
    if (suino) {
      const pigIndex = this.suinos.indexOf(suino);
      const dialogRef = this.dialog.open(PigFormComponent, {
        width: '800px',
        data: { pigIndex: pigIndex, pig: suino }
      });

      dialogRef.afterClosed().subscribe(result => {
        //console.log('Modal fechado');
      });
    }
  }

  openDetails(pigId: string): void {
    const suino = this.suinos.find(s => s.id === pigId);
    if (suino) {
      const pigIndex = this.suinos.indexOf(suino);
      const dialogRef = this.dialog.open(PigDetailsComponent, {
        width: '600px',
        data: { pigIndex: pigIndex, pig: suino }
      });

      dialogRef.afterClosed().subscribe(result => {
        //console.log('Modal fechado');
      });
    }
  }

  deletePig(id: string): void {
    this.suinoService.deletePig(id).subscribe(() => {
      this.showNotification("Suíno excluído com sucesso")
      this.loadPigs(); // Atualiza a lista após a exclusão
    });
  }


  showNotification(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, // 3 segundos
    });
  }

}
