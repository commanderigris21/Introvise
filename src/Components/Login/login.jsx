// eslint-disable-next-line no-unused-vars
import React from 'react'
import './login.css'

function login() {
  return (
    <div> 
      <nav className='Nav'>
        Introvise
        </nav>

      <div className='half'>
        <div className='ad'>
            <h1>AI-Powered Question Genration </h1> <br /> 
            <p>🧠 Uses AI & NLP to genrate <br /> customized questions across <br />  various category.  </p>
            </div>
        </div>
    <p className='head'> Welcome Back to <span>Introvise! </span> </p>
    <p className='sec'>Sign in with </p>

    <img className='img' src="gog.png" alt="Google Logo here" /> 
    <img className='img2' src="Git.png" alt="GitHub Logo Here"  />
    <img className='img3' src="Lin.png" alt="" />

    <span className='border'>
      <p className='text'> OR </p>
    </span>

    <p className='E'>Email</p>
    <input className='Email' type="text" placeholder='Value' />

    <p className='P'>Password</p>
    <input className='Pass' type="text" placeholder='Password' />

    <button className='btn'> Sign In</button>
    <a href="#" className='a'>Forgot password?</a>
     
    <p className='np'>Don&lsquo;t have an account?<a href="#">Sign Up</a></p>


    </div>

    
  )
}

export default login
