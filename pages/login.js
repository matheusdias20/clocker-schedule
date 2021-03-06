import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { 
  Container, 
  Box, 
  Input, 
  Button, 
  Text, 
  FormControl, 
  FormLabel, 
  FormHelperText} from '@chakra-ui/react';

import { Logo, useAuth } from './../components';



const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail Inválido').required('Preenchimento Obrigatório'),
  password: yup.string().required('Preenchimento Obrigatório'),
})

export default function Login() {
  const [auth, { login }] = useAuth() 

  const router = useRouter()

  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    isSubmitting 
  } = useFormik({
    onSubmit: login,
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
    }
  })

  useEffect(() => {
    auth.user && router.push('/agenda') 
  }, [auth.user]);

  return (
    <Container p={4} centerContent>

      <Logo />

      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id="email" pb={4} isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id="password" pb={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
        </FormControl>

        <Box pt={4}>
          <Button width="100%" onClick={handleSubmit} isLoading={isSubmitting} colorScheme="blue" >Entrar</Button>
        </Box>
      </Box>

      <Text pt={4}>Ainda não tem uma conta?<Link href="/signup"> Cadastre-se</Link></Text>
    </Container>
  )
}
