import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { StudentCreate } from '../student.create.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  newStudent: StudentCreate = {
    nomeCompleto: '',
    cpf: '',
    dataDeNascimento: '',
    nomeDaMae: '',
    enderecoRua: '',
    enderecoBairro: '',
    enderecoCidade: '',
    enderecoEstado: '',
    enderecoNumero: '',
    serie: '',
    contatoDoResponsavel: ''
  };

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {}

  registerStudent() {
    this.studentService.registerStudent(this.newStudent).subscribe(
      (response) => {
        console.log('Estudante registrado com sucesso:', response);
        this.router.navigate(['/students']);
      },
      (error) => {
        console.error('Erro ao registrar estudante:', error);
      }
    );
  }

  formatPhoneNumber(event: any): void {
    let phoneNumber = event.target.value;

    // Remova caracteres não numéricos
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Aplique a formatação desejada
    if (phoneNumber.length === 11) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (phoneNumber.length === 10) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }

    // Atualize o modelo com o número formatado
    this.newStudent.contatoDoResponsavel = phoneNumber;
  }

  formatCpf(event: any): void {
    let cpf = event.target.value;

    cpf = cpf.replace(/\D/g, '');

    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

    this.newStudent.cpf = cpf;
  }

  formatDate(event: any): void {
    let data = event.target.value;

    data = data.replace(/\D/g, '');

    if (data.length <= 2) {
     
      data = data.replace(/^(\d{2})/, '$1/');
    } else if (data.length <= 4) {
      
      data = data.replace(/^(\d{2})(\d{2})/, '$1/$2/');
    } else {
      
      data = data.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }

    this.newStudent.dataDeNascimento = data;
  }

  goToList() {
    this.router.navigate(['/students']);
  }
}