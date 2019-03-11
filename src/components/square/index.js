import React from 'react';
import './index.css';

export default function square(props) {
    return (
        <div className={"square "}
             onClick={props.onClick}>
             <div className={props.value + props.isZardoz}>
             </div>
             &nbsp;
        </div>
    )
}