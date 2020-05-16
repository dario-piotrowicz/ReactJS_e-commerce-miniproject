import React from 'react';
import './error-boundary.styles.scss'
import { ReactComponent as ExclamationMark } from '../../assets/exclamation-mark.svg';

class ErrorBoudary extends React.Component {
    state = { hasErrored: false};

    static getDerivedStateFromError(){
        return { hasErrored: true};
    }

    render(){
        const { hasErrored } = this.state;
        const { children } = this.props;
        const ErrorDiv = <div className="error-boundary">
            <ExclamationMark className="exclamation-mark"/>
            <h2>Sorry, something went wrong, please try again</h2>
        </div>;

        return hasErrored ? ErrorDiv : children ;
    }
}

export default ErrorBoudary;