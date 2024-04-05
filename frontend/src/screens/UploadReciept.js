import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBank } from "../redux/actions/orderActions";
import Message from "../components/Message";
import Loading from "../components/Loading";
import axios from "axios";

const UploadReceipt = () => {
    let params = useParams();
    const orderId = params.id;

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const { order, success, error } = useSelector((state) => state.orderCreate);

    
    const cart = useSelector((state) => state.cart);

    const [bankDetails, setBankDetails] = useState({
        accName: "",
        accNum: "",
        transDate: "",
        bankName: "",
        branchName: "",
        transAmount: cart.totalPrice,
        remarks: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateBank({
                _id: orderId,
                accName: bankDetails.accName,
                accNum: bankDetails.accNum,
                transDate: bankDetails.transDate,
                bankName: bankDetails.bankName,
                branchName: bankDetails.branchName,
                transAmount: bankDetails.transAmount,
                remarks: bankDetails.remarks
                
            })
        ); 
        navigate(`/order/${order._id}`);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            const { data } = await axios.post("/api/upload", formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error.message);
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Bank Transfer Details</h2>
            <hr style={{ border: 'none', borderTop: '2px solid #D8971A', width: 'auto', margin: '0 left', opacity: 1 }} />
            <Form onSubmit={handleSubmit}>
                {error && <Message variant="danger">{error}</Message>}
                <div className="row">
                    {/* Form fields for bank transfer details */}
                    {/* Account Holder's Name */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="accName">
                            <Form.Label>Account Holder's Name</Form.Label>
                            <Form.Control
                                className="form1"
                                type="text"
                                name="accName"
                                value={bankDetails.accName}
                                onChange={handleChange}
                                placeholder="Enter Account Holder's Name"
                            />
                        </Form.Group>
                    </div>
                    {/* Account Number */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="accNum">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                className="form1"
                                type="number"
                                name="accNum"
                                value={bankDetails.accNum}
                                onChange={handleChange}
                                placeholder="Enter Account Number"
                            />
                        </Form.Group>
                    </div>
                    {/* Transfered Date */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="transDate">
                            <Form.Label>Transfered Date</Form.Label>
                            <Form.Control
                                className="form1"
                                type="date"
                                name="transDate"
                                value={bankDetails.transDate}
                                onChange={handleChange}
                                placeholder="Enter Transfered Date"
                            />
                        </Form.Group>
                    </div>
                    {/* Bank Name */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="bankName">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control
                                className="form1"
                                type="text"
                                name="bankName"
                                value={bankDetails.bankName}
                                onChange={handleChange}
                                placeholder="Enter Bank Name"
                            />
                        </Form.Group>
                    </div>
                    {/* Branch Name */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="branchName">
                            <Form.Label>Branch Name</Form.Label>
                            <Form.Control
                                className="form1"
                                type="text"
                                name="branchName"
                                value={bankDetails.branchName}
                                onChange={handleChange}
                                placeholder="Enter Branch Name"
                            />
                        </Form.Group>
                    </div>
                    {/* Transfered Amount */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="transAmount">
                            <Form.Label>Transfered Amount</Form.Label>
                            <Form.Control
                                className="form1"
                                type="number"
                                name="transAmount"
                                value={bankDetails.transAmount}
                                onChange={handleChange}
                                placeholder={cart.totalPrice}
                            />
                        </Form.Group>
                    </div>
                    {/* Remarks */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="remarks">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                className="form1"
                                type="text"
                                name="remarks"
                                value={bankDetails.remarks}
                                onChange={handleChange}
                                placeholder="Enter Remarks"
                            />
                        </Form.Group>
                    </div>
                    {/* Image Upload */}
                    <div className="col-md-4 mt-3">
                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                className="form1"
                                type="file"
                                label="Choose file"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loading />}
                        </Form.Group>
                    </div>
                    {/* Submit Button */}
                    <div className="col-md-4 mt-3">
                        <div className="form_btn1_1">
                            <Button
                                className="form_btn1_2"
                                variant="primary"
                                style={{ width: '250px', borderRadius: '50px' }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default UploadReceipt;
