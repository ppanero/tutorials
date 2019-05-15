import React from 'react';
import ReactDOM from 'react-dom';

import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import useLocation from './useLocation';

const App = () => {

    const [lat, errorMessage] = useLocation();
    
    let content;
    if (errorMessage) {
        content = <div>Error: {errorMessage}</div>
    }
    else if (lat) {
        content = <SeasonDisplay lat={ lat } />
    }
    else {
        content = <Spinner message='Waiting for location...'/>
    }

    return <div className="border">{ content }</div>
}

ReactDOM.render(<App />, document.querySelector('#root'));