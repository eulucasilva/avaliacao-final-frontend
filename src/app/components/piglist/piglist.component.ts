import { Component, OnInit } from '@angular/core';
import { PigService } from '../../services/pig.service';
import { ISuino } from '../../models/pig';
import { MatDialog } from '@angular/material/dialog';
import { PigformComponent } from '../pigform/pigform.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-piglist',
  templateUrl: './piglist.component.html',
  styleUrl: './piglist.component.css'
})
export class PiglistComponent implements OnInit {

  displayedColumns: string[] = ['animalTag', 'fatherTag', 'motherTag', 'birthDate', 'departureDate', 'status', 'sex', 'actions'];
  suinos: ISuino[] = [];

  constructor(private suinoService: PigService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPigs();
    this.suinoService.getPigListUpdated().subscribe(() => {
      this.loadPigs();
    });
  }

  loadPigs(): void {
    this.suinoService.getAllPigs().subscribe(pigs => {
      if (pigs) {
        const pigsArray = Object.values(pigs); // Convertendo o objeto para um array de valores
        console.log(pigsArray);
        this.suinos = pigsArray;
      } else {
        console.log('Nenhum suíno encontrado.');
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PigformComponent, {
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
      const dialogRef = this.dialog.open(PigformComponent, {
        width: '800px',
        data: { action: 'edit', pigIndex: pigIndex, pig: suino }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Modal fechado');
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
