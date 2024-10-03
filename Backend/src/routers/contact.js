import express from 'express';
import { createContact, getAllContacts, getContactById, updateContactById, deleteContactById } from '../controllers/contact';

const router = express.Router();

// Tạo một liên hệ mới
router.post('/', createContact);

// Lấy tất cả các liên hệ
router.get('/', getAllContacts);

// Lấy một liên hệ theo ID
router.get('/:id', getContactById);

// Cập nhật một liên hệ theo ID
router.put('/:id', updateContactById);

// Xóa một liên hệ theo ID
router.delete('/:id', deleteContactById);

export default router;
