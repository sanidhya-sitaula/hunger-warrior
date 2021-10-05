import React from 'react'; 

const HomePage = (props) => {
    const {handleLogout} = props; 
    return (
        <section className = "hero">
            <div className = "navbar">
                <h2>Welcome, user!</h2>
                <nav>
                    <a>Profile</a>
                    <a>Settings</a>
                    <a onClick = {handleLogout}>Logout</a>
                </nav>
            </div>
           
        </section>
    )
}

export default HomePage;