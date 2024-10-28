import express from 'express';
import { createContact, getAllContacts, getContactById, updateContactById, deleteContactById, respondToContact } from '../controllers/contact.js';
const router = express.Router();

router.post('/contacts', createContact);

router.get('/contacts', getAllContacts);

router.get('/contacts/:id', getContactById); 

router.put('/contacts/:id/edit', updateContactById);  

router.delete('/contacts/:id', deleteContactById);  

router.post('/contacts/:id/respond', respondToContact);

export default router;
