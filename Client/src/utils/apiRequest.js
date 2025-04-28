const API_URL = 'http://localhost:2108'; 

const handleRequest = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json', 
        },
    };

    if (data) {
        options.body = JSON.stringify(data); 
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, options);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi: ${errorData.message || response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error(`Lỗi khi thực hiện ${method} tại ${endpoint}:`, error.message);
        throw error; 
    }
};

export const getData = (endpoint) => handleRequest('GET', endpoint);
export const postData = (endpoint, data) => handleRequest('POST', endpoint, data);
export const putData = (endpoint, data) => handleRequest('PUT', endpoint, data);
export const deleteData = (endpoint) => handleRequest('DELETE', endpoint);

export const getPublicData = async (url) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi: ${errorData.message || response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu công khai:', error.message);
        throw error; 
    }
};