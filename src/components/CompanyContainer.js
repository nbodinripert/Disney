import React from 'react';
import { Link } from 'react-router-dom'

// antdesign
import 'antd/dist/antd.css';
import {Col} from 'antd';

// stylesheets
import '../stylesheets/CompanyContainer.css';

export const CompanyContainer = ({name, img}) => {
    return (
        <Col type="flex" xs={11} lg={5} id="companyContainer">
            <Link to={`/company/${name}`}>
                <img src={`${process.env.PUBLIC_URL}/img/companies/${img}`} alt="companyImg"/>
            </Link>
        </Col>
    )
}

export default CompanyContainer;
