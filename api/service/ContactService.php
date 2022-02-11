<?php

class ContactService {
    private $db;
    private $token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    public function __construct() {
        $this->db = new mysqli('localhost', 'root', '', 'safety_db');
    }

    public function conection() {
        $response = ['status' => true, 'message' => 'conexão estabelecida com sucesso'];

        if (!$this->em) {
            $response = ['status' => false, 'message' => 'Ocorreu um erro na conexão' . mysqli_connect_error()];
        }

        return $response;
    }

    public function insert($request) {
        $token = isset($request['token']) ? $request['token'] : null;
        $name = isset($request['name']) ? $request['name'] : null;
        $mail = isset($request['mail']) ? $request['mail'] : null;
        $phone = isset($request['phone']) ? $request['phone'] : null;
        $cep = isset($request['cep']) ? $request['cep'] : null;
        $addressNumber = isset($request['addressNumber']) ? $request['addressNumber'] : null;
        $city = isset($request['city']) ? $request['city'] : null;
        $uf = isset($request['uf']) ? $request['uf'] : null;
        $address = isset($request['address']) ? $request['address'] : null;
        
        $error = [];
        
        if($token) {
            if($token !== $this->token) {       
                $error['token'] = 'Token inválido';
            }
        } else {
            $error['token'] = 'O Token é obrigatório';
        }

        if(!$name) {
            $error['name'] = 'O nome é obrigatório';
        } 

        if(!$mail) {
            $error['mail'] = 'O e-mail é obrigatório';
        } 

        if(!$phone) {
            $error['phone'] = 'O número celular é obrigatório';
        }

        if(!$cep) {
            $error['cep'] = 'O CEP é um campo obrigatório';
        }

        if(!$addressNumber) {
            $error['addressNumber'] = 'O número de sua residencia é obrigatório';
        }

        if(count($error) > 0) {
            $response = ['status' => false, 'message' => 'Campos obrigatórios'];
            return $error;
        }
       
        $date = date('Y-m-d h:i:s');
        $sql = "INSERT INTO contact (name, mail, phone, cep, address_number, state, city, address, created_at)
                    VALUES ('{$name}','{$mail}', '{$phone}', '{$cep}', $addressNumber, '{$uf}', '{$city}', '{$address}', '{$date}');";
        
        if ($this->db->query($sql) === true) {
            $response = ['status' => true, 'message' => 'Contato enviado com sucesso'];
            return $response;
        }

        $response = ['status' => false, 'message' => 'Ocorreu um erro na conexão ' . mysqli_connect_error()];

        return $response;
    } /* this.db.query()*/
}

?> 