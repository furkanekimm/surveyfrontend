import React, { Component, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = (props) => {
    const history = useNavigate();
    const addCategory = (e) => {
        history('/add-category');
    }
    const addQuestion = (e) => {
        history('/add-question');
    }
    const submitSurvey = (e) => {
        history('/submit-survey');
    }
    const listSurveyAnswers = (e) => {
        history('/list-answers');
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">Menu</span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" > Survey</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={(e) => addCategory(e)} >Add Category</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={(e) => addQuestion(e)}>Add Question</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={(e) => submitSurvey(e)}>Submit Survey</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={(e) => listSurveyAnswers(e)}>List Survey Answers</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default HeaderComponent;
