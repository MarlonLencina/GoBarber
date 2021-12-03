import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { ChangeEvent, useCallback, useRef } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import ButtonComponent from "../../components/button";
import InputComponent from "../../components/input";
import { useAuth } from "../../hooks/authContext";
import { useToast } from "../../hooks/toastContext";
import api from "../../services/clientAPI";
import getValidationError from "../../utils/getValidationErrors";
import {
    Container,
    ProfileComponent,
    ProfileContainer,
    Header,
    ProfileImage,
} from "./style";

interface requestUpdateProfileData {
    name: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmationPassword: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { user, token, updateUser } = useAuth();
    const { addToast } = useToast();
    const History = useHistory();

    const handleSubmitForm = async (data: requestUpdateProfileData) => {
        try {
            console.log(data);
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required("nome é obrigatoria"),
                email: Yup.string()
                    .required("email obrigatoria")
                    .email("digite um email valido"),
                oldPassword: Yup.string(),
                newPassword: Yup.string().when("oldPassword", (oldPassword) => {
                    if (oldPassword)
                        return Yup.string().required(
                            "Must enter email address"
                        );

                    return Yup.string();
                }),
                confirmationPassword: Yup.string().when(
                    "oldPassword",
                    (oldPassword) => {
                        if (oldPassword) {
                            return Yup.string().test(
                                "A senha deve bater",
                                "A senha deve ser igual",
                                function (value) {
                                    return this.parent.newPassword === value;
                                }
                            );
                        }

                        return Yup.string();
                    }
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
                strict: false,
                context: {},
            });

            const dataUpdated = {
                name: data.name,
                email: data.email,
                ...(data.oldPassword
                    ? {
                          password: data.newPassword,
                          oldPassword: data.oldPassword,
                          password_confirmation: data.confirmationPassword,
                      }
                    : {}),
            };

            console.log(dataUpdated);

            api.put("profile", dataUpdated, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                console.log(res);
                updateUser(res.data.user);
                addToast({
                    type: "success",
                    title: "Perfil atualizado",
                    description: "Os dados do seu perfil foi atualizado",
                });
                History.push("/");
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

    const handleAvatarChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const data = new FormData();
            if (e.target.files) {
                data.append("avatar", e.target.files[0]);
                api.patch("users/avatar", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => {
                    updateUser(res.data.user);
                    addToast({
                        title: "Imagem de perfil",
                        description: "Sua image de perfil foi atualizada",
                        type: "success",
                    });
                });
            }
        },
        []
    );

    return (
        <Container>
            <Header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </Header>
            <ProfileContainer>
                <div>
                    <ProfileComponent>
                        <ProfileImage>
                            <img src={user.avatar_url} alt="" />
                            <label htmlFor="avatar">
                                <FiImage />
                                <input
                                    onChange={handleAvatarChange}
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                />
                            </label>
                        </ProfileImage>
                        <h1>Meu Perfil</h1>

                        <Form ref={formRef} onSubmit={handleSubmitForm}>
                            <InputComponent
                                icon={FiUser}
                                name="name"
                                type="text"
                                placeholder="Nome"
                                defaultValue={user.name}
                            />
                            <InputComponent
                                icon={FiMail}
                                name="email"
                                type="text"
                                placeholder="e-mail"
                                defaultValue={user.email}
                            />
                            <InputComponent
                                icon={FiLock}
                                name="oldPassword"
                                type="password"
                                placeholder="Senha Atual"
                            />
                            <InputComponent
                                icon={FiLock}
                                name="newPassword"
                                type="password"
                                placeholder="Nova senha"
                            />
                            <InputComponent
                                icon={FiLock}
                                name="confirmationPassword"
                                type="password"
                                placeholder="Confirmação de senha"
                            />
                            <ButtonComponent type="submit">
                                Salvar as Alterações
                            </ButtonComponent>
                        </Form>
                    </ProfileComponent>
                </div>
            </ProfileContainer>
        </Container>
    );
};

export default Profile;
