import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-8 px-8 md:px-[300px] py-8 flex flex-col md:flex-row justify-between bg-black text-white space-y-6 md:space-y-0 text-sm md:text-md'>
      <div>
        <p>Featured Blogs</p>
        <p>Most viewed</p>
        <p>Readers Choice</p>
      </div>
      <div>
         <p>Forum</p>
         <p>Support</p>
         <p>Recent Posts</p>
      </div>
      <div>
         <p>Privacy Policy</p>
         <p>About Us</p>
         <p>Terms & Conditions</p>
         <p>Terms of Service</p>
      </div>
    </div>
    <p className="py-2 pb-6 text-center text-white bg-black text-sm">All rights reserved @Blog Market 2023</p>
    </>
  )
}

export default Footer