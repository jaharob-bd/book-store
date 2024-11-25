import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SwalAlert from '@/Components/Alert/SwalAlert';

function SendEmailForm() {
    const [content, setContent] = useState('');
    const [formData, setFormData] = useState({
        cc: '',
        bcc: ''
    });

    const handleChange = (e) => {
        const { name, options } = e.target;
        const selectedEmails = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value)
            .join(',');

        setFormData({
            ...formData,
            [name]: selectedEmails,
        });

        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            content
        };
        console.log(data);
        router.post('/send-email', data, {
            onSuccess: () => {
                SwalAlert('success', 'Email sent successfully');
                setContent('');
            },
        });
    };

    return (
        <>
            <Head>
                <title>Send Email</title>
            </Head>
            <form onSubmit={handleSubmit}>
                {/* cc email */}
                <label>Cc:</label>
                <br />
                <select name="cc" multiple onChange={handleChange}>
                    <option value="example@example.com">Example Email</option>
                    <option value="another@example.com">Another Email</option>
                    <option value="yetanother@example.com">Yet Another Email</option>
                    <option value="last@example.com">Last Email</option>
                    <option value="first@example.com">First Email</option>
                    <option value="second@example.com">Second Email</option>
                    <option value="third@example.com">Third Email</option>
                    <option value="fourth@example.com">Fourth Email</option>
                    <option value="fifth@example.com">Fifth Email</option>
                    <option value="sixth@example.com">Sixth Email</option>
                    <option value="seventh@example.com">Seventh Email</option>
                </select>
                <br />
                {/* bcc email */}
                <label>Bcc:</label>
                <br />
                <select name="bcc" multiple onChange={handleChange}>
                    <option value="example@example.com">Example Email</option>
                    <option value="another@example.com">Another Email</option>
                    <option value="yetanother@example.com">Yet Another Email</option>
                    <option value="last@example.com">Last Email</option>
                    <option value="first@example.com">First Email</option>
                    <option value="second@example.com">Second Email</option>
                    <option value="third@example.com">Third Email</option>
                    <option value="fourth@example.com">Fourth Email</option>
                    <option value="fifth@example.com">Fifth Email</option>
                    <option value="sixth@example.com">Sixth Email</option>
                    <option value="seventh@example.com">Seventh Email</option>
                </select>
                <br />
                <div className='form-control'>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter email content here"
                        rows={10}
                        cols={100}
                    />
                </div>
                <button type="submit">Send Email</button>
            </form>
        </>
    );
}

export default SendEmailForm;