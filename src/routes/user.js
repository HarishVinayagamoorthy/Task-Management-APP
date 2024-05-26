import express from 'express'
import UserController from '../controllers/userController.js'
import Auth from '../common/auth.js'
const router = express.Router()


router.post('/signup',UserController.create)

router.post('/signin',UserController.login)

router.post ('/resetpassword',UserController.resetpassword)
router.post('/reset-password',UserController.passwordtoken)
router.get('/getall-Employee',Auth.adminGaurd,UserController.getAllUsers)
router.delete('/delete-Employee/:id',Auth.adminGaurd,UserController.deleteUser)
router.put('/edit/:email',Auth.adminGaurd,UserController.editUser)
router.get('/getuserBy-email/:email',UserController.getUserByEmail)

export default router