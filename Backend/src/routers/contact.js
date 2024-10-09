import express from 'express';
import { createContact, getAllContacts, getContactById, updateContactById, deleteContactById } from '../controllers/contact';

const router = express.Router();

router.post('/contacts', createContact);

router.get('/contacts', getAllContacts);

router.get('/contacts/:id', getContactById); 

router.put('/contacts/:id/edit', updateContactById);  

router.delete('/contacts/:id/delete', deleteContactById);  
export default router;
