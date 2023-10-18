import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  
  updatedStudent: Student = {} as Student; // Inicialize como uma instância vazia de StudentCreate

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');

    // Carregar detalhes do estudante, se necessário

    // Inicializar o objeto updatedStudent com o ID fornecido
    this.updatedStudent.id = studentId!;
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.updatedStudent.id!, this.updatedStudent)
      .subscribe(
        updatedStudent => {
          console.log('Estudante atualizado com sucesso.');
          this.router.navigate(['/students']);
        },
        error => {
          console.error('Erro ao atualizar estudante:', error);
        }
      );
  }

  formatPhoneNumber(event: any): void {
    let phoneNumber = event.target.value;

    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneNumber.length === 11) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (phoneNumber.length === 10) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }

    this.updatedStudent.contatoDoResponsavel = phoneNumber;
  }

  goToList() {
    this.router.navigate(['/students']);
  }
}