import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CategoryService from "../../services/CategoryService";
import HeaderComponent from "../HeaderComponent";

const AddCategory = (props) => {
    const history = useNavigate();

    const [category, setCategory] = useState({
        categoryName: ''
    });

    const { categoryName } = category;

    const saveCategory = async (e) => {
        e.preventDefault();
        let category = {
            categoryName: categoryName
        };
        CategoryService.addCategory(category).then(res => {
            if (res.status === 200) {
                history('/add-question');
            }
        });
    }

    const changeCategoryNameHandler = (event) => {
        setCategory({ ...category, categoryName: event.target.value })
    }

    return (
        <div>
            <HeaderComponent />
            <div style={{ marginTop: "2rem" }} className="container margin-top:1rem">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Add Topic</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Survey Topic </label>
                                    <input style={{ marginTop: "0.5rem" }} placeholder="Survey Topic" name="categoryName" className="form-control"
                                        value={categoryName} onChange={(e) => changeCategoryNameHandler(e)} />
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
export default AddCategory;