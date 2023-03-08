import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import axios from "axios";

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://reqres.in/api/users")
            .then((res)=>{
                setUsers(res.data);
            })
    }, users)


    return (
        <div>
            <p>{users.map((e)=> e)}</p>
        </div>
    )
}
export default Users;