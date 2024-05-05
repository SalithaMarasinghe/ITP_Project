import api from "./api";

class CartAPI {
  // Add cart items
  static addCartItems(data) {
    return api.post("/api/carts", data);
  }

  // Get cart by user id
  static getCartByUserId() {
    return api.get("/api/carts");
  }

  // Update cart item
  static updateCartItem(id, qty) {
    return api.put(`/api/carts/${id}`, { qty });
  }

  // Delete cart item
  static deleteCartItem(id) {
    return api.delete(`/api/carts/${id}`);
  }

  // Clear cart
  static clearCart() {
    return api.delete("/api/carts/clear");
  }
}

export default CartAPI;
