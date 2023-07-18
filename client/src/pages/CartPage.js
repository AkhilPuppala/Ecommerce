import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useHistory, useNavigate } from "react-router-dom"; // Import useHistory
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true); // Set loading to true before making the payment request
      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      console.log("hi",response);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/orders");
      alert("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  

    const removeCardItem = (pid) => {
        try{
            let mycart = [...cart]
            let index = mycart.findIndex(item => item._id === pid)
            mycart.splice(index,1)
            setCart(mycart);
            localStorage.setItem('cart',JSON.stringify(mycart));
        }
        catch(error){
            console.log(error)
        }
    }

    const totalPrice = () =>{
        try{
            let total = 0;
            cart?.map((c) => {total = total + c.price});
            return total.toLocaleString("en-US",{
                style:"currency",
                currency:"USD"
            });
        }
        catch(error){
            console.log(error);
        }
    }

    const getToken = async () => {
        try {
          const { data } = await axios.get('/api/v1/product/braintree/token');
          setClientToken(data?.clientToken);
        } catch (error) {
          console.log(error);
        }
      };
      
      

      useEffect(() => {
        console.log('useEffect triggered');
        getToken();
      }, [auth?.token]);
      

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <h1 className="text-center p-2 bg-light mb-1" >
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className="text-center">
                    {cart?.length > 1 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
                    </h4>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {cart?.map((p) => (
                            <div className="row card flex-row">
                                <div className="col-md-4">
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top p-3 mb-2"
                                        alt={p.name}
                                        width = "100px"
                                        height = '200px'
                                        />
                                </div>
                                <div className="col-md-6 mt-4">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0,30)}</p>
                                    <p>Price: {p.price}</p>
                                    <button className="btn btn-danger" onClick={() => removeCardItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-3 text-center">
                        <h2>Cart Summary</h2>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                        <>
                        <div className="mb-3">
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/profile')}>Update Address</button>
                        </div>
                        </>
                    ): (
                        <div className="mb-3">
                            {auth?.token ?(
                                <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/profile')}>Update Address</button>

                            )  : (
                                <button className="btn btn-outline-warning" onClick={() => navigate('/login',{state:'/cart',})}>Please Login to checkout</button>
                        )}
                        </div>
                    )}
                    <div className="mt-2">
                    {cart?.length>0 && clientToken && (
                        <DropIn
                            options={{
                            authorization: clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                            }}
                            onInstance={instance => setInstance(instance)}
                        />
                        )}

                                <button className="btn btn-primary" onClick={handlePayment} disabled={!instance || !auth?.user?.address}>
                                {loading ? "Processing..." : "Make Payment"}
                                </button>
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage;