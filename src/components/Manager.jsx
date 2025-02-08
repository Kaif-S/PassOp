import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const [form, setform] = useState({ site: "", name: "", password: "" })
    const [passwordsArray, setPasswordsArray] = useState([])
    let imgref = useRef()
    let passref = useRef()

    useEffect(() => {

        let passwords = JSON.parse(localStorage.getItem("passwords"))
        if (passwords) {
            setPasswordsArray(passwords)
        }
        else {

        }

    }, [])



    let showpass = () => {
        if (imgref.current.src.includes("images/view.png")) {
            imgref.current.src = "images/hide.png"
            passref.current.type = "text"
        }
        else {
            imgref.current.src = "images/view.png"
            passref.current.type = "password"
        }
    }
    let handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    let savePassword = () => {
        if(form.site != "" & form.name != "" & form.password != ""){
        setPasswordsArray([...passwordsArray, {...form,id:uuidv4()}])
        setform({site: "", name: "", password: ""})
        localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form,id:uuidv4()}]))
        }
        else{
            toast.error('Please enter properly', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    let copyText = (e) => {
        navigator.clipboard.writeText(e)
        toast.success('Copied to Clipboard📋', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    let deletePass = (id) => {
      let passaray = passwordsArray
      let newarray = new Array;
      passaray.forEach((item)=>{
        if(item.id != id){
            newarray.push(item)
        }
        else{
        }
      })
      setPasswordsArray(newarray)
      localStorage.setItem("passwords",JSON.stringify(newarray))

    }
    let editPass = (id) => {
      setform(passwordsArray.find((item)=>{
        return item.id === id;
      }))
      deletePass(id);
    }
    
    

    return (
        <>
            <div className=' container mx-auto pb-4 max-w-[50vw] mt-5'>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition="Bounce"
                />
                {/* Same as */}
                <ToastContainer />
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
                <div className='text-3xl font-bold text-black text-center m-3'>
                    <span className='text-green-500'>&lt;</span><span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                    <p className='text-xs mt-2 md:text-base'>We will store your passwords securly and will not share the to anyone</p>
                </div>
                <div className=' flex flex-col items-center'>
                    <input type="text" name='site' value={form.site} onChange={(e) => { handleChange(e) }} className='rounded-full w-4/5 m-3 py-2 px-3 bg-purple-100' placeholder='website URL' />
                    <div className='flex justify-between flex-col w-4/5'>
                        <div className='flex gap-3 flex-col w-full my-1 md:flex-col sm:flex-col lg:flex-row'>
                            <input type="text" name='name' value={form.name} onChange={(e) => { handleChange(e) }} className='rounded-full py-2 px-3 bg-purple-100 w-full sm:mx-auto' placeholder='name' />
                            <div className='relative w-full lg:w-2/5 sm:mx-auto'>
                                <input type="password" name='password' value={form.password} onChange={(e) => { handleChange(e) }} ref={passref} className='rounded-full py-2 px-3 bg-purple-100 w-full' placeholder='password' />
                                <span className='absolute top-1 right-0 pr-2'>
                                    <img src="images/view.png" width={34} ref={imgref} className='cursor-pointer' onClick={() => { showpass() }} alt="eye" />
                                </span>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => { savePassword() }} className='text-white bg-green-400 p-1 rounded-md hover:font-bold hover:bg-green-600 transition-all mt-2 flex items-center gap-1 mx-auto text-sm md:gap-3 md:mt-4 md:p-2 hover:shadow-xl'><lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>Add password</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="password container w-[70vw] mx-auto">
                <h1 className='font-bold text-2xl mb-3'>Your Passwords</h1>
                {passwordsArray.length === 0 && <div className=' font-bold'>No passwords to show</div>}
                {passwordsArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden">
                    <thead className='bg-green-800 text-white'>
                        <tr>
                            <th className='py-2'>Name</th>
                            <th className='py-2'>Website</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-300'>
                        {passwordsArray.map((item, index) => {
                            return <tr key={item.id}>
                                <td className='text-center py-2 border-white border'><div onClick={() => (copyText(item.name))} className='flex items-center justify-center'>{item.name}<div className='text-white size-7 cursor-pointer flex items-center justify-center ml-1'><lord-icon
                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                    trigger="hover"

                                    colors="primary:#121331,secondary:#000000">
                                </lord-icon></div></div>
                                </td>
                                <td className='text-center py-2 border-white border'><div onClick={() => (copyText(item.site))} className='flex items-center justify-center'>{item.site}<div className='text-white size-7 cursor-pointer flex items-center justify-center ml-1'><lord-icon
                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                    trigger="hover"

                                    colors="primary:#121331,secondary:#000000">
                                </lord-icon></div></div></td>
                                <td className='text-center py-2 border-white border '><div onClick={() => (copyText(item.password))} className='flex items-center justify-center'>{item.password}<div className='text-white size-7 cursor-pointer flex items-center justify-center ml-1'><lord-icon
                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                    trigger="hover"

                                    colors="primary:#121331,secondary:#000000">
                                </lord-icon></div></div>
                                </td>
                                <td className='py-2 border-white border flex justify-evenly items-center'>
                                    <div className='size-7' onClick={()=>{deletePass(item.id)}}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                        trigger="hover">
                                    </lord-icon>
                                    </div>
                                    <div className='size-7' onClick={()=>{editPass(item.id)}}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wuvorxbv.json"
                                        trigger="hover"
                                        colors="primary:#000000,secondary:#000000">
                                    </lord-icon>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default Manager
