import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createInquiry } from '../redux/actions/inquiryActions';

const CreateInquiry = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

    const [name, setName] = useState(userInfo.name || '');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(userInfo.email || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(userInfo.name || '');
        setEmail(userInfo.email || '');
    }, [userInfo]);

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            errors.phone = 'Phone number must be 10 digits';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!subject.trim()) {
            errors.subject = 'Subject is required';
        }

        if (!message.trim()) {
            errors.message = 'Message is required';
        }

        return errors;
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            dispatch(
                createInquiry({
                    name, 
                    phone, 
                    email, 
                    subject, 
                    message
                })
            );

            alert('Inquiry submitted successfully');

            // Reset form fields
            setName(userInfo.name);
            setPhone('');
            setEmail(userInfo.email);
            setSubject('');
            setMessage('');

            //navigate("/admin/faq");
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <form className="createInquiry" onSubmit={submitHandler}>
                <div className="left-container">
                    <h1>Customer</h1>
                    <h1>Support</h1><br/><br/>

                    <label>Name: </label><br/>
                    <input 
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your name"
                    /><br/>
                    {errors.name && <span className="error">{errors.name}</span>}<br/><br/>

                    <label>Phone Number: </label><br/>
                    <input 
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder="Enter your phone number"
                    /><br/>
                    {errors.phone && <span className="error">{errors.phone}</span>}<br/><br/>

                    <label>Email: </label><br/>
                    <input 
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email address"
                    /><br/>
                    {errors.email && <span className="error">{errors.email}</span>}<br/><br/>
                </div>

                <div className="right-container">
                    <label>Subject of the Inquiry: </label><br/>
                    <input 
                        type="text"
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                        placeholder="Enter the subject"
                    /><br/>
                    {errors.subject && <span className="error">{errors.subject}</span>}<br/><br/>

                    <label>Message: </label><br/>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder="Type you message here..."
                    /><br/>
                    {errors.message && <span className="error">{errors.message}</span>}<br/><br/>

                    <button type="submit">Submit</button><br/><br/>
                    
                </div>
            </form>
        </div>
    );
};

export default CreateInquiry;
