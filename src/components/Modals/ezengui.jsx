import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    Button,
    Input,
    useDisclosure
  } from '@chakra-ui/react'
import axios from 'axios';
import { ezengui } from '@/uri/uri';

const EzenguiAdd = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [code, setCode] = useState()
    const [cost, setCost] = useState()

    const SubmitEzengui = async ()=>{
        try{
          const res= await axios.post(ezengui, {
            pay: cost,
            date: new Date(),
            type: 11,
            trackCode: code,
            userId:19
          })
          console.log(res.data)
          onClose();
          toast({title: 'Амжилттай',description: "Эзэнгүй бараа нэмлээ",status: 'success',duration: 3000,isClosable: true,})
        }catch(err){
          console.log(err)
        }
      };
  return (
    <>
    <Button onClick={onOpen} className='text-black'>Эзэнгүй бараа нэмэх</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Эзэнгүй бараа нэмэх</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Input onChange={ e => setCode(e.target.value)} placeholder='Трак кодоо оруулаарай'/>
            <Input onChange={ e => setCost(e.target.value)} placeholder='Үнэ оруулах' className='mt-2'/>
            </ModalBody>

            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
                Гарах
            </Button>
            <Button colorScheme='teal' size='md' onClick={SubmitEzengui}>Нэмэх</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
  </>
  )
}

export default EzenguiAdd