import { Link } from "react-router-dom";

import "./Home.css";

import React from 'react';

function Home(props) {
    return (
        <div>
            <Link to="/test">
                go to testing page
            </Link>
        </div>
    );
}

export default Home;