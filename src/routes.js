
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method:'GET',
        path: buildRoutePath('/tasks'),
        handler: (req,res)=>{
            const tasks = database.select('tasks')

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method:'POST',
        path: buildRoutePath('/tasks'),
        handler:(req , res)=>{
            const { title , description} = req.body
             const task = {
                id: randomUUID(),
                title ,
                description, 
                completed_at: null, 
                created_at: Date.now(), 
                updated_at: null
            }
        
        if(title && description){
            database.insert('tasks', task) 
            return res.writeHead(201).end()  
        } else{
            return res.writeHead(404).end()
        }
        
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
          const { id } = req.params
          const { title, description } = req.body
          
    
          database.update('tasks', id, title,description, Date.now())
    
          return res.writeHead(204).end()
        }
      },
      {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
          const { id } = req.params
          
    
          database.updateStatus('tasks', id, Date.now())
    
          return res.writeHead(204).end()
        }
      },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('tasks', id)
      
            return res.writeHead(204).end()
        }
      }
]