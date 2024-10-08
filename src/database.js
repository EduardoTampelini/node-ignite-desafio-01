import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)


export class Database {
    #database = {}
    constructor() {
        fs.readFile(databasePath, 'utf8')
          .then(data => {
            this.#database = JSON.parse(data)
          })
          .catch(() => {
            this.#persist()
          })
      }
    
      #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
      }
    select(table) {
      const data = this.#database[table] ?? []
  
      return data
    }
  
    insert(table, data) {
      if (Array.isArray(this.#database[table])) {
        this.#database[table].push(data)
      } else {
        this.#database[table] = [data]
      }

      this.#persist()
  
      return data
    }
    update(table, id, title, description, updated_at) {
      const rowIndex = this.#database[table].findIndex(row => row.id === id)
  
      if (rowIndex > -1) {
        if(title){
          this.#database[table][rowIndex].title = title
        }
        if(description){
          this.#database[table][rowIndex].description = description
        }
        this.#database[table][rowIndex].updated_at = updated_at
        this.#persist()
      }
    }
    updateStatus(table, id,completed_at){
      const rowIndex = this.#database[table].findIndex(row => row.id === id)
      if (rowIndex > -1) {
        this.#database[table][rowIndex].completed_at = completed_at
        this.#persist()
      }
    }
    
    delete(table, id) {
      const rowIndex = this.#database[table].findIndex(row => row.id === id)
  
      if (rowIndex > -1) {
        this.#database[table].splice(rowIndex, 1)
        this.#persist()
      }
    }
  }