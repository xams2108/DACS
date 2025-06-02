import { postData,deleteData, getData } from "../../utils/apiRequest";
const Service = {
    getOrder: async () => {
        try {
            const res = await getData(`api/order`);
            return res;
        } catch (error) {
            console.error("❌ Lỗi khi get order:", error.message);
            throw error;
        }
    },
    
    postOrder: async (data) => {
        try {
            const res = await postData(`api/order/postOrder`, data);
            return res;
        } catch (error) {
            console.error('Lỗi khi post order:', error.message);
            throw error;
        }
    },
    deleteOrder: async (id) => {
        try {
            const res = await deleteData(`api/order/deleteOrder/${id}`);
            return res;

        } catch (error) {
            console.error('Lỗi khi post order:', error);
            throw error;
        }
    },  
    

};

export default Service;
