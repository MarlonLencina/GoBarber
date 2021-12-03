import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
} from 'react';
import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';
import { Container, TextInput, IconComponent } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface inputValueReference {
    value: string;
}

interface inputRef {
    focus(): void;
}

const InputComponent: React.ForwardRefRenderFunction<inputRef, InputProps> = (
    { name, icon, ...rest },
    ref,
) => {
    const imputElementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        focus() {
            imputElementRef.current.focus();
        },
    }));

    const {
        fieldName,
        registerField,
        error,
        defaultValue = '',
    } = useField(name);
    const inputValueRef = useRef<inputValueReference>({ value: defaultValue });

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                inputValueRef.current.value = value;
                imputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                imputElementRef.current.clear();
            },
        });
    }, [fieldName, registerField]);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
        setIsFilled(!!inputValueRef.current.value);
    };

    return (
        <>
            <Container isErrored={!!error} isFocused={isFocused}>
                <IconComponent
                    name={icon}
                    size={20}
                    color={isFilled || isFocused ? '#ff9000' : '#666360'}
                />
                <TextInput
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    ref={imputElementRef}
                    defaultValue={defaultValue}
                    onChangeText={(value) =>
                        (inputValueRef.current.value = value)
                    }
                    placeholderTextColor="#666360"
                    {...rest}
                />
            </Container>
        </>
    );
};

export default forwardRef(InputComponent);
