import { StatusCodes } from "http-status-codes";
import Contact from "../models/contacts.js"; 

// Tạo một liên hệ mới
export const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        return res.status(StatusCodes.CREATED).json(contact);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Lấy tất cả các liên hệ
export const getAllContacts = async (req, res) => {
    const { _page = 1, _limit = 10, _sort = "createdAt", _order = "asc" } = req.query;
    const page = parseInt(_page);
    const limit = parseInt(_limit);
    const skip = (page - 1) * limit;
    const sort = { [_sort]: _order === "desc" ? -1 : 1 };

    try {
        // Lấy tất cả các liên hệ với giới hạn, bỏ qua, và sắp xếp
        const contacts = await Contact.find()
            .limit(limit)
            .skip(skip)
            .sort(sort);
        
        // Đếm tổng số lượng tài liệu
        const totalItems = await Contact.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        if (contacts.length === 0) throw new Error("No contacts found");

        const response = {
            data: contacts,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
            },
        };
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Lấy liên hệ theo ID
export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy liên hệ nào!" });
        }
        return res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Cập nhật liên hệ theo ID
export const updateContactById = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy liên hệ nào để cập nhật!" });
        }
        return res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Xóa liên hệ theo ID
export const deleteContactById = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy liên hệ nào để xóa!" });
        }
        return res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const respondToContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { response, sendEmail } = req.body;
        
        const contact = await Contact.findByIdAndUpdate(
            id,
            { $set: { response, respondedAt: new Date() } },
            { new: true }
        );

        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy liên hệ!" });
        }

        if (sendEmail) {
            // Gửi email
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
                to: contact.email,
                subject: `Phản hồi từ ${process.env.COMPANY_NAME}`,
                text: response,
                html: `<p>${response}</p>`
            });
        }

        return res.status(StatusCodes.OK).json({
            message: sendEmail ? 'Phản hồi đã được gửi và email đã được gửi' : 'Phản hồi đã được gửi',
            contact
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
