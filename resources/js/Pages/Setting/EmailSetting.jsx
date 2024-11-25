import React, { useState } from 'react';

const EmailSetting = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: '',
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('from', formData.from);  // Include sender's email
    form.append('to', formData.to);
    form.append('cc', formData.cc);
    form.append('bcc', formData.bcc);
    form.append('subject', formData.subject);
    form.append('message', formData.message);
    if (formData.attachment) {
      form.append('attachment', formData.attachment);
    }

    try {
      const response = await fetch('http://your-backend-api/send-email', {
        method: 'POST',
        body: form,
      });
      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="from" placeholder="From" onChange={handleChange} required /> {/* Sender's email */}
      <input type="email" name="to" placeholder="To" onChange={handleChange} required />
      <input type="email" name="cc" placeholder="CC" onChange={handleChange} />
      <input type="email" name="bcc" placeholder="BCC" onChange={handleChange} />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} required />
      <input type="file" name="attachment" onChange={handleChange} />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailSetting;
