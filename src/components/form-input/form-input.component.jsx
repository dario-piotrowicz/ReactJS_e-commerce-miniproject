import React from 'react';
import './form-input.styles.scss'

const FormInput = ({label, onChange, ...otherProps}) => (
    <div className="form-input">
    <input onChange={onChange} {...otherProps} />
        {
            label ?
                <label className={`${otherProps.value.length ? 'shrink' : ''}`}>
                    {label}
                </label>
                : null
        }
    </div>
);

export default FormInput;