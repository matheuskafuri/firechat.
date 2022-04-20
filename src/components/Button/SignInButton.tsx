import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const SignInButton = ({ onClick, children }: ButtonProps) => {
  return (
    <Button onClick={onClick} color="gray.900" backgroundColor="gray.50" size="lg" >
        <Icon as={FcGoogle} margin={2} size="lg" />
        {children}
    </Button>
  );
};
