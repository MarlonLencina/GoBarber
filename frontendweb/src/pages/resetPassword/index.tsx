import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useRef, useContext } from "react";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import ButtonComponent from "../../components/button/index";
import InputComponent from "../../components/input";
import { useAuth } from "../../hooks/authContext";
import { useToast } from "../../hooks/toastContext";
import logo from "../../styles/img/logo.svg";
import getValidationError from "../../utils/getValidationErrors";
import { Background, Container, Content, AnimationContainer } from "./style";

interface resetPasswordData {
    password: string;
    passwordConfirmation: string;
}

const resetPassword: React.FC = () => {
    const { user, resetPassword } = useAuth();
    const { addToast, removeToast } = useToast();
    const History = useHistory();

    const formRef = useRef<FormHandles>(null);
    const handleSubmitForm = async (data: resetPasswordData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                password: Yup.string().required("senha obrigatoria"),
                passwordConfirmation: Yup.string().test(
                    "A senha deve bater",
                    "A senha deve ser igual",
                    function (value) {
                        return this.parent.password === value;
                    }
                ),
            });
            await schema.validate(data, {
                abortEarly: false,
                strict: false,
                context: {},
            });

            const { password, passwordConfirmation } = data;
            const token = location.search.replace("?token=", "");

             if (!token) {
                throw new Error();
            }

            await resetPassword({ token, password, passwordConfirmation });

            History.push("/");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: "error",
                title: "Erro ao resetar senha",
                description: "Erro ao resetar sua senha, tente novamente.",
            });
        }
    };

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="" />
                    <Form ref={formRef} onSubmit={handleSubmitForm}>
                        <h1>Resetar sua senha</h1>
                        <InputComponent
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="senha"
                        />
                        <InputComponent
                            icon={FiLock}
                            name="passwordConfirmation"
                            type="password"
                            placeholder="Confirmação da senha"
                        />
                        <ButtonComponent type="submit">
                            Resetar Senha
                        </ButtonComponent>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default resetPassword;
