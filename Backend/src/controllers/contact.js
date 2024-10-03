import { StatusCodes } from "http-status-codes";
import Contact from "../models/contacts"; 

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
    const options = {
        page: _page,
        limit: _limit,
        sort: { [_sort]: _order === "desc" ? -1 : 1 },
    };

    try {
        const result = await Contact.paginate({}, options); // Giả sử bạn đã thiết lập phân trang cho model Contact
        if (result.docs.length === 0) throw new Error("No contacts found");
        const response = {
            data: result.docs,
            pagination: {
                currentPage: result.page,
                totalPages: result.totalPages,
                totalItems: result.totalDocs,
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
