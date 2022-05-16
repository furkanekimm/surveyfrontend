import axios from "axios";

const ANSWER_API_BASE_URL = "http://localhost:8080/answer/"

class AnswerService {
    addAnswer(answer) {
        return axios.post(ANSWER_API_BASE_URL + "add", answer, {});
    }

    listCategories() {
        return axios.get(ANSWER_API_BASE_URL, {});
    }

    getAnswersByCategoryId(questionId) {
        return axios.get(ANSWER_API_BASE_URL + "question/" + questionId, {});
    }


}

export default new AnswerService()