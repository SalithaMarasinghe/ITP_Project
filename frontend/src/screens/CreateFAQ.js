import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createFAQ } from '../redux/actions/FAQActions';

const CreateFAQ = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            createFAQ({
                question, 
                answer
            })
        );

        navigate("/admin/faq");
    };

    return (
        <div>
            <form className="createFAQ" onSubmit={submitHandler}>
                <label>Question: </label><br/>
                <input 
                    type="text"
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                /><br/>

                <label>Answer: </label><br/>
                <input 
                    type="text"
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                /><br/><br/>

                <button type="submit">Submit</button><br/><br/>
            </form>
        </div>
    );
};

export default CreateFAQ;
