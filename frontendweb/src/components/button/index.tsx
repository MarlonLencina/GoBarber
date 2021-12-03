import { loadavg } from "os";
import React, { ButtonHTMLAttributes } from "react";
import { boolean } from "yup";

import { Button } from "./style";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const ButtonComponent: React.FC<ButtonProps> = ({
    loading,
    children,
    ...rest
}) => {
    return (
        <Button type="button" {...rest}>
            {loading ? "Carregando." : children}
        </Button>
    );
};

export default ButtonComponent;
