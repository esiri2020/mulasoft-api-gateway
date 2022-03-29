import { useState } from 'react'

function Gateway({getData}) {
  const [formData, setFormData] = useState({
      name: '',
      vendor: '',
      IPv4: '',
      USN: '',
    })
  const { name, IPv4, USN } = formData

  const handleChange = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value, }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    fetch('/api/gateway', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json()).then(res => {
      if(!res.status){
        alert('An error occured')
      }
      else if(res.status && res.status==200){
        console.log(res)
        alert('Gateway created successfully')
        if(getData){
          getData()
        }
      } else if(res.status && res.status==400){
        alert(res.error)
      }
    }).catch(err => {
      console.error(err);
      alert('An error occured')
    })
  }

  return (
    <section className=''>
      <form className='justify-centre rounded-sm border-black border-2 py-2 px-5 mb-2 w-full' onSubmit={onSubmit}>
        <div className=''>

          <input
            required
            type='text'
            className='rounded-sm border-black border-2 mb-3 border-solid w-full px-2'
            name='name'
            placeholder='Gateway Terminal'
            id='name'
            value={name}
            onChange={handleChange}
          />
        </div>


        <div className=''>

          <input
            required
            type='text'
            className='rounded-sm border-black border-2 mb-3 border-solid w-full px-2'
            name='IPv4'
            id='IPv4'
            placeholder='IPv4 address'
            value={IPv4}
            onChange={handleChange}
          />
        </div>

        <div className=''>
          <input
            required
            type='text'
            className='rounded-sm border-black border-2 mb-3 border-solid w-full px-2'
            name='USN'
            id='USN'
            placeholder='USN'
            value={USN}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <button className='bg-black text-white mt-0 mb-2 px-5 py-2' type='submit'>
            Add Gateway Terminal
          </button>
        </div>

      </form>

    </section>
  )
}

export default Gateway
