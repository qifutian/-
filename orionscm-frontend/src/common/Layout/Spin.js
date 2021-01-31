import React, { PureComponent } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import * as actions from 'reducers/fetching';

class SpinComponent extends PureComponent {
    render() {
        const { fetching } = this.props;
        return <Spin wrapperClassName={fetching ? '' : 'd-none'} size="large" delay={450} spinning={fetching}><span></span></Spin>;
    }
};

const mapStateToProps = (state) => {
    let fetchState = state.fetchingReducer;
    return {
        fetching: fetchState.fetching
    };
};

export default connect(mapStateToProps, { ...actions })(SpinComponent);