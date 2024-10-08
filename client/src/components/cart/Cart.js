import React, {  useEffect, useState } from 'react'
import "./cart.css";
// import { products } from '../home/productdata';
import { Divider } from '@mui/material';
import {  useParams } from 'react-router';
import { LoginContext}  from '../context/ContextProvider';
import { useContext}  from 'react';
// import {useHistory} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../api/axiosInstance";


const Cart = () => {

    const { account, setAccount } = useContext(LoginContext);
    const { id } = useParams("");
    // console.log(id);

    const history = useNavigate("");

    const [inddata, setInddata] = useState("");

    console.log([inddata]);

    const getinddata = async () => {

        try{
            const res = await axiosInstance.get(`/api/v1/getproductsone/${id}`);
            if(res.status!==201){
                console.log("Not available Product")
            }else{
                setInddata(res.data);
            }
            
        }catch(err){
            console.log(err);
        }

    };

    useEffect(() => {
        setTimeout(getinddata, 1000)
    }, [id]);

    // add kart function
    const addtocart = async (id) => {
        try{
            console.log(id);
            const checkres = await axiosInstance.post(`/api/v1/addcart/${id}`,inddata);
            const data = checkres.data;
            if(checkres.status !== 201){
                console.log("Invalid User")
            }else{
                
                setAccount(data);
                history("/buynow");
            }
            
        
        }catch(err){
            console.log(err);
        }
        
    }

    return (

        <div className="cart_section">
            {inddata && Object.keys(inddata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={inddata.detailUrl} alt="cart_img" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                            <button className="cart_btn2">Buy Now</button>
                        </div>

                    </div>
                    <div className="right_cart">
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount}) </span></p>

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
                </div>
            }



            {!inddata ? <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""}
        </div>
    )
}

export default Cart;
