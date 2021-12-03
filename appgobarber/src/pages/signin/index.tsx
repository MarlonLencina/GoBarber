import React, { useCallback, useRef, useImperativeHandle } from 'react';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

import api from '../../services/clientAPI';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput,
} from 'react-native';
import {
    Container,
    Title,
    ForgotPasswordButton,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountText,
} from './styles';
import logoImg from '../../assets/logo.png';
import ButtonComponent from '../../components/button';
import InputComponent from '../../components/input';
import Icon from 'react-native-vector-icons/Feather';
import signup from '../signup';
import { Screen } from 'react-native-screens';
import { useAuth } from '../../hooks/authContext';

// import { Container } from './styles';

interface SignInData {
    email: string;
    password: string;
}

const signin: React.FC = () => {
    const { signin, user } = useAuth();
    const passwordInputRef = useRef<TextInput>(null);
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = async ({ email, password }: SignInData) => {
        try {
            console.log(email, password);
            signin({
                email,
                password,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const navigation = useNavigation();

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
                            <Title>Faça seu login</Title>
                        </View>
                        <Form
                            onSubmit={handleSubmit}
                            ref={formRef}
                            style={{ width: '100%' }}
                        >
                            <InputComponent
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <InputComponent
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                            <ButtonComponent
                                onPress={() => formRef.current?.submitForm()}
                            >
                                Entrar
                            </ButtonComponent>
                        </Form>
                        <ForgotPasswordButton
                            onPress={() => {
                                console.log('press');
                            }}
                        >
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPasswordButton>
                    </Container>

                    <CreateAccountButton
                        onPress={() => navigation.navigate('SignUp' as never)}
                    >
                        <Icon name="log-in" size={20} color="#ff9000" />
                        <CreateAccountText>Criar uma Conta</CreateAccountText>
                    </CreateAccountButton>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default signin;
