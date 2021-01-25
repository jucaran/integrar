import { gql } from "apollo-server-express";

// Admin
export default gql`
  type Query {
    admin: String
    teachers(dni: Int, _id: ID): [Teacher]
    students(dni: Int, _id: ID): [Student]
    courses(_id: ID): [Course]
    grades(_id: ID): [Grade]
    subjects(_id: ID): [Subject]
  }

  type Mutation {

    createAdmin(input: AdminInput): Admin
    editAdmin(_id: ID, input: AdminInput): Admin
    deleteAdmin(_id: ID): Admin

    createTeacher(input: TeacherInput): Teacher
    editTeacher(_id: ID, input: TeacherInput): Teacher
    deleteTeacher(_id: ID): Teacher

    createStudent(input: StudentInput): Student
    editStudent(_id: ID, input: StudentInput): Student
    deleteStudent(_id: ID): Student

    createGrade(input: GradeInput): Grade
    editGrade(_id: ID, input: GradeInput): Grade
    deleteGrade(_id: ID): Grade

    createCourse(input: CourseInput): Course
    editCourse(_id: ID, input: CourseInput): Course
    deleteCourse(_id: ID): Course

    createSubject(input: SubjectInput): Subject
    editSubject(_id: ID, input: SubjectInput): Subject
    deleteSubject(_id: ID): Subject
  }

  # ---------------------------
  type Admin {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    grades: [Grade]
    courses: [Course]
    teachers: [Teacher]
    subjects: [Subject]
    students: [Student]
  }
  input AdminInput {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    grades: [GradeInput]
    courses: [CourseInput]
    teachers: [TeacherInput]
    subjects: [SubjectInput]
    students: [StudentInput]
  }

  # ---------------------------
  type Teacher {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    pictureure: String
    grades: [Grade]
    courses: [Course]
    subjects: [Subject]
    students: [Student]
  }
  input TeacherInput {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    subjects: [SubjectInput]
  }

  # ---------------------------
  type Student {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    courses: [Course]
    grades: [Grade]
    teachers: [Teacher]
    subjects: [Subject]
  }
  input StudentInput {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
  }

  # ---------------------------
  type Grade {
    _id: ID
    name: String
    courses: [Course]
  }
  input GradeInput {
    _id: ID
    name: String
    courses: [CourseInput]
  }

  # ---------------------------
  type Course {
    _id: ID
    name: String
    grades: [Grade]
  }
  input CourseInput {
    _id: ID
    name: String
    grades: [GradeInput]
  }

  # ---------------------------
  type Subject {
    _id: ID
    name: String
    teachers: [Teacher]
  }
  input SubjectInput {
    _id: ID
    name: String
    teachers: [TeacherInput]
  }
`;