import { DateTimePicker } from '@mui/x-date-pickers'
import React, { Fragment } from 'react'


const DatePickerComponent = (props) => {

  return (
    <Fragment>
        <DateTimePicker
            label={props.label}
            disablePast
            required={true} 
            value={props.value}
            onChange={(newValue)=> { 
              props.setTerm(newValue) 
              props.setClick((prevValue=> prevValue = !prevValue))}} 
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
    </Fragment>
  )
}

// props.arrayitem !== "" ? (e)=>props.setTerm((prevValue)=>({...props.arrayitem,[props.name]:props.value})): ""

export default DatePickerComponent