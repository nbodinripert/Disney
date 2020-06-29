import React from 'react'
import { Link } from 'react-router-dom'

// antdesign
import 'antd/dist/antd.css';
import {Col} from 'antd';

// stylesheets
import '../stylesheets/SuggestionContainer.css';

export const SuggestionContainer = ({id, img}) => {
    return (
        <Col type="flex" lg={7} id="suggestionContainer">
            <Link to={`/movie/${id}`}>
                <div className="movieContainer">
                    <img src={img} alt="suggestionImg"/>
                </div>
            </Link>
        </Col>
    )
}

export default SuggestionContainer;