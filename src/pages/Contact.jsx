import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {validateEmail, validateRequired} from '../utils/validation'
import '../styles/Forms.css'



const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
        if(errors[name]) setErrors(prev => ({...prev, [name]: ''}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}

        if(!validateRequired(formData.name)) newErrors.name = 'Name is Required'
        if(!validateEmail(formData.email)) newErrors.email = 'valid Email is Required'
        if(!validateRequired(formData.message)) newErrors.message = 'Message is Required'

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setLoading(true)

        try {
            //call the n8n hook for contact submission
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL_CONTACT_PAGE
            if(webhookUrl) {
                console.log('Sending contact data to n8n webhook: ', formData)
                const response = await axios.post(webhookUrl, formData)
                console.log('n8n webhook Response: ', response.data)
            } else {
                console.warn('n8n contact webhook URL is not defined in environement Variables')
            }

            setSubmitted(true)
            setFormData({name: '', email: '', message: ''})
        } catch (error) {
            console.error('Error sending Message', error)
            alert('There was an error sendingYour message. Please Try Again')
        } finally {
            setLoading(false)
        }
    }

    if(submitted) {
        return(
            <div className="form-container" style={{textAlign: 'center'}}>
                <h2 className="form-title">Thank You</h2>
                <p>Your Message has been sent successfully we will get back to you soon.</p>
                <button className="submit-btn" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
        )
    }

  return (
    <div className='form-container'>
        <h2 className="form-title">Contact Us</h2>
        <form onSubmit= {handleSubmit}>
            <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" 
                    name='name'
                    className='form-input'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Your Name'
                />
                {errors.name && <div className='form-error'>{errors.name}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" 
                    name='email'
                    className='form-input'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Your Email'
                />
                {errors.email && <div className='form-error'>{errors.email}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                    name='message'
                    className='form-input'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='How we can help you'
                />
                {errors.message && <div className='form-error'>{errors.message}</div>}
            </div>

            <button type='submit' className='submit-btn' disabled= {loading}>
                {loading ? 'Sending' : 'Send Message'}
            </button>
        </form>
    </div>
  )
}

export default Contact
