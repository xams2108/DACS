import { postData } from "../../utils/apiRequest";
const Service = {
    postNoti: async (data) => {
        try {
            const res = await postData(`api/order/postOrder`, data);
            return res;
        } catch (error) {
            console.error('Lỗi khi post order:', error.message);
            throw error;
        }
    }
};

export default Service;
