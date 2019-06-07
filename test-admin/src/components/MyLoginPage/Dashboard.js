import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const divStyle = {
    fontFamily: "arial",
    textAlign: "justify",
};

export default () => (
    <Card>
        <CardHeader title="Elektroniczny System Finansowania Działalności Studenckiej" />
        <CardContent>
            <div style={divStyle}>
            Jesteście zarejestrowaną organizacją studencką, kołem naukowym lub agendą kultury? Możecie starać się o dofinansowanie Waszej działalności!<br />
            <br />
            <b>UWAGA!</b><br />
            <br />
            Żeby składać wnioski do Komisji Centralnej należy przejść szkolenie z Zakresu Finansowania Działalności Studenckiej oraz rozliczania przyznanych środków w Dziale Studenckiem. <br />
            <br />
            Składanie wniosków do Komisji Wydziałowej wymaga dodatkowo przejścia szkolenia z rozliczania przyznanych środków na danym wydziale!<br />
            Terminy szkoleń są na bieżąco ogłaszane na stronie Samorządu.<br />
            <br />
            Poniżej znajduje się krótkie podsumowanie systemu finansowania! Chcesz wiedzieć więcej? Zapoznaj się z Dokumentami dostępnymi w zakładce Dokumenty i wzory wniosków. Wyczekuj również ogłoszeń o szkoleniach z zakresu finansowania działalności studenckiej.
            <br /><br />
            <b>Komisja Centralna ds. Finansowania Działalności Studenckiej</b><br />
            Organizacje Studenckie i Agendy Kultury chcące uzyskać dofinansowanie swojej działalności powinny wypatrywać naboru wniosków ogłaszanego przez Komisję Centralną ds. Finansowania Działalności Studenckiej.
            Na początku roku Komisja Centralna ogłasza nabór wniosków Budżetowych, w ramach których można starać się o dofinansowanie bieżących kosztów Waszej działalności (np. materiałów biurowych, wyposażenia biura, opłat członkowskich itp.).
            Również na początku roku Komisja Centralna ogłasza nabór wniosków o nadanie statusu Strategicznego Koła Naukowego Politechniki Wrocławskiej. Ten prestiżowy tytuł daje możliwość uzyskania z góry na cały rok dofinansowania w dużo większej kwocie niż Koło byłoby w stanie uzyskać na wydziale.
            W trakcie roku (co 4 tygodnie) Komisja Centralna ogłasza przyjmowanie Wniosków Projektowych. Jeżeli Twoja Organizacja, czy Agenda Kultury chce uzyskać dofinansowanie na projekt społeczny lub kulturalny, który realizujecie, wyczekujcie ogłoszenia terminów konkursów :)
            <br /> <br />
            <b>Komisje Wydziałowe ds. Finansowania Działalności Studenckiej</b><br />
            Koła Naukowe oraz grupy studentów i organizacje realizujące projekty NAUKOWE składają wnioski o dofinansowanie swojej działalności do Komisji Wydziałowej ds. Finansowania Działalności Studenckiej. Koło Naukowe jest zobowiązane składać wnioski na tym wydziale, z którego wywodzi się jego Główny Opiekun. Nawet jeśli jest Kołem Międzywydziałowym.
            Komisje Wydziałowe na początku roku ogłaszają nabór wniosków Budżetowych, w ramach których można starać się o dofinansowania bieżących kosztów działalności (np. materiałów biurowych, wyposażenia biura, opłat członkowskich itp.).
            W trakcie roku (co 4 tygodnie) Komisja Wydziałowa ogłasza przyjmowanie Wniosków Projektowych. Jeżeli chcecie uzyskać dofinansowanie na projekt naukowy, bądź konstrukcyjny, wyczekujcie ogłoszenia terminów konkursów :)
            <br /><br />
                Szczegóły: <a href="https://samorzad.pwr.edu.pl/dzialalnosc/finansowanie-dzialalnosci-studenckiej">https://samorzad.pwr.edu.pl/dzialalnosc/finansowanie-dzialalnosci-studenckiej</a>
            </div>
        </CardContent>
    </Card>
);