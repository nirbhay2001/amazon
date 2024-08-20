import axiosInstance from "../../../api/axiosInstance";

export const getProducts = () => async (dispatch) => {
    try {
        
        const { data } = await axiosInstance.get("/api/v1/getproducts");  
        dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: data });
    } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({ 
            type: "FAIL_GET_PRODUCTS", 
            payload: error.response ? error.response.data : error.message 
        });
    }
};



// "proxy":"http://localhost:5007/", --> esko json file me set kar diya hai