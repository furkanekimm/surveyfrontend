import axios from "axios";

const QUESTION_API_BASE_URL = "http://localhost:8080/question/"

class QuestionService {
    addQuestion(question) {
        return axios.post(QUESTION_API_BASE_URL + "add", question, {});
    }

    getQuestions(categoryId) {
        return axios.get(QUESTION_API_BASE_URL + "category/" + categoryId, {});
    }

    getDefaultQuestion(categoryId) {
        return axios.get(QUESTION_API_BASE_URL + "defaultQuestion/" + categoryId, {});
    }

    getQuestionsWithNpm(questionId) {
        return axios.get(QUESTION_API_BASE_URL + "npm/" + questionId, {});
    }

}

export default new QuestionService()