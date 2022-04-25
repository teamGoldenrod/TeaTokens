import axios from "axios";

export async function addToCart(productId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("");
    }
    await axios.post(
      `/api/orders`,
      { prodId: productId },
      { headers: { authorization: token } }
    );
  } catch (err) {
    console.error(err);
  }
}
