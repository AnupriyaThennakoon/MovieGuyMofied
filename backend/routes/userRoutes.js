import express from 'express'
import { authUser, getUserAccount, addUser, updateUserAccount, getUsers, deleteUser } from '../controllers/userController.js'
const router = express.Router()
import {shield, admin} from '../middleware/validateTokenMiddleware.js'

router.post('/login', authUser) // for login 
router.route('/account').get(shield, getUserAccount).put(shield, updateUserAccount) // to authorize using jwt tokens and access or amend user profile
router.route('/:id').delete(shield, admin, deleteUser);

router.route('/').post(addUser).get(shield,admin, getUsers)


export default router