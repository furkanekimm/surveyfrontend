import axios from "axios";

const CATEGORY_API_BASE_URL = "http://localhost:8080/category/"

class CategoryService {
    addCategory(category) {
        return axios.post(CATEGORY_API_BASE_URL + "add", category, {});
    }

    listCategories() {
        return axios.get(CATEGORY_API_BASE_URL, {});
    }
}

export default new CategoryService()