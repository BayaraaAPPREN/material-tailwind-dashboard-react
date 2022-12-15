import React, { useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useState } from 'react';
import {searchTrackUrd, searchTrackUrdPhone, urd, } from '../../uri/uri'
import axios from 'axios';
import {FiRefreshCw} from "react-icons/fi"
import {FaSearch} from 'react-icons/fa'
import Excel from '@/components/Excel';
import Pagination from '@/components/Pagination';

const Urd = () => {
  const [tracks, setTracks] = useState([]);
  const[all, setAll] = useState(true);
  const[zamdaa, setZamdaa] = useState(false);
  const [refresh, setRefresh] = useState();
  const [searchTrack, setSearchTrack] = useState();
  const [searchPhone, setSearchPhone] = useState();

  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTracks = tracks.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async ()=>{
      try{
        const res= await axios.get(urd)
        setTracks(res.data)
        setRefresh()
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[refresh]);

  const searchTracks = async ()=>{
    try{
      const res= await axios.post(searchTrackUrd, {track: searchTrack})
      setTracks(res.data)
    }catch(err){
      console.log(err)
    }
  };
  const searchPhones = async ()=>{
    try{
      const res= await axios.post(searchTrackUrdPhone, {track: searchPhone})
      setTracks(res.data)
    }catch(err){
      console.log(err)
    }
  };

  function HandleAll(){
    setAll(true);
    setZamdaa(false);
  }
  function HandleZamdaa(){
    setZamdaa(true);
    setAll(false);
  }
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
        <div className='flex justify-between'>
            <div>
            <Typography variant="h6" color="white">
              Урд ирсэн бараанууд
            </Typography>
            </div>
            <Excel/>
        </div>
        </CardHeader>
        <div className='flex flex-wrap items-center mb-4'>
            <div className=' mx-4 text-white'>
                <div className='flex xs:w-72 md:w-72 rounded-xl bg-blue-300 xs:mt-4 md:mt-0'>
                    <div  onClick={HandleAll} className={all ? 'w-1/2 flex justify-center py-2 bg-[#0000FF]/70 rounded-xl text-slate-50 cursor-pointer xs:text-xs md:text-sm' : 'xs:text-xs md:text-sm w-1/2 flex justify-center py-2 rounded-xl text-slate-700 cursor-pointer'}>
                        ТРАК КОДООР
                    </div>
                    <div onClick={HandleZamdaa} className={zamdaa ? 'w-1/2 flex justify-center py-2 uppercase bg-[#0000FF]/70 rounded-xl text-slate-50 cursor-pointer xs:text-xs md:text-sm' : 'xs:text-xs md:text-sm w-1/2 flex uppercase justify-center py-2 rounded-xl text-slate-700 cursor-pointer'}>
                        Утасны дугаараар
                    </div>
                </div>
            </div>
            {
            all?
            <div className='flex items-center flex-wrap'>
            {/* <h1>Трак кодоор хайх</h1> */}
            <input onChange={ e => setSearchTrack(e.target.value)} className='px-20 ml-4 py-2 mr-2 ring-1 ring-blue-400 outline-none rounded-md focus:ring-2' placeholder='Трак кодоор хайх'/>
            <div onClick={searchTracks} className='bg-[#D22F7C] p-2 rounded-md cursor-pointer hover:bg-[#D22F7C]/70'><FaSearch color='white' /></div>
            <div onClick={e=> setRefresh("ahha")} className='ml-2 bg-[#D22F7C] p-2 rounded-md cursor-pointer hover:bg-[#D22F7C]/70'><FiRefreshCw color='white' /></div>
            </div>
            :
            <div className='flex items-center'>
            {/* <h1>Утасны дугаараар хайх</h1> */}
            <input onChange={ e => setSearchPhone(e.target.value)} className='px-20 ml-4 py-2 mr-2 ring-1 ring-blue-400 outline-none rounded-md focus:ring-2' placeholder='Утасны дугаараар хайх'/>
            <div onClick={searchPhones} className='bg-[#D22F7C] p-2 rounded-md cursor-pointer hover:bg-[#D22F7C]/70'><FaSearch color='white' /></div>
            <div onClick={e=> setRefresh("ahha")} className='ml-2 bg-[#D22F7C] p-2 rounded-md cursor-pointer hover:bg-[#D22F7C]/70'><FiRefreshCw color='white' /></div>
            </div>
           }
           <div className='flex items-center'>
             {/* <Excel/> */}
           </div>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Захиалагч", "Трак код", "Тэмдэглэл", "Огноо", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTracks.map(
                ({ tabaoName, index, phoneNo, trackCode, note, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === tracks.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={index}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>{index}</div>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {tabaoName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {phoneNo}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {trackCode}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {note}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          className="text-xs font-semibold text-blue-gray-600 cursor-pointer"
                        >
                          Батлах
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={tracks.length}
            paginate={paginate}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Urd