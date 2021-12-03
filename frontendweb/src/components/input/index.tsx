import { useField } from "@unform/core";
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { IconBaseProps, icons } from "react-icons/lib";
import tooltip from "../tooltip/index";

import { Container, Error } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const InputComponent: React.FC<InputProps> = ({
    name,
    icon: Icon,
    ...props
}) => {

    const inputRef = useRef(null)
    const {fieldName, defaultValue, error, registerField} = useField(name)

    useEffect(()=> {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        })
    }, [fieldName, registerField])

    const [isFocused, setisFocused] = useState(false)

    return (
        <Container isErrored={!!error} isfocused={isFocused}>
            {Icon && <Icon size={20} />}
            <input ref={inputRef} onFocus={()=> {
            setisFocused(true)
        }}
          onBlur={()=>{setisFocused(false)}}
         {...props} />
         {error &&
            <Error title={error}>
            <FiAlertCircle color="#c53030" size={25}/>
            </Error>}
        </Container>
    );
};

export default InputComponent;
