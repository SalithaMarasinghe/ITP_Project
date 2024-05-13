import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getPromotionDetails, updatePromotion } from '../redux/actions/promotionActions';
import { listProduct } from '../redux/actions/productActions';

const EditPromotion = () => {
  let params = useParams();
  let navigate = useNavigate();
  const promotionId = params.id;

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [minQty, setminQty] = useState('');
  const [validPeriod, setValidPeriod] = useState('');
  const [relatedProduct, setRelatedProduct] = useState('');

  const dispatch = useDispatch();

  const promotionDetails = useSelector((state) => state.promotionDetails);
  const { loading, error, promotion } = promotionDetails;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);


  useEffect(() => {
    if (!promotion || promotion._id !== promotionId) {
      dispatch(getPromotionDetails(promotionId));
    } else {
      setName(promotion.name);
      setType(promotion.type);
      setValue(promotion.value);
      setminQty(promotion.minQty);
      setValidPeriod(promotion.validPeriod);
      setRelatedProduct(promotion.relatedProduct);
    }
  }, [dispatch, promotion, promotionId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePromotion({
        _id: promotionId,
        name,
        type,
        value,
        minQty,
        validPeriod,
        relatedProduct,
      }),
      navigate("/admin/promotions")
    );
    

  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Edit Promotion</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '20px' }}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}>
              <option value="">Select Type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Minimum Quantity</label>
            <input
              type="number"
              value={minQty}
              onChange={(e) => setminQty(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Valid Period</label>
            <input
              type="date"
              value={validPeriod}
              onChange={(e) => setValidPeriod(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
          <select
            value={relatedProduct}
            onChange={(e) => setRelatedProduct(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px', marginTop: '5px' }}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          </div>
          <button type="submit" style={{ backgroundColor: '#ffce67', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Update Promotion</button>
        </form>
      )}
    </div>
  );
};

export default EditPromotion;
