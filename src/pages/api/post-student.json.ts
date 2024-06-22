import type { APIRoute } from 'astro'
import DataDB from '../../data/db.json'

import fs from 'node:fs'
import crypto from 'node:crypto'
import type { DataSections, Student } from '../../types/db-data'

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json()
    const { name, idSection } = body

    const dataDB: DataSections = DataDB

    let filePath = ''
    const OS = process.platform

    if (OS === 'win32') {
      filePath = 'src\\data\\db.json'
    } 
    if (OS === 'linux') {
      filePath = 'src/data/db.json'
    }

    const nameArray = name.split(' ')
    const baseURL = nameArray.join('-')

    const newStudent: Student = {
      id: crypto.randomUUID(),
      idSection,
      name,
      baseURL
    }

    dataDB.data.students.push(newStudent)
    fs.writeFileSync(filePath, JSON.stringify(dataDB))

    return new Response(JSON.stringify({
      message: 'The student save correctly',
      newStudent
    }), { status: 200 })
  }

  return new Response(null, { status: 400 })
}