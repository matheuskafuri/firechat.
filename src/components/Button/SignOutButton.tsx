import React from 'react';
import { Button } from '@chakra-ui/react'

type ButtonProps = { 
    onClick: () => void,
    children: React.ReactNode
}

export const SignOutButton = ({ onClick, children }: ButtonProps) => {
    return (
        <Button onClick={onClick} colorScheme="pink" size="xs" borderRadius={16}>
        {children}
        </Button>
    );
}