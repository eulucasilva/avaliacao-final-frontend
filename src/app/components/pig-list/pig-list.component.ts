import { Component, OnInit } from '@angular/core';
import { PigService } from '../../services/pig.service';
import { ISuino } from '../../models/pig';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PigFormComponent } from '../pig-form/pig-form.component';
import { PigDetailsComponent } from '../pig-details/pig-details.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-piglist',
  templateUrl: './pig-list.component.html',
  styleUrl: './pig-list.component.css'
})
export class PigListComponent implements OnInit {

  displayedColumns: string[] = ['animalTag', 'fatherTag', 'motherTag', 'birthDate', 'departureDate', 'status', 'sex', 'actions'];
  suinos: ISuino[] = [];
  filteredSuinos: ISuino[] = [];
  isLoading: boolean = true;
  dataSource!: MatTableDataSource<ISuino>
  statusFilter: string = 'Todos';
  sexFilter: string = 'Todos';


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
        this.suinos = pigsArray;
        this.filteredSuinos = pigsArray;
        this.dataSource = new MatTableDataSource<ISuino>(this.filteredSuinos);
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

  openDeleteConfirmation(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePig(id);
      }
    });
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

  calculateAgeInMonths(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getMonth() - birth.getMonth() + (12 * (today.getFullYear() - birth.getFullYear()));
    if (today.getDate() < birth.getDate()) {
      age--;
    }
    return age;
  }


  applyFilter(value: string, column: string): void {
    if (!value || value.toLowerCase() === 'todos') {
      this.filteredSuinos = this.suinos;
    } else {
      this.filteredSuinos = this.suinos.filter(suino => {
        if (column === 'birthDate') {
          const ageInMonths = this.calculateAgeInMonths(suino[column]);
          return ageInMonths.toString().includes(value.toLowerCase());
        } else {
          const columnKey = column as keyof ISuino;
          const suinoValue = suino[columnKey];
          if (suinoValue !== undefined && suinoValue !== null) {
            const suinoValueString = suinoValue.toString().toLowerCase();
            return suinoValueString.includes(value.toLowerCase());
          }
          return false;
        }
      });
    }

    this.dataSource = new MatTableDataSource<ISuino>(this.filteredSuinos);
  }




}
