import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getFAQs, updateFAQ, listFAQs } from '../redux/actions/FAQActions';

const EditFAQ = () => {
  let params = useParams();
  let navigate = useNavigate();
  const FAQId = params.id;

  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const FAQDetails = useSelector((state) => state.FAQDetails);
  const { loading, error, FAQ } = FAQDetails;

  const faqList = useSelector((state) => state.listFAQs);

  useEffect(() => {
    if (!FAQ || FAQ._id !== FAQId) {
      dispatch(getFAQs(FAQId));
    } 
    else {
      setQuestion(FAQ.question);
      setAnswer(FAQ.answer);
    }
  }, [dispatch, FAQ, FAQId]);

  const submitHandler = (e) => {
    e.preventDefault();
  
    dispatch(
      updateFAQ({
        _id: FAQId,
        question, 
        answer
      })
    ).then(() => {
      navigate("/admin/faq");
    });
  };
  

  return (
    <div>
      <h1>Edit FAQ</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitHandler} className="editFAQ">
          <label>Question: </label><br/>
                <textarea 
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                /><br/>

                <label>Answer: </label><br/>
                <textarea
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                /><br/><br/>

                <button type="submit">Update</button><br/><br/>
        </form>
      )}
    </div>
  );
};

export default EditFAQ;
