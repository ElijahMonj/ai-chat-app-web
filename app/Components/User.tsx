'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const User = () => {
    const {data:session} = useSession();

    return (
        <div>
            {session ? <p>Authenticated</p> : <p>
                Not authenticated
                <button className="btn btn-success"
                onClick={() => signIn('google')}
                >Google</button>
                </p>}
            {session ? <button onClick={() => signOut()} className="btn">Sign out</button>:
            <Link className="btn" href={'/login'}>Sign in</Link>}
        </div>
    )
}