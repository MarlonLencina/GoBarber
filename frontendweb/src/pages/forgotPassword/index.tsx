import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useRef, useContext, useState } from "react";
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
}

const forgotPassword: React.FC = () => {
    const { user, signin, sendForgotPasswordRequest } = useAuth();
    const { addToast, removeToast } = useToast();
    const [loading, setLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);
    const handleSubmitForm = async (data: signinFormData) => {
        try {
            setLoading(true);
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("email obrigatoria")
                    .email("digite um email valido"),
            });
            await schema.validate(data, {
                abortEarly: false,
                strict: false,
                context: {},
            });

            await sendForgotPasswordRequest({
                email: data.email,
            });

            addToast({
                type: "success",
                title: "E-mail enviado com sucesso",
                description: "um e-mail com seu reset de senha foi enviado.",
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: "error",
                title: "Erro na recuperação de senha",
                description:
                    "verifique as credenciais digitadas e tente recuperar novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="" />
                    <Form ref={formRef} onSubmit={handleSubmitForm}>
                        <h1>Recupere sua senha</h1>
                        <InputComponent
                            icon={FiMail}
                            name="email"
                            type="text"
                            placeholder="e-mail"
                        />

                        <ButtonComponent loading={loading} type="submit">
                            Recuperar
                        </ButtonComponent>
                    </Form>
                    <Link to="/">
                        <p>Voltar ao login</p>
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default forgotPassword;
