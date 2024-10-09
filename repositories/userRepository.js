import fs from 'fs-extra'
import User from '../models/userModel.js'

const filePath = './data/users.json'

async function saveUsers(users) {
    try{
        await fs.writeJSON(filePath, users)
    }catch(error){
        console.log(error)
    }
}

async function getUsers() {
    try{
        const data = await fs.readJson(filePath)
        return data.map(user => new User(user.id, user.username, user.password))
    }catch(error){
        console.log(error)
    }
}

export default {
    saveUsers,
    getUsers
}