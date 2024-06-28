import type { APIRoute } from "astro";
import DataDB from '../../data/db.json'
import type { DataSections, ControlStudent } from "../../types/db-data";

import crypto from 'node:crypto'
import fs from "node:fs"


export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json()
    const { idStudent, date, isComeStudent }: {idStudent: string, date: string, isComeStudent: boolean } = body

    const dataDB: DataSections = DataDB

    let filePath = ''
    const OS = process.platform

    if (OS === 'win32') {
      filePath = 'src\\data\\db.json'
    } 
    if (OS === 'linux') {
      filePath = 'src/data/db.json'
    }

    const newControlStudent: ControlStudent = {
      id: crypto.randomUUID(),
      idStudent,
      date,
      isComeStudent
    } 

    dataDB.data.controlStudents.push(newControlStudent)

    fs.writeFileSync(filePath, JSON.stringify(dataDB))

    return new Response(JSON.stringify({
      message: 'The control save correctly',
      newControlStudent
    }), { status: 200 })
  }

  return new Response(null, { status: 400 })
}