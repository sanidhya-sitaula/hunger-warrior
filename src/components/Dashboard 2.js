import React from 'react'; 

const Dashboard = (props) => {
    const {user, handleLogout, userDetails} = props; 
    return (
        <section className = "hero">
            <div className = "navbar">
                <h2>Welcome, {userDetails.name}!</h2>
                <nav>
                    <a>Profile</a>
                    <a>Settings</a>
                    <a onClick = {handleLogout}>Logout</a>
                </nav>
            </div>
           
        </section>
    )
}

export default Dashboard;