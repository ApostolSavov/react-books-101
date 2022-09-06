import { Link } from "react-router-dom";

import "./HomePage.scss";

function HomePage(props) {
    return (
        <div>
            <Link to="/test">
                go to testing page
            </Link>
        </div>
    );
}

export default HomePage;