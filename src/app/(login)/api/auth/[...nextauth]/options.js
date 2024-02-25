import pool from "@/db/connection"


import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
    providers: [

        CredentialsProvider({

            async authorize(credentials) {
                const client = await pool.connect();
                const checkQuery = `SELECT * FROM admins WHERE username = '${credentials.username}'`;
                const user = await client.query(checkQuery);

                if (!user.rows[0]){
                    client.release();
                    return null
                }

                if(user.rows[0].password !== credentials.password){
                    client.release();
                    return null
                }

                client.release();
                return {username: user.username}

            }
        })
    ],
}