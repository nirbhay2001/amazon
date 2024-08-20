import React, { useContext } from 'react'
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../api/axiosInstance";


const Option = ({ deletedata, get }) => {
    // console.log(deletedata);

    const { account, setAccount } = useContext(LoginContext);
    // console.log(account);

    const removedata = async (id) => {
        try {
            // const res = await fetch(`remove/${deletedata}`, {
            //     method: "DELETE",
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json"
            //     },
            //     credentials: "include"
            // });

            const res = await axiosInstance.delete(`/api/v1/remove/${deletedata}`)

            
            

            if (res.status === 400 || !res.data) {
                console.log("error aai remove time pr");
            } else {
                setAccount(res.data)
                get();
                toast.success("Iteam remove from cart 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="add_remove_select" key={deletedata}>
            <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p onClick={() => removedata(deletedata)} style={{ cursor: "pointer" }}>Delete</p><span>|</span>
            <p className="forremovemedia">Save Or Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
            <ToastContainer />
        </div>

    )
}

export default Option;
