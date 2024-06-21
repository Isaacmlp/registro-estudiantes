export interface DataSections {
  data: Data
}

export interface Data {
  sections: Section[]
  students: Student[]
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
