
import { getData, postData } from "../../utils/apiRequest";
const userService = {
    getUser: async () => {
        try {
            const data = await getData(`api/user`);
            return data;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error.message);
            throw error;
        }
    },
    getJwt: async () => {
        try {
            const data = await getData(`api/user/jwt`);
            return data;
        } catch (error) {
            console.error('Lỗi khi lấy jwt từ server', error.message);
            throw error;
        }
    },
    updateUser: async (payload) => {
        try {
            const data = await postData(`api/user/changeInfo`, payload);
            return data;
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error.message);
            throw error;
        }
    },
    createOTP: async(payload) =>{
        try{
            const data = await postData(`api/user/otp`, payload);
            return data;
        }catch(error){
            console.error('Lỗi khi gửi otp:', error.message);
            throw error;
        }
    },
    verifyOTP: async(payload) => {
        try{
            const data = await postData(`api/user/verifyOtp`, payload);
            return data;
        }catch(error){
            console.error('Lỗi khi verify OTP', error.message);
            throw error;
        }
    }
};
export default userService;