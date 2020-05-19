import React from 'react';
import { PageHeader } from 'antd';
import { withRouter } from 'react-router-dom';

import './Header.scss';

const Header = (props) => {
    console.log(props)

    const onClickHandler = () => {
        let { history } = props;

        history.goBack();
    }

    return <PageHeader
        className="header"
        onBack={() => props.onBack ? props.onBack() : onClickHandler()}
        title={props.title}
        subTitle={props.subTitle}
        ghots={false}
    />
}

export default withRouter(Header);