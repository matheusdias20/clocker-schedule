import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  FormHelperText,
  InputGroup, 
  InputLeftAddon} from '@chakra-ui/react';

import { Logo, useAuth } from './../components';



const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail Inválido').required('Preenchimento Obrigatório'),
  password: yup.string().required('Preenchimento Obrigatório'),
  username: yup.string().required('Preenchimento Obrigatório'),
})

export default function Home() {

  const [auth, { signup }] = useAuth()
  const router = useRouter()

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    onSubmit: signup,
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

        <FormControl id="username" pb={4} pt={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />
            <Input type="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
          </InputGroup>
          {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>}
        </FormControl>

        <Box pt={4}>
          <Button width="100%" onClick={handleSubmit} isLoading={isSubmitting} colorScheme="blue" >Entrar</Button>
        </Box>
      </Box>

      <Text pt={4}>Já tem um conta?<Link href="/"> Acesse</Link></Text>

    </Container>
  )
}
