import React from 'react'
import './Navbar.css';
class Navbar extends React.Component {
     
    render() { 
        return (
            <>
            <nav>
                <div className="title">
                    <p>Weather</p>
                </div>
            </nav>
            </>
        );
    }
}
 
export default Navbar;