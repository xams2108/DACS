import { postData } from "../../utils/apiRequest";

const postNoti = async (data) => {
    try {
        const res = await postData(`api/notify/postNotify`, data);
        return res
    } catch (error) {
        console.error('Lỗi khi giá coin:', error.message);
        throw error; 
    }
};

export default postNoti;