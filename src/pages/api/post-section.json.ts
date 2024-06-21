import type { APIRoute } from "astro"
import DataDB from '../../data/db.json'

import fs from "node:fs"
import crypto from 'node:crypto'
import type { DataSections, Section } from "../../types/db-data"

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json()
    const name = String(body.name)

    const dataDB:DataSections = DataDB
    
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

    const newSeccition:Section  = {
      id: crypto.randomUUID(),
      name,
      baseURL
    }

    dataDB.data.sections.push(newSeccition)

    fs.writeFileSync(filePath, JSON.stringify(dataDB))

    return new Response(JSON.stringify({
      message: 'The section save correctly',
      newSeccition
    }), { status: 200 })
  }

  return new Response(null, { status: 400 })
}