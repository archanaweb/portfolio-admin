'use client';
import {FormEvent, useEffect, useState} from 'react';
import {intro} from '@/app/utils/interfaces';
import {intialIntro} from '@/app/utils/initialvalues';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditIntro() {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');

    const [introdata, setIntrodata] = useState<intro>(intialIntro);
    
    const fetchData = async () => {
      try {
        const response = await fetch('/api/editintro');
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData)
          setIntrodata(responseData.data[0]);
        
        } else {
          console.log('Error:', response.status);
          toast.error("Something went wrong")
        }
      } catch (error) {
        console.log('Error:', error);
        toast.error("Something went wrong")
      } 
    };

    useEffect(() => {
      fetchData();
    }, []);



    useEffect(() => {
        if(introdata?.title != "" && introdata?.title){
          setTitle(introdata.title)
        }
        if(introdata?.name != "" && introdata?.name){
          setName(introdata.name)
        }
        if(introdata?.profile != "" && introdata?.profile){
          setProfile(introdata.profile)
        }

    }, [introdata])
  


    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/editintro', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, name, profile }),
            });
      
            if (response.ok) {
              fetchData();
              console.log('Data inserted successfully');
              toast.success("Saved successfully!");
            } else {
              console.error('Error inserting data');
              toast.error("Something went wrong")
            }
          } catch (error) {
            console.error('Error inserting data:', error);
            toast.error("Something went wrong")
          }
    };

    return (
        <div className="w-full max-w-lg m-auto">
            <h2>Edit Intro</h2>

            {/* {introdata && <div> <h2>{introdata.title}</h2>
            <p>{introdata.name}</p><h3>{intialIntro.profile}</h3>
            </div>} */}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile">
                    Profile
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="profile" type="text" placeholder="Profile" value={profile} onChange={(e)=>setProfile(e.target.value)}/>
                </div>
                
                <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Save
                </button>

                </div>
            </form>
            <ToastContainer />
        </div>
    );
}