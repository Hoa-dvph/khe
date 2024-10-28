import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
    response?: string;
    respondedAt?: string;
  }

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [response, setResponse] = useState<string>('');
  const [responseMethod, setResponseMethod] = useState<'system' | 'email'>('system');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get<{ data: Contact[] }>('http://localhost:3000/api/contacts');
      setContacts(res.data.data);
      setError(null);
    } catch (err) {
      setError('Lỗi khi lấy danh sách liên hệ');
      console.error('Lỗi khi lấy danh sách liên hệ:', err);
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setResponse(contact.response || '');
  };

  const handleResponse = async () => {
    if (!selectedContact) return;

    try {
      if (responseMethod === 'system') {
        await axios.post(`http://localhost:3000/api/contacts/${selectedContact._id}/respond`, { response });
      } else {
        await axios.post(`http://localhost:3000/api/contacts/${selectedContact._id}/respond-email`, { 
          response,
          email: selectedContact.email
        });
      }
      setSelectedContact(prev => prev ? { ...prev, response, respondedAt: new Date().toISOString() } : null);
      fetchContacts();
      setError(null);
    } catch (err) {
      setError('Lỗi khi gửi phản hồi');
      console.error('Lỗi khi gửi phản hồi:', err);
    }
  };

  const getStatusBadge = (contact: Contact) => {
    if (contact.response) {
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Đã phản hồi</span>;
    }
    return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Chưa phản hồi</span>;
  };

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  if (error) return <div className="text-red-500 text-center text-xl mt-10">Lỗi: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Danh sách Liên hệ</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Số điện thoại
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{contact.name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{contact.email}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{contact.phone}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {getStatusBadge(contact)}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => viewDetails(contact)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Chi tiết Liên hệ</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong className="text-gray-700">Tên:</strong> <span className="text-gray-600">{selectedContact.name}</span></p>
            <p><strong className="text-gray-700">Email:</strong> <span className="text-gray-600">{selectedContact.email}</span></p>
            <p><strong className="text-gray-700">Số điện thoại:</strong> <span className="text-gray-600">{selectedContact.phone}</span></p>
            <p><strong className="text-gray-700">Ngày tạo:</strong> <span className="text-gray-600">{new Date(selectedContact.createdAt).toLocaleString()}</span></p>
          </div>
          <p className="mt-4"><strong className="text-gray-700">Tin nhắn:</strong> <span className="text-gray-600">{selectedContact.message}</span></p>
          {selectedContact.response && (
            <p className="mt-4"><strong className="text-gray-700">Phản hồi trước đó:</strong> <span className="text-gray-600">{selectedContact.response}</span></p>
          )}
          {selectedContact.respondedAt && (
            <p><strong className="text-gray-700">Ngày phản hồi:</strong> <span className="text-gray-600">{new Date(selectedContact.respondedAt).toLocaleString()}</span></p>
          )}
          <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Phản hồi</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phương thức phản hồi:
            </label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio"
                  name="responseMethod"
                  value="system"
                  checked={responseMethod === 'system'}
                  onChange={() => setResponseMethod('system')}
                />
                <span className="ml-2">Hệ thống</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="responseMethod"
                  value="email"
                  checked={responseMethod === 'email'}
                  onChange={() => setResponseMethod('email')}
                />
                <span className="ml-2">Email</span>
              </label>
            </div>
          </div>
          <textarea 
            value={response} 
            onChange={(e) => setResponse(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <button
            onClick={handleResponse}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Gửi phản hồi {responseMethod === 'email' ? 'qua Email' : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactList;