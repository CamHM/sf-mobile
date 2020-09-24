import React, { useEffect, useState } from 'react';
import Page from "../Page";
import { getItem } from "../../config/utils";
import { getRequest } from "../../service/service.provider";

const id = 76;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksInVzZXJNYWlsIjoianVsaWFuLnNlcm5hQHVwdGMuZWR1LmNvIiwiaWF0IjoxNTk5MTQ1NjAyLCJleHAiOjk0NDMxNDU2MDJ9.5DItuRVx83gjxPB2wZUEY6U9t7a5WG9CwRQvda4i0eI";

interface User {
    createdAt: Date,
    docType: string,
    id: number,
    updatedAt: Date,
    userMail: string,
    userName: string,
    userNumber: string,
    userPassword: string,
    userPhone: string,
    userRol: string,
}

const User: React.FC = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        getItem('token').then(t => {
            getItem('userId').then( id => {
                console.log(id)
                getRequest('/user', t || '')
                    .then(res => res.json())
                    .then(data => {
                        const users = [data];
                        console.log(users)
                    })
            });
        })
    }, []);

    return (
        <Page name="Mi perfil" />
    )
};

export default User;
