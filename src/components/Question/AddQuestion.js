import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CategoryService from "../../services/CategoryService";
import QuestionService from "../../services/QuestionService";
import HeaderComponent from "../HeaderComponent";

const AddQuestion = (props) => {
    const history = useNavigate();
    const refCategory = useRef();

    const [question, setQuestion] = useState({
        surveyQuestion: ''
    });

    const [categories, setCategories] = useState([])

    const [category, setCategory] = useState({
        id: '', categoryName: ''
    });

    const { surveyQuestion } = question;

    async function getAllCategories() {
        const res = await CategoryService.listCategories();
        await setCategories(res.data);
    }

    const changeHandler = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const changeCategory = (event) => {
        setCategory({ ...category, id: refCategory.current.value })
    }

    const saveCategory = async (e) => {
        e.preventDefault();
        let question = {
            surveyQuestion: surveyQuestion,
            category: category
        };
        const res = await QuestionService.addQuestion(question);
        if (res.status === 200) {
            history('/submit-survey', {
                state: {
                    question: res.data,
                    selectedCategory: category.id
                }
            })
        }
    }

    return (
        <div>
            <HeaderComponent />
            <div style={{ marginTop: "2rem" }} className="container margin-top:1rem">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Add Question</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Survey Topic </label>
                                    <div className="col-md-6">
                                        <select onChange={(e) => changeCategory(e)}
                                            ref={refCategory} className="form-control" id="option">
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
                                <div className="form-group">
                                    <label> Question </label>
                                    <input style={{ marginTop: "0.5rem" }} placeholder="Question" name="surveyQuestion" className="form-control"
                                        value={surveyQuestion} onChange={(e) => changeHandler(e)} />
                                </div>
                                <button style={{ marginTop: "1.5rem" }} className="btn btn-success" onClick={(e) => saveCategory(e)}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddQuestion;