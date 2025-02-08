import React from 'react'

const Navbar = () => {
  return (
    <nav className=' flex justify-between bg-slate-800 text-white h-12 items-center px-2 lg:px-20 md:px-18'>
      <div className="logo mx-4 text-2xl font-bold "><span className='text-green-500'>&lt;</span><span>Pass</span><span className='text-green-500'>OP/&gt;</span></div>
      <div className=''>
        <ul className='flex gap-4 mx-4'>
            <li className='hover:font-bold transition-all hover:border-b-2 hover:border-white'>Home</li>
            <li className='hover:font-bold transition-all hover:border-b-2 hover:border-white'>About</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
