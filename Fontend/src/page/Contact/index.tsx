import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Họ và tên là bắt buộc')
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ và tên không được vượt quá 50 ký tự'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(15, 'Số điện thoại không được vượt quá 15 số')
    .required('Số điện thoại là bắt buộc'),
  message: Yup.string()
    .required('Nội dung là bắt buộc')
    .min(10, 'Nội dung phải có ít nhất 10 ký tự')
    .max(500, 'Nội dung không được vượt quá 500 ký tự'),
});

const ContactForm: React.FC = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  const initialValues: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  const handleSubmit = async (values: ContactFormData, { setSubmitting, resetForm }: any) => {
    setSubmitMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/contacts', values);
      
      if (response.status === 201) {
        setSubmitMessage('Gửi liên hệ thành công!');
        resetForm();
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
      setSubmitMessage('Vui lòng đợi phản hồi từ chúng tôi!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Liên hệ với chúng tôi</h2>
            
            {submitMessage && (
              <div className={`p-4 text-center rounded-md ${submitMessage.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitMessage}
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Họ và tên
              </label>
              <Field
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                id="name"
                type="text"
                placeholder="Nhập họ và tên"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Field
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                id="email"
                type="email"
                placeholder="Nhập địa chỉ email"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Số điện thoại
              </label>
              <Field
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                name="phone"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Nội dung
              </label>
              <Field
                as="textarea"
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                id="message"
                placeholder="Nhập nội dung liên hệ"
                name="message"
                rows={4}
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            <div className="flex items-center justify-center">
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi liên hệ'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;