import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import validator from "validator";
import * as Yup from "yup";

import ButtonComponent from "../../components/button/index";
import InputComponent from "../../components/input";
import { useToast } from "../../hooks/toastContext";
import api from "../../services/clientAPI";
import logo from "../../styles/img/logo.svg";
import getValidationError from "../../utils/getValidationErrors";
import { Background, Container, Content, AnimationContainer } from "./style";

interface IData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    /* const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback(async (data: IData) => {
        try {
            const Schema = Yup.object().shape({
                name: Yup.string().required("nome é obrigatorío"),
                email: Yup.string()
                    .required("nome é obrigatorío")
                    .email("digite um e-mail valído"),
                password: Yup.string().min(6, "no minimo 6 digitos"),
            });

            await Schema.validate(data);
        } catch (error) {
            console.log(error);
            formRef.current?.setErrors({
                name: "nome obrigatorio",
            });
        }
    }, []); */

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = async (data: IData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required("esse campo é obrigatorio"),
                email: Yup.string()
                    .required("esse campo é obrigatorio")
                    .email("digite um email valido"),
                password: Yup.string().min(6, "no minimo 6 digitos"),
            });
            await schema.validate(data, {
                abortEarly: false,
                strict: false,
                context: {},
            });
            api.post("/users", data);
            history.push("/");
            addToast({
                type: "success",
                title: "Sucesso no cadastro",
                description: "Seu cadastro foi realizado com sucesso",
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: "error",
                title: "Erro na autenticação",
                description:
                    "verifique as credenciais digitadas e tente novamente",
            });
        }
    };

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <InputComponent
                            icon={FiUser}
                            name="name"
                            type="text"
                            placeholder="nome"
                        />
                        <InputComponent
                            icon={FiMail}
                            name="email"
                            type="text"
                            placeholder="e-mail"
                        />
                        <InputComponent
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="senha"
                        />
                        <ButtonComponent type="submit">
                            Cadastrar
                        </ButtonComponent>
                    </Form>
                    <Link to="/">
                        <FiUser />
                        <p>faça seu Login</p>
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
