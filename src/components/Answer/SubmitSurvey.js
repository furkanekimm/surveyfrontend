import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryService from "../../services/CategoryService";
import QuestionService from "../../services/QuestionService";
import AnswerService from "../../services/AnswerService";
import HeaderComponent from "../HeaderComponent";

const SubmitSurvey = (props) => {
    const history = useNavigate();
    const location = useLocation();
    const refCategory = useRef();
    const [points] = useState(
        [{ i: 0 }, { i: 1 }, { i: 2 }, { i: 3 }, { i: 4 }, { i: 5 }, { i: 6 }, { i: 7 }, { i: 8 }, { i: 9 }, { i: 10 }
        ]);
    const [categories, setCategories] = useState([{ id: '', categoryName: '' }]);
    const [questions, setQuestions] = useState([{ id: '', surveyQuestion: '' }]);
    const [category, setCategory] = useState({
        id: '2', categoryName: ''
    });


    const [answer, setAnswer] = useState({
        answerName: '',
        point: 0,
        question: {}
    });

    const [counter, setCounter] = useState({
        count: 0
    });

    const { count } = counter;


    const { answerName } = answer;

    const [question, setQuestion] = useState({
        surveyQuestion: '',
        id: '',
        category: {}
    });

    async function getAllCategories() {
        const res = await CategoryService.listCategories();
        setCategories(res.data);
        if (location.state !== null) {
            setQuestion({
                ...question,
                id: location.state.question.id,
                surveyQuestion: location.state.question.surveyQuestion,
                category: location.state.question.category
            });
            setCategory(location.state.question.category)
        } else {
            setCategory(res.data[0]);
            const defaultQuestion = await QuestionService.getDefaultQuestion(res.data[0].id);
            setQuestion(defaultQuestion.data);
        }
    };

    async function getQuestions(categoryId) {
        const res = await QuestionService.getQuestions(categoryId);
        setQuestions(res.data);
        if (question.surveyQuestion !== "") {
            setQuestion(res.data[0])
        }
        setAnswer({ ...answer, question: res.data[0] })
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const changeCategory = (event) => {
        event.preventDefault();
        setCategory({ ...category, id: refCategory.current.value });
        getQuestions(refCategory.current.value);
        setCounter({ ...counter, count: 0 })
    }

    const changeHandler = (e) => {
        e.preventDefault();
        setAnswer({ ...answer, [e.target.name]: e.target.value })
    }

    const changePoint = (e) => {
        setAnswer({ ...answer, point: e.target.value, question: question })
    }

    const saveAnswer = async (e) => {
        e.preventDefault();
        AnswerService.addAnswer(answer).then(res => {
            if (res.status === 200) {
                history('/list-answers');
            }
        });
    }

    const changeSurvey = async (e) => {
        e.preventDefault();
        if (questions.length > count) {
            setCounter({ ...counter, count: count + 1 })
            setQuestion(questions[count]);
            setAnswer({ ...answer, question: questions[count] })
        }
    }

    return (
        <div>
            <HeaderComponent />
            <div style={{ marginTop: "2rem" }} className="container margin-top:1rem">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Submit Survey</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group text-center">
                                    <label style={{ marginBottom: "0.5rem" }}> Choose a Topic </label>
                                    <div className="offset-md-3 col-md-6 text-center">
                                        <select
                                            value={category.id}
                                            onChange={(e) => changeCategory(e)}
                                            selectedvalue={category.id}
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
                                <div className="form-group text-center">
                                    <label class="border border-light rounded" style={{ marginTop: "3rem" }}> Survey Question </label>
                                    <div>
                                        <label style={{ color: "blue", fontSize: "1.4rem", marginTop: "0.5rem", marginBottom: "3rem" }}> {question.surveyQuestion} </label>
                                    </div>
                                </div>
                                <div onChange={(e) => changePoint(e)} className="form-group text-center" style={{ marginBottom: "2rem" }}>
                                    {
                                        points.map(
                                            point =>
                                                <label>
                                                    <input style={{ marginLeft: "1.35rem" }} type="radio" value={point.i} name="point" /> {point.i}</label>
                                        )
                                    }

                                </div>
                                <div className="form-group text-center">
                                    <label > What is the most important reason for your score? </label>
                                    <textarea rows="5" style={{ marginTop: "0.5rem" }} placeholder="Answer" name="answerName" className="form-control"
                                        value={answerName} onChange={(e) => changeHandler(e)} />
                                </div>
                                <button style={{ marginTop: "1.5rem" }} className="btn btn-success" onClick={(e) => saveAnswer(e)}>Save</button>
                                <button style={{ marginTop: "1.5rem", marginLeft: "25rem" }} className="btn btn-primary" onClick={(e) => changeSurvey(e)}>Change Survey</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SubmitSurvey;