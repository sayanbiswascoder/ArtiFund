"use client"
import React from 'react'
import { settleFunc } from '@/app/action/action'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import { Tab } from '@headlessui/react';

const Form = ({settlementid}) => {
  const tabs = [
    { name: 'UPI', key: 'upi' },
    { name: 'Bank', key: 'bank' },
    { name: 'Mobile', key: 'mobile' },
  ];

  // Function to handle form submission (replace with your actual logic)
  const handleSubmit = async(event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const submit = await settleFunc(formData)
    if(submit){
      toast.success("Your Application is submited succesfully!")
    }else{
      toast.error("Some error, Please try again latter!")
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-4 rounded-md">
          {tabs.map(({ name, key }) => (
            <Tab key={key} className='outline-none hover:bg-cyan-500 px-4 py-2 rounded' >
              {name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {tabs.map(({ key }) => (
            <Tab.Panel key={key} className='p-4 rounded-md shadow-sm'>
              <form  onSubmit={handleSubmit} className="space-y-4 flex flex-col items-end">
                <input
                  type="hidden"
                  name="settlementid"
                  value={settlementid} // Set hidden input for selected method
                />
                <input
                  type="hidden"
                  name="method"
                  value={key} // Set hidden input for selected method
                />
                <div className="flex flex-col w-full">
                  <label htmlFor="amount" className="text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="0"
                    step="0.01" // Allow decimal values
                    required
                    className="border rounded-md px-3 py-2 focus:bg-transparent bg-transparent outline-none"
                  />
                </div>
                {key === 'upi' && (
                  <div className="flex flex-col w-full">
                    <label htmlFor="upiId" className="text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      required
                      className="border rounded-md px-3 py-2  focus:bg-transparent bg-transparent outline-none"
                    />
                  </div>
                )}
                {(key === 'bank' || key === 'mobile') && (
                  <div className="flex flex-col space-y-2 w-full">
                    {key === 'bank' && (
                      <>
                        <label
                          htmlFor="accountNumber"
                          className="text-gray-700 mb-2"
                        >
                          Account Number
                        </label>
                        <input
                          type="text"
                          id="accountNumber"
                          name="accountNo"
                          required
                          className="border rounded-md px-3 py-2  focus:bg-transparent bg-transparent outline-none"
                        />
                      </>
                    )}
                    {key === 'bank' && (
                      <>
                        <label htmlFor="ifscCode" className="text-gray-700 mb-2">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          id="ifscCode"
                          name="accountIFSC"
                          required
                          className="border rounded-md px-3 py-2  focus:bg-transparent bg-transparent outline-none"
                        />
                      </>
                    )}
                    {key === 'mobile' && (
                      <>
                        <label htmlFor="mobileNumber" className="text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <input
                          type="tel" // Set input type to "tel" for phone number formatting (optional)
                          id="mobileNumber"
                          name="mobileNo"
                          required
                          className="border rounded-md px-3 py-2  focus:bg-transparent bg-transparent outline-none"
                        />
                      </>
                    )}
                  </div>
                )}
                <p className='text-gray-400'>Please re-check all details before submiting</p>
                <button type="submit" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
              </form>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <ToastContainer />
    </div>
  );
};

export default Form