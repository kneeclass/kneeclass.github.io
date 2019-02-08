import React from 'react';
import './style.scss'

const ContentfulPage = (props) => {
    return <div className='contentfulpage'>{props.children}</div>
};

export default ContentfulPage;