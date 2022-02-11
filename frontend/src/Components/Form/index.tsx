import { useState } from "react"
import { Form, FormGroup, Label, Input, Button, FormText, InputGroupText } from "reactstrap"

import { HeaderForm } from "../Header"

import { Container } from "./styles"
import { apiPOST } from "../../Services"

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * react mask input - ADD
 * 
 * https://sanniassin.github.io/react-input-mask/demo.html
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */





export function FormMain() { 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [cep, setCep] = useState("")
    const [addressNumber, setAddressNumber] = useState(0)
    const [uf, setUf] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")

    function searchAddress() {
        fetch("https://viacep.com.br/ws/"+cep+"/json/", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setCity(response.localidade) // cidade
            setUf(response.uf) // estado
            setAddress(response.logradouro) // rua
            console.log(response)
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    async function onSubmit() {
        await apiPOST({
            name,
            email,
            phone,
            cep,
            addressNumber,
            city,
            uf,
            address,
        }, "https://localhost.com/3333")
    }

    return (
        <Container>
            <HeaderForm />
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label>Nome *</Label>
                    <Input name="name" placeholder="Ex: Alisson Fabricio" type="text" onChange={event => {
                        setName(String(event.target.value))
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label>Email *</Label>
                    <Input name="email" placeholder="Ex: email@test.com" type="email" onChange={event => {
                        setEmail(String(event.target.value))
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label>Número (celular) *</Label>
                    <Input name="phone" placeholder="Ex: (11) 99999-9999" type="text" onChange={event => {
                        setPhone(String(event.target.value))
                    }}/>
                </FormGroup>
                <FormGroup className="cep">
                    <Label>Cep *</Label>
                    <Input name="cep" placeholder="Ex: 06000-000" type="text" onChange={event => {
                        setCep(String(event.target.value))
                    }} />
                    <Button className="b" onClick={searchAddress}>buscar</Button>
                </FormGroup>
                <FormGroup>
                    <Label>Número (Endereço) *</Label>
                    <Input name="addressNumber" placeholder="Ex: 225" type="number" onChange={event => {
                        setAddressNumber(Number(event.target.value))
                    }} />
                </FormGroup>
                <FormGroup>
                    <Label>Estado</Label>
                    <Input name="state" placeholder="Ex: São Paulo" type="text" onChange={function(event) {
                        console.log(event.target.value);
                    }} value={uf} />
                </FormGroup>
                <FormGroup>
                    <Label>Cidade</Label>
                    <Input name="city" placeholder="Ex: Osasco" type="text" onChange={function(event) {
                        console.log(event.target.value);
                    }} value={city} />
                </FormGroup>
                <FormGroup>
                    <Label>Endereço</Label>
                    <Input name="address" placeholder="Ex: Rua João Colino" type="text"onChange={function(event) {
                        console.log(event.target.value);
                    }} value={address} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">Curriculo</Label>
                    <Input id="e" name="file" type="file" />
                    <InputGroupText>Adicione seu curriculo aqui</InputGroupText>
                </FormGroup>
                <Button>Enviar</Button>
            </Form>
        </Container>
    )
}