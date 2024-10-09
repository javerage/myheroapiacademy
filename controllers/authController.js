import express from "express";
import { check, validationResult } from "express-validator";
import authService from "../services/authService.js";

const router = express.Router()

router.post('/register', [
    check('username').not().isEmpty().withMessage('El nombre de usaurio es requerido'),
    check('password').isLength({min : 8 }).withMessage('El password debe ser de almenos 8 caracteres')
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    try{
        const {username, password} = req.body
        const newUser = await authService.register(username, password)
        res.status(201).json(newUser)
    }catch(error){
        res.status(500).json({error : error.message})
    }
})

router.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body
        const token = await authService.login(username, password)
        res.json({token})
    }catch(error){
        res.status(500).json({error : error.message})
    }
})

export default router