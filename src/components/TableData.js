import { Fragment, useEffect, useState } from "react"


export const DealerTextFieldData = [{
  variant:"outlined",
  id:"username",
  type:"text",
  label:"Username",
  name:"userName",
  margin:"normal"
},{
  variant:"outlined",
  id:"password",
  type:"password",
  label:"Password",
  name:"password",
  margin:"normal"
},{
  variant:"outlined",
  id:"email",
  type:"email",
  label:"Email",
  name:"email",
  margin:"normal"
},{
  variant:"outlined",
  id:"address",
  type:"text",
  label:"Address",
  name:"city_name",
  margin:"normal"
},{
  variant:"outlined",
  id:"contact",
  type:"number",
  label:"ContactNo",
  name:"mobile_no",
  margin:"normal"
},
{
  variant:"outlined",
  id:"venueName",
  type:"text",
  label:"VenueName",
  name:"venueName",
  margin:"normal"
},
{
  variant:"outlined",
  id:"citizenShipNumber",
  type:"text",
  label:"CitizenshipNumber",
  name:"citizenShipNo",
  margin:"normal"
}
]
export const UserTextFieldData = [{
  variant:"outlined",
  id:"username",
  type:"text",
  label:"Username",
  name:"username",
  margin:"normal"
},{
  variant:"outlined",
  id:"password",
  type:"password",
  label:"Password",
  name:"password",
  margin:"normal"
},{
  variant:"outlined",
  id:"email",
  type:"email",
  label:"Email",
  name:"email",
  margin:"normal"
},{
  variant:"outlined",
  id:"city_name",
  type:"text",
  label:"Address",
  name:"city_name",
  margin:"normal"
},{
  variant:"outlined",
  id:"mobile_no",
  type:"number",
  label:"ContactNo",
  name:"mobile_no",
  margin:"normal"
}
]

export const AdminData = ()=> {

    const [adminrequest,setAdminRequest] = useState([])

    useEffect(()=>{
        let value = true
        async function getData(){
        if(value){
           let request = await fetch("http://localhost:8888/admin-/registerRequests",{
            headers:{
                Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
            }
           })
           let response = await request.json()
           console.log(response)
           let data = response.data
           setAdminRequest((prevValue) => prevValue = data)
        }
        }
        getData()
        return ()=>{
            value = false
        }
    },[])

  return adminrequest
}

export const VenueData = ()=> {

  const[venueRequest,setVenueRequest] = useState([])

  useEffect(()=>{
    let value = true
    async function getData(){
    if(value){
       let request = await fetch(`http://localhost:8888/venue-/requests/${JSON.parse(sessionStorage.getItem("email"))}`,{
       method:"GET", 
       headers:{
            Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
        }
       })
       let response = await request.json()
       console.log(response)
       let data = response.data
       setVenueRequest((prevValue) => prevValue = data)
    }
    }
    getData()
    return ()=>{
        value = false
    }
},[]
)

return venueRequest
}