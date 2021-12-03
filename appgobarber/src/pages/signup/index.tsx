import React, { forwardRef, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import getValidationError from '../../utils/getValidationErrors';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import {
    Container,
    Title,
    BackToSigninButton,
    BackToSigninText,
} from './styles';
import logoImg from '../../assets/logo.png';
import ButtonComponent from '../../components/button';
import InputComponent from '../../components/input';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import api from '../../services/clientAPI';

// import { Container } from './styles';

const signup: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = async (data: object) => {
        console.log(data);
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Um nome é obrigatorio'),
                email: Yup.string()
                    .required('Um email é obrigatorio')
                    .email('Digite um email valido'),
                password: Yup.string().min(6, 'No Minimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
                context: {},
            });

            const res = await api.post('/users', data);
            console.log(res);
            Alert.alert('Conta criada com sucesso!');
            navigation.goBack();

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
            }
        }
    };

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua Conta</Title>
                        </View>
                        <Form
                            style={{ width: '100%' }}
                            onSubmit={handleSubmit}
                            ref={formRef}
                        >
                            <InputComponent
                                autoCapitalize="words"
                                keyboardType="email-address"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current?.focus()
                                }
                            />
                            <InputComponent
                                ref={emailInputRef}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />
                            <InputComponent
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current.submitForm();
                                }}
                            />

                            <ButtonComponent
                                onPress={() => {
                                    formRef.current.submitForm();
                                }}
                            >
                                Cadastrar
                            </ButtonComponent>
                        </Form>
                    </Container>

                    <BackToSigninButton onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#fff" />
                        <BackToSigninText>Voltar Para Login</BackToSigninText>
                    </BackToSigninButton>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default signup;
