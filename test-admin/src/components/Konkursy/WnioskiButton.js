import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification } from 'react-admin';
import { push } from 'react-router-redux';
import { MdDescription } from "react-icons/md";

class WnioskiButton extends Component {
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        const updatedRecord = { ...record, is_approved: true };
        showNotification('Przechodzę do wniosków z konkursu.');
        push('/wnioski?filter=%7B"konkursid"%3A"' + record.id + '"%7D');
    };

    render() {
        return <Button label="Wnioski" onClick={this.handleClick} ><MdDescription />  Wnioski</Button>;
    }
}

WnioskiButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    push,
})(WnioskiButton);