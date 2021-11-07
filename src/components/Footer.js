import React from 'react'; 
import './Footer.css'; 
import Grid from "@mui/material/Grid";
const Footer = () => {
    return (
        <div class="footer-dark">
        <footer>
            <div class="container">
                <div class="row">
                <Grid container spacing={2} style={{ marginTop: "2%", marginLeft : "2%" }}>
                    <Grid item xs = {3}>
                    <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                        </ul>
                    </Grid>
                    <Grid item xs = {8}>
                        <h3>Hunger Warrior</h3>
                        <p>Hunger Warrior is a web application that will facilitate safe and legal food distribution. Hunger Warrior will overcome the obstacle of navigating food safety laws, by vetting the food before it is delivered. This will take into account food safety laws in tandem with inventory management practices. </p>
                    </Grid>
                    </Grid>
                    <div class="col item social" style = {{marginTop : "2%"}}><a href="#"><i class="icon ion-social-github"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
                </div>
                <p class="copyright">Hunger Warrior © 2021</p>
            </div>

        </footer>
    </div>
    )
}

export default Footer;