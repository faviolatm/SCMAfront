// components/modals/ContactModal.js
import React from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const contacts = [
    { name: "R, Rajaram", email: "rajaram.r@te.com" },
    { name: "Suresh, Priyanka", email: "priyanka.suresh@te.com" },
    { name: "Tolentino, Maria Alexandra R", email: "alexa.tolentino@te.com" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-3xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Contact Support</h2>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-600 mb-6 leading-relaxed">
            For any questions or assistance, please contact our support team:
          </p>

          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-4 hover:bg-orange-50 transition-colors duration-200">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{contact.name}</h3>

                    {/* Aquí faltaba <a> */}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-orange-600 hover:text-orange-700 transition-colors duration-200 text-sm"
                    >
                      {contact.email}
                    </a>
                  </div>

                  {/* También aquí faltaba <a> */}
                  <a
                    href={`mailto:${contact.email}`}
                    className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm">
              We'll get back to you as soon as possible
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactModal;
