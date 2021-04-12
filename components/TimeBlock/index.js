import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { format } from 'date-fns'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import { Input } from '../Input'


const setSchedule = async ({ date, ...data }) => axios ({
    method: 'POST',
    url: '/api/schedule',
    data: { 
        ...data,
        date: format(date, 'yyyy-MM-dd'),
        username: window.location.pathname.replace('/', '') 
    },    
})
 
const ModalTimeBlock = ({ isOpen, onClose, onComplete, isSubmitting, children }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Reserve seu horário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            { children }
        </ModalBody>

        <ModalFooter>
            { !isSubmitting && <Button variant="ghost" onClick={onClose}>Cancelar</Button>}
            <Button colorScheme="blue" mr={3} onClick={onComplete} isLoading={isSubmitting}>
                Reservar Horário
            </Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
)

export const TimeBlock = ({ time, date, disabled, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(prevState => !prevState)

    const { values, handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting }= useFormik({
        onSubmit: async (values) =>{
            try {
                await setSchedule({ ...values, time, date })
                toggle()
                onSuccess()
            } catch (error) {

            }
        },
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Preenchimento Obrigatório'),
            phone: yup.string().required('Preenchimento Obrigatório'),
        })
    })

    return (
        <Button p={8} bg="blue.500" color="white" onClick={toggle} disabled={disabled}>
            { time }

            {!disabled && <ModalTimeBlock 
                isOpen={isOpen} 
                onClose={toggle} 
                onComplete={handleSubmit} 
                isSubmitting={isSubmitting}
            >
                <> 
                    <Input
                        label="Nome:" 
                        touched={touched.name}
                        placeholder="Digite seu nome" 
                        size="lg" 
                        name="name" 
                        value={values.name} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        errors={errors.name}
                        disabled={isSubmitting}
                    />
                    <Input 
                        label="Telefone:" 
                        placeholder="(99) 9 9999 9999" 
                        size="lg" 
                        name="phone" 
                        mask={['(99) 9999-9999', '(99) 9 9999-9999']}
                        value={values.phone} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        errors={errors.phone}
                        mt={4} 
                        disabled={isSubmitting}
                    />
                </>
            </ModalTimeBlock>}
        </Button>
    )
}