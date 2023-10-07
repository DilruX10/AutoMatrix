import React from 'react'
import image from './image1.jpg' // replace with your image file path
import './HomePage.css'
const HomePage = () => {
  return (
    <div className='homepage-container'>
      <div className='homepage-text'>
        <h1>WELCOME TO THE AUTO MATRIX DRIVING SCHOOL</h1>
        <div className='homepage-para'>
          <p>We offer the best driving lessons in town!</p>
          <p>
            A driving school is an institution that offers driving lessons and
            education to individuals who want to learn how to drive. These
            schools typically employ certified instructors who provide both
            theoretical and practical lessons to their students. The curriculum
            usually covers topics such as traffic laws, road safety, and vehicle
            maintenance. A good driving school provides a safe and controlled
            environment for learning how to operate a vehicle and helps students
            develop the skills and confidence necessary to become responsible
            drivers. Completing a driving course from a reputable driving school
            can increase an individual's chances of passing the driving test and
            obtaining a driver's license.
          </p>

          <p>
            Driving schools are an essential part of learning how to drive
            safely and confidently. Not only do they teach the necessary skills
            for operating a vehicle, but they also provide important lessons in
            road safety and defensive driving. A good driving school will offer
            a comprehensive curriculum that covers everything from basic driving
            maneuvers to navigating complex traffic situations. Additionally,
            they will have experienced and knowledgeable instructors who can
            provide individualized feedback and support to help each student
            succeed. Whether you are a new driver or someone looking to improve
            your skills, a driving school can provide you with the education and
            training you need to become a safe and responsible driver.
          </p>
        </div>
      </div>
      <div className='homepage-image'>
        <img src={image} alt='Driving School' />
      </div>
    </div>
  )
}

export default HomePage
