import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  selectedSerie: string = '1'; // Valor padrão
  expandedStudentId: number | null = null;
    
  constructor(private studentService: StudentService, private router: Router ) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadStudents();
  }

  loadStudents() {
    console.log('loadStudents called');
    this.studentService.getAllStudents().subscribe(
      (data: any) => {
        this.students = data;
        console.log('Students loaded successfully:', this.students);
      },
      (error) => {
        console.error('Error fetching students:', error);
        // Lógica adicional para tratar erros
      }
    );
  }

  deleteStudent(studentId: string): void {
    // Use o serviço para deletar o estudante
    this.studentService.deleteStudent(studentId)
      .subscribe(
        () => {
          console.log('Estudante deletado com sucesso.');
          // Recarregue a lista após a exclusão, se necessário
          this.loadStudents();
        },
        error => {
          console.error('Erro ao deletar estudante:', error);
        }
      );
  }

  editStudent(id: string) {
    this.router.navigate(['/students', id, 'edit']);
  }

  goToFilter() {
    this.router.navigate(['/students/filter'], { queryParams: { serie: this.selectedSerie } });
  }

  goToRegister() {
    // Adicione a navegação para a rota de registro aqui
    this.router.navigate(['/students/new']);
  }

  toggleDetails(studentId: number): void {
    if (this.expandedStudentId === studentId) {
      this.expandedStudentId = null; // Oculta as informações detalhadas se já estiverem expandidas
    } else {
      this.expandedStudentId = studentId; // Exibe as informações detalhadas do aluno clicado
    }
  }
}