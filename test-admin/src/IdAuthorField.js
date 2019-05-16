import React, {Component} from 'react';
import PropTypes from 'prop-types';

class IdAuthorField extends Component {
    constructor(props) {
        super(props);
        console.log("IdAuthorField with id = " + this.props.id + " name: " + this.props.name);
        this.state = {};
    }

    componentDidMount() {
        this.setState({
           roleId: localStorage.getItem('roleId'),
        });
    }


    render() {
        return <span>{this.props.name + ' ' + this.state.roleId}</span>
    }

}

// const IdAuthorField = ({ source }) => {
//     console.log("IdAuthorField with record = " + source);
//     return <span>{source}</span>
// };
//
// IdAuthorField.propTypes = {
//     source: PropTypes.string.isRequired,
// };

export default IdAuthorField;