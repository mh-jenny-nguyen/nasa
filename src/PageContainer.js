import React from 'react';

const PageContainer = (props) => {
    return (
        <div className="page">
            {props.children}
        </div>
    )
}

export default PageContainer;