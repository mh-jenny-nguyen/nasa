import React from 'react';

const PageContainer = (props) => {
    return (
        <div className={`page ${props.className}`}>
            {props.children}
        </div>
    )
}

export default PageContainer;