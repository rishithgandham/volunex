'use client';
import React from "react"
import { AuthContextType, useAuth } from "./auth_context";
import { useRouter } from "next/navigation";



export function withProtected(Component: React.ElementType) {
    return function WithProtected(props: any) {
        const auth = useAuth();
        const router = useRouter();
        if(!auth.providerUser) router.push('/auth/login')
        return <Component auth={auth} {...props}/>;
    }
    
}

export function withPublic(Component: React.ElementType) {
    return function WithPublic(props: any) {
        
        const auth = useAuth();
        const router = useRouter();
        if(auth.providerUser) router.push('/app/dashboard')
        return <Component auth={auth} {...props}/>;
    }
}