import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.css']
})
export class StudentFilterComponent implements OnInit {
  allStudents: Student[] = [];
  filteredStudents: any[] = [];
  selectedSerie: string = '1';
  expandedStudentId: number | null = null;

  @Output() filterChanged: EventEmitter<Student[]> = new EventEmitter<Student[]>();

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtém o valor do parâmetro 'serie' da rota
    this.route.queryParams.subscribe(params => {
      this.selectedSerie = params['serie'] || '1';
      this.filterStudents(this.selectedSerie);
    });
  }

  filterStudents(serie: string) {
    this.studentService.getStudentsBySerie(serie).subscribe(
      (filteredStudents: Student[]) => {
        this.filteredStudents = filteredStudents;
        this.filterChanged.emit(this.filteredStudents);
      },
      (error) => {
        console.error('Erro ao filtrar estudantes:', error);
      }
    );
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.filterStudents(this.selectedSerie); // Atualizar a lista após a exclusão
      },
      (error) => {
        console.error('Error deleting student:', error);
        // Lógica adicional para tratar erros
      }
    );
  }

  editStudent(id: string) {
    this.router.navigate(['/students', id, 'edit']);
  }

  goToList() {
    this.router.navigate(['/students']);
  }

  toggleDetails(studentId: number): void {
    if (this.expandedStudentId === studentId) {
      this.expandedStudentId = null; // Oculta as informações detalhadas se já estiverem expandidas
    } else {
      this.expandedStudentId = studentId; // Exibe as informações detalhadas do aluno clicado
    }
  }
}