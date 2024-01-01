import React, { Fragment } from "react";
const Input=(props)=>{
    return (
        <Fragment>
            <label>{props.label}</label>
            <input type={props.type} placeholder={props.placeholder} className={props.className}
             onClick={props.onClick} onChange={props.onChange} value={props.value}/>
        </Fragment>
    )
}
export default Input;