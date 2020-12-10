import React, { useCallback, useRef } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import Input from '../Input';
import TextArea from '../TextArea';
import { Container, Span, Button, FormUnform } from './styles'

function SideMenu() {

  const formRef = useRef(null);

  const handleSubmit = useCallback(async (data) => {

    try {

      const schema = Yup.object().shape({
        title: Yup.string().required('O Título é obrigatório'),
        lat: Yup.string().required('A latitude é obrigatória'),
        lng: Yup.string().required('A longitude é obrigatória'),
        guidance: Yup.string().required('A orientação é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      // criar formdata

      const formData = new FormData();

      formData.append('title', data.title)
      formData.append('file', data.image)

      const resp = await axios.post('points', formData)

      console.log(resp.data)
      // chamar api

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        return
      }

      alert(err.toString());

    }
  }, [])

  return (
    <Container>
      <FormUnform ref={formRef} onSubmit={handleSubmit}>
        <Span>Adicionar Local</Span>
        <Input type='text' name='title' placeholder='Local' />
        <Input type='text' name='lat' placeholder='Latitude' />
        <Input type='text' name='lng' placeholder='Longitude' />
        <Input type='file' name='image' placeholder='Imagem' />
        <TextArea type='text' name='guidance' placeholder='Orientação para imunização' />
        <Button type="submit">Adicionar</Button>
      </FormUnform>
    </Container>
  )
}

export default SideMenu