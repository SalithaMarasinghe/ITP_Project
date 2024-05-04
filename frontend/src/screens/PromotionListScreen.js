import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from "../components/Loading";
import { listPromotions, deletePromotion } from '../redux/actions/promotionActions';
import { listProduct } from '../redux/actions/productActions';

const PromotionListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const promotionList = useSelector((state) => state.promotionList);
  const { loading, error, promotions } = promotionList;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;


  useEffect(() => {
    dispatch(listPromotions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      dispatch(deletePromotion(id));
    }
  };


  const getProductName = (productId) => {
    const product = products.find(product => product._id === productId);
    return product ? product.name : '';
  };

  return (
    <div>
      <div className="row align-items-center">
        <div className="col">
          <h1>Promotions</h1>
        </div>
       
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Value</th>
              <th>Valid Period</th>
              <th>Related Product</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr key={promotion._id}>
                <td>{promotion.name}</td>
                <td>{promotion.type}</td>
                <td>{promotion.value}</td>
                <td>{promotion.validPeriod}</td>
                <td>{getProductName(promotion.relatedProduct)}</td>
                <td>
                  <Link to={`/admin/edit-promotion/${promotion._id}`} className="btn btn-primary mr-2">
                    Edit
                  </Link>
                  <button onClick={() => deleteHandler(promotion._id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
       <div className="col text-right">
          <Link to="/admin/create-promotion" className="btn btn-primary">
            Create Promotion
          </Link>
        </div>
    </div>
    
  );
};

export default PromotionListScreen;
