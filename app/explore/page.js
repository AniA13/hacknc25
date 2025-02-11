
/*'use client'

import Navbar from "../components/Navbar";

import React,{ useEffect, useState} from "react";
//import {db, auth} from "..firebase/client";
//import {getDocs, collection} from "firebase/firestore";


export default function Explore() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
se
    const currentUser = auth.currentUser

    return(
        <>
            <Navbar/>
            <main className="pt-4">
                <SearchBar />
            </main>
        </>
        )
}*/

'use client'

import Navbar from "../components/Navbar";
import SearchList from "./SearchList";

import React,{ useEffect, useState} from "react";

export default function Explore() {
    return(
        <>
            <Navbar/>
            <main className="pt-4">
                <SearchList />
            </main>
        </>
        )
}
