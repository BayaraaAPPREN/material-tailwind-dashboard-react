import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import axios from "axios"
import { Spinner, useToast } from '@chakra-ui/react'
import {urd} from '../../uri/uri'

const Excel = () => {
    const toast = useToast();
    const [excel, setExcel] = useState()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [too, setToo] = useState(false)

    

    useEffect(() => {
      const fetchData = async ()=>{
        try{
          const res= await axios.get(urd)
          setData(res.data)
        }catch(err){
          console.log(err)
        }
      };
      fetchData();
    },[data]); 

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                setExcel(json)
                setToo(true)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    const HandleSubmit = async (e) => {
     if(excel){
      setLoading(true)
      console.log(data)
      let i;
      let d;
        console.log("ss")
        for( i = 0; i<excel.length; i++){
          for( d = 0; d<data.length; d++){
            console.log("start")
            if(excel[i].trackCode == data[d].trackCode){
              console.log(data[d].id)
              try{
                const res = await axios.get(urdType + data[d].id)
                console.log(res.data)
              }catch(err){
                console.log(err)
              }
            }
          }
        }
        toast({title: 'Амжилттай',description: "Бүх төлөвийг сольж дууслаа",status: 'success',duration: 3000,isClosable: true,})
        setLoading(false)
     }else{
      toast({title: 'Анхаараарай',description: "Та файлаа оруулна уу !",status: 'warning',duration: 3000,isClosable: true,})
     }
      
      };
  return (
    <div className='flex items-center'>
        <form  className='flex items-center flex-wrap'>
            <input   
               type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile} className='text-xs mx-2 w-44'/>
              {
                loading?
                <div className=' flex items-center'>
                  <Spinner color='red.500' size="md" />
                  <h1 className='text-sm'>Уншиж байна...</h1>
                </div>
                :
                <div onClick={HandleSubmit} className='bg-green-500 text-white cursor-pointer hover:bg-green-600 px-2 rounded-lg'>Батлах</div>
              }
        </form>
    </div>
  )
}

export default Excel