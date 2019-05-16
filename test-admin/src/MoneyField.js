import React from 'react';
import PropTypes from 'prop-types';

const MoneyField = ({ source, record = {} }) => {
    let value = record[source] !== undefined ? (record[source]).toLocaleString() : '-';
    return <span>{value +' zł'}</span>
};

MoneyField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default MoneyField;