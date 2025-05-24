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

    updateUser: async (payload) => {
        try {
            const data = await postData(`api/user`, payload);
            return data;
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error.message);
            throw error;
        }
    }
};
export default userService;