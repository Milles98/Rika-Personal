import React from 'react'


const Detailssection = () => {
    return (
        <section>
            <div className='flex gap-4 px-4 py-8'>
                <div className='flex-none'>
                    <h1 className='text-black font-mont text-[18px] font-extrabold leading-[150%]'>On Ear Headphone</h1>
                    <p className='font-mont'>Beats Solo3 Wireless Kulak</p>
                </div>
                <div className='grow'></div>
                <div className='flex-none'>
                    <button className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full'>- 1 +</button>
                </div>



            </div>
            <div className='flex gap-4 px-4 flex-col'>
                <h1 className='text-black font-mont text-[18px] font-extrabold leading-[150%]'>Description</h1>
                <p className='font-mont'>A roomy backpack from the specialists in everyday bags at Herschel Supply Co., featuring resilient canvas and a light-blue patina that feels just right for summer.</p>
            </div>

            <div className='flex-col gap-4 px-4 py-6'>
                <h1 className='text-black font-mont text-[18px] font-extrabold leading-[150%]'>Size</h1>
                <div className='flex justify-center'>
                    <div className='flex gap-4 py-4'>
                        <button className='bg-white border border-2 hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded-full'>S</button>
                        <button className='bg-white border border-2 hover:bg-black hover:text-white text-black font-bold py-2 px-3 rounded-full'>M</button>
                        <button className='bg-white border border-2 hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded-full'>L</button>
                    </div>
                    <div className='grow'></div>
                    <div className='flex gap-3 py-6 px-3 border rounded-full'>
                        <button className='bg-[#d9ccce] border border-2 hover:bg-[#d9ccce]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#4d4a5d] border border-2 hover:bg-[#4d4a5d]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#222222] border border-2 hover:bg-[#222222]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#ffffff] border border-2 hover:bg-[#808080]/[.1] hover:text-white text-black font-bold px-3 rounded-full'></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Detailssection
