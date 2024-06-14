export interface DataSections {
  data: Data
}

export interface Data {
  sections: Section[]
}

export interface Section {
  id: string
  name: string
  baseURL: string
}
