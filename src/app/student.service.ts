import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';
import { StudentCreate } from './student.create.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8088/api/students';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/find`);
  }

  getStudentsBySerie(serie: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/find/${serie}`);
  }

  registerStudent(student: StudentCreate): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/register`, student);
  }

  updateStudent(id: string, updateStudent: StudentCreate): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/update/${id}`, updateStudent);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}