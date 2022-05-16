import HeaderComponent from "../HeaderComponent";
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import QuestionService from "../../services/QuestionService";
import CategoryService from "../../services/CategoryService";
import AnswerService from "../../services/AnswerService";

const ListAnswers = (props) => {
    const location = useLocation();
    const refCategory = useRef();


    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [questionsNpm, setQuestionsNpm] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: '2', categoryName: ''
    });
    const [selectedQuestion, setSelectedQuestion] = useState({});

    async function getAllCategories() {
        const res = await CategoryService.listCategories();
        setCategories(res.data);
        if (location.state !== null) {
            setSelectedCategory(location.state.selectedCategory);
            setSelectedQuestion(location.state.selectedQuestion);
        } else {
            setSelectedCategory({ ...selectedCategory, id: res.data[0].id, categoryName: res.data[0].categoryName });
            const defaultQuestion = await QuestionService.getDefaultQuestion(res.data[0].id);
            setSelectedQuestion(defaultQuestion.data);
        }
    };

    async function getQuestionsByCategory(categoryId) {
        const res = await QuestionService.getQuestions(categoryId);
        if (res.status === 200) {
            setQuestions(res.data);
        }
    }

    async function getAnswersByQuestionId(questionId) {
        const res = await AnswerService.getAnswersByCategoryId(questionId);
        if (res.status === 200) {
            setAnswers(res.data);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    const changeCategory = (event) => {
        event.preventDefault();
        setSelectedCategory({ ...selectedCategory, id: refCategory.current.value });
        getQuestionsByCategory(refCategory.current.value);
    }

    async function getAnswersWithNpm(questionId) {
        const res = await QuestionService.getQuestionsWithNpm(questionId);
        if (res.status === 200) {
            setQuestionsNpm(res.data);
        }
    }

    const changeQuestion = (event) => {
        event.preventDefault();
        setSelectedQuestion({ ...selectedQuestion, id: event.target.value });
        getAnswersByQuestionId(event.target.value);
        getAnswersWithNpm(selectedCategory.id);
    }


    return (
        <div>
            <HeaderComponent />
            <div className="container">
                <div className="row" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                    <form>
                        <div className="form-group text-center">
                            <label style={{ marginBottom: "0.5rem" }}> Choose a Topic </label>
                            <div className="offset-md-3 col-md-6 text-center">
                                <select
                                    value={selectedCategory.id}
                                    onChange={(e) => changeCategory(e)}
                                    selectedvalue={selectedCategory.id}
                                    ref={refCategory} className="form-control " id="option"
                                >
                                    {
                                        categories.map(
                                            category =>
                                                <option key={category.id}
                                                    value={category.id}>{category.categoryName} </option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row" style={{ marginBottom: "2rem" }}>
                    <form>
                        <div className="form-group text-center">
                            <label style={{ marginBottom: "0.5rem" }}> Choose a Question </label>
                            <div className="offset-md-3 col-md-6 text-center">
                                <select
                                    value={selectedQuestion.id}
                                    onChange={(e) => changeQuestion(e)}
                                    selectedvalue={selectedQuestion.id}
                                    className="form-control " id="option"
                                >
                                    {
                                        questions.map(
                                            question =>
                                                <option key={question.id}
                                                    value={question.id}>{question.surveyQuestion} </option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <table className="table table-striped table table-bordered">
                        <thead>
                            <tr>
                                <th>AnswerId</th>
                                <th>Answer</th>
                                <th>Point</th>
                                <th>Question</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        {
                            answers.map(
                                answer =>
                                    <tbody >
                                        <tr key={answer.id}>
                                            <td>{answer.id}</td>
                                            <td>{answer.answerName}</td>
                                            <td>{answer.point}</td>
                                            <td>{answer.question.surveyQuestion}</td>
                                            <td>{answer.question.category.categoryName}</td>
                                        </tr>

                                    </tbody>
                            )
                        }
                    </table>
                    <table className="table table-striped table table-bordered" style={{ marginTop: "5rem" }}>
                        <thead>
                            <tr>
                                <th>AnswerId</th>
                                <th>Answer</th>
                                <th>NpmScore</th>
                                <th>Question</th>
                            </tr>
                        </thead>
                        {
                            questionsNpm.map(
                                questionNpm =>
                                    <tbody >
                                        <tr key={questionNpm.id}>
                                            <td>{questionNpm.id}</td>
                                            <td>{questionNpm.surveyQuestion}</td>
                                            <td>{questionNpm.npmScore}</td>
                                            <td>{questionNpm.category.categoryName}</td>
                                        </tr>

                                    </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListAnswers;