// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Gateway from '../pages/gateway'
import { useState, useEffect } from 'react'

const Home = () => {
  // formData stores the state of the add Peripheral_Devices form
  const [formData, setFormData] = useState({
    gateway: '',
    status: false,
    vendor: '',
  })
  // data stores the list of gateway devices
  const [data, setData] = useState([])
  // error serves as an error state flag as well as a store for the
  // error message string to be displayed to the user
  const [error, setError] = useState('')
  // call getData whenever this page is loaded into the DOM
  useEffect(() => {getData()}, [])
  const { gateway, status, vendor } = formData
  // Utility function for handling form changes
  const handleChange = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value, }))
  }
  // function to fetch the gateway data from the backend
  const getData = () => {
    fetch('/api/gateway').then(res => res.json()).then(res => {
      // check if response from backend contains the gateway data
      if (res.data){
        // store gateway data in stateful variable data
        setData(res.data)
      }
      // else handle error
      else {
        setError('An error occurred')
        alert('An error occurred')
      }
    }).catch(err => {
      console.error(err);
      setError('A connection error occurred')
      alert('An unexpected error occurred')
    })
  }
  // Function to add a Peripheral_Device to a gateway
  const addDevice = (e) => {
    e.preventDefault()
    if(gateway==''){
      alert('Please select a gateway')
      return
    }
    fetch(`/api/gateway/${gateway}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData, option: 'addDevice'})
    }).then(response => response.json()).then(res => {
      if(!res.status){
        alert('An error occurred')
      }
      else if(res.status && res.status==200){
        console.log(res)
        alert('Peripheral device added successfully')
        getData()
      } else if(res.status && res.status==400){
        alert(res.error)
      }
    }).catch(err => {
      console.error(err);
      alert('An error occurred')
    })
  }
// Function to remove a Peripheral_Device from a gateway
  const removeDevice = UID => {
    fetch(`/api/gateway/${gateway}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({UID: UID, option: 'removeDevice'})
    }).then(response => response.json()).then(res => {
      if(!res.status){
        alert('An error occurred')
      }
      else if(res.status && res.status==200){
        console.log(res)
        alert('Peripheral device removed successfully')
        getData()
      } else if(res.status && res.status==400){
        alert(res.error)
      }
    }).catch(err => {
      console.error(err);
      alert('An error occurred')
    })
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Gateway API</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold mb-10">
          Gateway API
        </h1>
        <div className="flex">
          <div className= 'mr-10'>
            <Gateway getData={getData}/>

              <form className='justify-centre rounded-sm border-black border-2 py-2 px-5 mb-2 w-full' onSubmit={addDevice}>

                <div className="">
                  <select className='rounded-sm border-black border-2 mb-3 border-solid w-full px-1' name='gateway' value={gateway} onChange={handleChange} >
                  <option value='' defaultValue="Gateway Terminal" >Select a Gateway</option>
                  {data.map((company) => (
                      <option  key={company._id} value={company._id} defaultValue="Gateway Terminal" >{company.name}</option>
                      ))}
                  </select>
                </div>
                <div>
                  {gateway ? data.filter(x => x._id == gateway)[0].Peripheral_Devices?.map(y => (
                    <div key={y.UID}>
                      <p><b>Vendor:</b> {y.vendor} </p>
                      <p><b>Date Created </b>{y['Date created']} </p>
                      <p><b>Status </b> {y.status == 'true' ? 1 : 0} </p>
                      <div className='form-group'>
                        <button className='bg-red-500 text-white mt-0 mb-2 px-5 py-2' onClick={e => removeDevice(y.UID)}>
                          Remove Peripheral Device
                        </button>
                      </div>
                    </div>
                  )) : ''
                }
                </div>
                <hr/>
                <h3 className="text-red-700">Add Peripheral Device</h3>
                <div className=''>
                  <input
                    required
                    type='text'
                    className='px-2 rounded-sm border-black border-2 mb-3 border-solid w-full'
                    name='vendor'
                    id='vendor'
                    placeholder='Vendor'
                    value={vendor}
                    onChange={handleChange}
                  />
                </div>

                <label className='mr-5'>
                <input className='mr-2 px-2' type="radio" value={true} name="status" onChange={handleChange}/>
                Onine
                </label>
                <label>
                <input className='mr-2  px-2' type="radio" value={false} name="status" onChange={handleChange}/>
                Offline
                </label>

                <div className='form-group'>
                  <button className='bg-black text-white mt-0 mb-2 px-5 py-2' type='submit'>
                    Add Peripheral Device
                  </button>
                </div>
              </form>
          </div>
          <div>
            {data.length ? (data.map(gateway => (
              <div className="rounded-sm border-black border-2 mb-2 p-5" key={gateway._id}>
              <p className=""><b>Terminal:</b> {gateway.name}</p>
              <p className=""><b>Ip Address:</b> {gateway.IPv4}</p>
              <p className=""><b>Universal Serial Number:</b> {gateway.USN}</p>
              {gateway.Peripheral_Devices && gateway.Peripheral_Devices.length ? gateway.Peripheral_Devices.map(device => (
                 <div key={device.UID}>
                  <h3 className="text-red-700">Peripheral Device</h3>
                  <p><b>UID:</b> {device.UID} </p>
                  <p><b>Vendor:</b> {device.vendor} </p>
                  <p><b>Date Created </b>{device['Date created']} </p>
                  <p><b>Status </b> {device.status ? 1 : 0} </p>
                 </div>
               )) : ''
             }
              </div>
            ))): error ? (
              <p>{error}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
      <p> Esiri Ekwale</p>
      </footer>
    </div>
  )
}

export default Home
