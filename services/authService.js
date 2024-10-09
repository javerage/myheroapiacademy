import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userRepository from '../repositories/userRepository.js'

const secretKey = 'M1_Cl4v3_Ultr4_53cr3t4' // save in environment variable
const saltRounds = 18

async function register(username, password){
    const users = await userRepository.getUsers()
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = {id : (users.length + 1), username, password : hashedPassword}
    
    users.push(newUser)
    await userRepository.saveUsers(users)

    return newUser
}

async function login(username, password) {
    const users = await userRepository.getUsers()
    const user = users.find(u => username === u.username)
    
    if(!user) throw new Error('Invalid access credential')
    
    const isMatch = bcrypt.compare(password, user.password)
    
    if(!isMatch) throw new Error('Invalid access credential')
    
    const token = jwt.sign({id: user.id, username : user.username}, secretKey, {expiresIn: '1h'})
    return token
}

export default {
    register,
    login
}

// agregar en la practica
// npm install bcrypt
// npm install jsonwebtoken