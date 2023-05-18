'use client'

import Button from "@/app/components/button/Button";
import { signOut } from "next-auth/react";

const users = () => {
    return ( 
    <div>hello
        <Button onClick={signOut}>Sign Out</Button>
    </div> );
}
 
export default users;