import { useState } from "react"
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter } from "reactstrap"

import { HeaderForm } from "../Header"

import { Container } from "./styles"

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

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [cep, setCep] = useState("")
    const [cepResponse, setCepResponse] = useState("")
    const [addressNumber, setAddressNumber] = useState()
    const [uf, setUf] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")

    async function searchAddress() {
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
    
    function onSubmit(event: any) {
        event.preventDefault()
        const data = new FormData(event.target)

        data.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.status) {
                setModalIsOpen(true)
                setModalMessage(response.message)
            } else {
                setName(response.name)
                setMail(response.mail)
                setPhone(response.phone)
                setCepResponse(response.cep)
                setAddressNumber(response.addressNumber)
                setUf(response.uf)
                setCity(response.city)
                setAddress(response.address)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <Container>
            <HeaderForm />
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label>Nome *</Label>
                    <Input name="name" placeholder="Ex: Alisson Fabricio" type="text" />
                    <label className="error">{name}</label>
                </FormGroup>
                <FormGroup>
                    <Label>Email *</Label>
                    <Input name="mail" placeholder="Ex: email@test.com" type="email" />
                    <label className="error">{mail}</label>
                </FormGroup>
                <FormGroup>
                    <Label>Número (celular) *</Label>
                    <Input name="phone" placeholder="Ex: (11) 99999-9999" type="text" />
                    <label className="error">{phone}</label>
                </FormGroup>
                <FormGroup className="cep">
                    <Label>Cep *</Label>
                    <Input name="cep" placeholder="Ex: 06000-000" type="text" onChange={event => {
                        setCep(String(event.target.value))
                    }} />
                    <Button color="primary" outline onClick={searchAddress}>
                        Buscar CEP
                    </Button><br />
                    <label className="error">{cepResponse}</label>
                </FormGroup>
                <FormGroup>
                    <Label>Número (Endereço)</Label>
                    <Input name="addressNumber" placeholder="Ex: 225" type="number" />
                    <label className="error">{addressNumber}</label>
                </FormGroup>
                <FormGroup>
                    <Label>Estado</Label>
                    <Input name="uf" placeholder="Ex: São Paulo" type="text" value={uf} />
                </FormGroup>
                <FormGroup>
                    <Label>Cidade</Label>
                    <Input name="city" placeholder="Ex: Osasco" type="text" value={city} />
                </FormGroup>
                <FormGroup>
                    <Label>Endereço</Label>
                    <Input name="address" placeholder="Ex: Rua João Colino" type="text" value={address} />
                </FormGroup>
                <Button>Enviar</Button>
            </Form>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} 
                toggle={() => setModalIsOpen(false)}
                className="modal"
                centered
                fullscreen="md"
                size="sm"
            >
                <ModalBody className="text-center">{modalMessage}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        setModalIsOpen(false)
                        window.location.reload()
                    }}>
                        Fechar
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
