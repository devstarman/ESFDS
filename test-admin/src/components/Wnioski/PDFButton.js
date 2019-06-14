import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification } from 'react-admin';
import { push } from 'react-router-redux';
import { MdPictureAsPdf } from "react-icons/md";
import jsPDF from "jspdf";

class PDFButton extends Component {
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        showNotification('Rozpoczynam pobieranie PDF...');
        console.log("generating PDF.");
        var doc = new jsPDF();
        doc.setFontSize(12);
        doc.addFont('ArialMS', 'Arial', 'normal');
        doc.setFont('Arial', 'bold');
        doc.text('Nazwa projektu: ', 90, 10);
        doc.setFont('ARIALUNI', 'normal');
        doc.text(record.nazwaprojektu, 103, 20);
        doc.setFont('Arial', 'bold');
        doc.text('Kwota wnioskowana: ', 10, 40);
        doc.setFont('ARIALUNI', 'normal');
        doc.text(record.kwotawnioskowana + " PLN.", 10, 50);
        doc.setFont('Arial', 'bold');
        doc.text('Kwota z innych: ', 10, 60);
        doc.setFont('ARIALUNI', 'normal');
        doc.text(record.kwotazinnychzrodel + " PLN.", 10, 70);
        doc.setFont('Arial', 'bold');
        doc.text('Kwota ogólem: ', 10, 80);
        doc.setFont('ARIALUNI', 'normal');
        doc.text(record.kwotaogolem + " PLN.", 10, 90);
        doc.setFont('Arial', 'bold');
        doc.text('Opis projektu: ', 10, 100);
        doc.setFont('ARIALUNI', 'normal');
        doc.fromHTML(record.opisprojektu, 10, 100, {'width': 100});
        doc.setFont('Arial', 'bold');
        doc.text('Planowany termin: ', 10, 120);
        doc.setFont('ARIALUNI', 'normal');
        doc.fromHTML(record.planowanytermin, 10, 120, {'width': 100});
        doc.setFont('Arial', 'bold');
        doc.text('Cel projektu: ', 10, 140);
        doc.setFont('ARIALUNI', 'normal');
        doc.fromHTML(record.celprojektu, 10, 140, {'width': 100});
        doc.setFont('Arial', 'bold');
        doc.text('Zasoby: ', 10, 160);
        doc.setFont('ARIALUNI', 'normal');
        doc.fromHTML(record.zasoby, 10, 160, {'width': 100});
        doc.setFont('Arial', 'bold');
        doc.text('Wykaz realizacji w ubieglych latach: ', 10, 180);
        doc.setFont('ARIALUNI', 'normal');
        doc.fromHTML(record.wykazrealizacji, 10, 180, {'width': 100});

        doc.save('wniosek'+record.id+'.pdf');
    };

    render() {
        return <Button label="PDF" onClick={this.handleClick} ><MdPictureAsPdf /> PDF</Button>;
    }
}

PDFButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    push,
})(PDFButton);