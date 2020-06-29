import React from 'react'

// stylesheets
import '../stylesheets/CompanyCatalogHeader.css';

export const CompanyCatalogHeader = ({img}) => {
    return (
        <div id="companyCatalogHeader">
            <img src={`${process.env.PUBLIC_URL}/img/companies/${img}`} alt="companyImg"/>
            <div>
                <p>Vous présente</p>
                <p>Tout son</p>
                <p>Catalogue</p>
            </div>
        </div>
    )
}

export default CompanyCatalogHeader;
