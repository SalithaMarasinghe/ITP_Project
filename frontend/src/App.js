import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import OnlyAdmin from "./components/OnlyAdmin";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import EditProductScreen from "./screens/EditProductScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UploadReciept from "./screens/UploadReciept";
import BankInstruction from "./screens/BankInstructions";
import ViewReceipt from "./screens/ViewReceipt";
import Delivery from "./screens/Delivery";
import PromotionListScreen from "./screens/PromotionListScreen";
import CreatePromotion from "./screens/CreatePromotion";
import EditPromotion from "./screens/EditPromotion";
import FAQListScreen from "./screens/FAQListScreen";
import CreateFAQ from "./screens/CreateFAQ";
import EditFAQ from "./screens/EditFAQ";
import Help from "./screens/Help";
import CreateInquiry from "./screens/CreateInquiry";
import InquiryListScreen from "./screens/InquiryListScreen";
import StockManager from "./screens/StockManager";
import React from "react";
import UserOrderDetails from "./screens/UserOrderDetails";
import UserRecieptDetails from "./screens/UserRecieptDetails";
import UserDeliveryDetails from "./screens/UserDeliveryDetails";
import MyOrders from "./screens/MyOrders";
import UserCartsScreen from "./screens/UserCartsScreen";
import ReviewListScreen from "./screens/ReviewListScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-4">
        <Container>
          <Routes>
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>

            <Route path="/shipping" element={<ProtectedRoute />}>
              <Route path="/shipping" element={<ShippingScreen />} />
            </Route>

            <Route path="/payment" element={<ProtectedRoute />}>
              <Route path="/payment" element={<PaymentScreen />} />
            </Route>

            <Route path="/placeorder" element={<ProtectedRoute />}>
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
            </Route>

            <Route path="/billinstructions" element={<ProtectedRoute />}>
              <Route
                path="/billinstructions/:id"
                element={<BankInstruction />}
              />
            </Route>

            <Route path="/uploadbill" element={<ProtectedRoute />}>
              <Route path="/uploadbill/:id" element={<UploadReciept />} />
            </Route>

            <Route path="/admin/users" element={<OnlyAdmin />}>
              <Route path="/admin/users" element={<UserListScreen />} />
            </Route>

            <Route path="/admin/users/edit/:id" element={<OnlyAdmin />}>
              <Route
                path="/admin/users/edit/:id"
                element={<UserEditScreen />}
              />
            </Route>

            <Route path="/admin/stockmanager" element={<StockManager />} />
            <Route path="/admin/products" element={<OnlyAdmin />}>
              <Route path="/admin/products" element={<ProductListScreen />} />

              <Route
                path="/admin/products/:pageNumber"
                element={<ProductListScreen />}
              />
            </Route>

            <Route path="/admin/products/create" element={<OnlyAdmin />}>
              <Route
                path="/admin/products/create"
                element={<CreateProductScreen />}
              />
            </Route>

            <Route path="/admin/product/edit/:id" element={<OnlyAdmin />}>
              <Route
                path="/admin/product/edit/:id"
                element={<EditProductScreen />}
              />
            </Route>

            <Route path="/admin/orders" element={<OnlyAdmin />}>
              <Route path="/admin/orders" element={<OrderListScreen />} />
            </Route>

            <Route path="/admin/promotions" element={<OnlyAdmin />}>
              <Route
                path="/admin/promotions"
                element={<PromotionListScreen />}
              />
            </Route>

            <Route path="/admin/create-promotion" element={<OnlyAdmin />}>
              <Route
                path="/admin/create-promotion"
                element={<CreatePromotion />}
              />
            </Route>

            <Route path="/admin/edit-promotion/:id" element={<OnlyAdmin />}>
              <Route
                path="/admin/edit-promotion/:id"
                element={<EditPromotion />}
              />
            </Route>

            <Route path="/admin/reviews" element={<OnlyAdmin />}>
              <Route path="/admin/reviews" element={<ReviewListScreen />} />
            </Route>

            <Route path="/admin/ViewReceipt/:id" element={<OnlyAdmin />}>
              <Route path="/admin/ViewReceipt/:id" element={<ViewReceipt />} />
            </Route>

            <Route path="/admin/Delivery/:id" element={<OnlyAdmin />}>
              <Route path="/admin/Delivery/:id" element={<Delivery />} />
            </Route>

            <Route path="/admin/faq" element={<OnlyAdmin />}>
              <Route path="/admin/faq" element={<FAQListScreen />} />
            </Route>

            <Route path="/admin/create-faq" element={<OnlyAdmin />}>
              <Route path="/admin/create-faq" element={<CreateFAQ />} />
            </Route>

            <Route path="/admin/edit-faq/:id" element={<OnlyAdmin />}>
              <Route path="/admin/edit-faq/:id" element={<EditFAQ />} />
            </Route>

            <Route path="/help" element={<Help />} />

            <Route path="/inquiryForm" element={<CreateInquiry />} />

            <Route path="/admin/inquiry" element={<OnlyAdmin />}>
              <Route path="/admin/inquiry" element={<InquiryListScreen />} />
            </Route>

            <Route path="/order/:id" element={<OnlyAdmin />}>
              <Route path="/order/:id" element={<OrderScreen />} />
            </Route>

            <Route path="/admin/user-carts" element={<OnlyAdmin />}>
              <Route path="/admin/user-carts" element={<UserCartsScreen />} />
            </Route>

            <Route path="/uorder/:id" element={<ProtectedRoute />}>
              <Route path="/uorder/:id" element={<UserOrderDetails />} />
            </Route>

            <Route path="/ureciept/:id" element={<ProtectedRoute />}>
              <Route path="/ureciept/:id" element={<UserRecieptDetails />} />
            </Route>

            <Route path="/udelivery/:id" element={<ProtectedRoute />}>
              <Route path="/udelivery/:id" element={<UserDeliveryDetails />} />
            </Route>

            <Route path="/myorders" element={<ProtectedRoute />}>
              <Route path="/myorders" element={<MyOrders />} />
            </Route>

            <Route path="/page/:pageNumber" element={<HomeScreen />} />

            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />

            <Route path="/search/:keyword" element={<HomeScreen />} />

            <Route index path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
