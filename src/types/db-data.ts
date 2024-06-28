export interface DataSections {
  data: Data
}

export interface Data {
  sections: Section[]
  students: Student[]
  controlStudents: ControlStudent[]
}

export interface Section {
  id: string
  name: string
  baseURL: string
}

export interface Student {
  id: string
  idSection: string
  name: string
  baseURL: string
}

export interface ControlStudent {
  id: string
  idStudent: string
  date: string
  isComeStudent: boolean
}
