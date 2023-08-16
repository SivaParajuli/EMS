import { TextField } from '@mui/material'
import React, { Fragment } from 'react'

const TextFieldComponent = (props) => {
    console.log(props)
    return (
        <Fragment>
            <TextField 
              variant="outlined"
              required
              fullWidth
              id={props.id}
              type={props.type}
              label={props.label}
              value={props.value}
              onChange={props.arrayitem ? props.arrayitem == "" ?   
              (e)=>props.setTerm((prevValue) => prevValue = e.target.value) : 
              (e)=>props.setTerm((prevValue) => {return {...props.arrayitem, [e.target.name]:e.target.value}}):
              props.reducer == "" ? (e) => props.setTerm({type:e.target.name, payload:e.target.value}): " "}
              name={props.name}
              margin="normal"
            />
        </Fragment>  
        )
}

export default TextFieldComponent