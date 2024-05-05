import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createInquiry } from '../redux/actions/inquiryActions';

const CreateInquiry = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            createInquiry({
                name, 
                phone, 
                email, 
                subject, 
                message
            })
        );

        //navigate("/admin/faq");

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
                    /><br/><br/><br/>

                    <label>Phone Number: </label><br/>
                    <input 
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder="Enter your phone number"
                    /><br/><br/><br/>

                    <label>Email: </label><br/>
                    <input 
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="right-container">
                    <label>Subject of the Inquiry: </label><br/>
                    <input 
                        type="text"
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                        placeholder="Enter the subject"
                    /><br/><br/>

                    <label>Message: </label><br/>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder="Type you message here..."
                    /><br/><br/>

                    <button type="submit">Submit</button><br/><br/>
                    
                </div>
            </form>
        </div>
    );
};

export default CreateInquiry;
