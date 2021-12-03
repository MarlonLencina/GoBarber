import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useRef, useContext } from "react";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import ButtonComponent from "../../components/button/index";
import InputComponent from "../../components/input";
import { useAuth } from "../../hooks/authContext";
import { useToast } from "../../hooks/toastContext";
import logo from "../../styles/img/logo.svg";
import getValidationError from "../../utils/getValidationErrors";
import { Background, Container, Content, AnimationContainer } from "./style";

interface signinFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const { user, signin } = useAuth();
    const { addToast, removeToast } = useToast();

    const formRef = useRef<FormHandles>(null);
    const handleSubmitForm = async (data: signinFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("email obrigatoria")
                    .email("digite um email valido"),
                password: Yup.string().required("senha obrigatoria"),
            });
            await schema.validate(data, {
                abortEarly: false,
                strict: false,
                context: {},
            });

            await signin({
                email: data.email,
                password: data.password,
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
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="" />
                    <Form ref={formRef} onSubmit={handleSubmitForm}>
                        <h1>Faça seu Logon</h1>
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
                        <ButtonComponent type="submit">Entrar</ButtonComponent>
                    </Form>
                    <Link to="/forgotPassword">
                        <FiLogIn />
                        <p>Esqueci minha senha</p>
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
