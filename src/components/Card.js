import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function MediaCard(props) {
  const { name, store_email, available, store_name, quantity, date_posted, request_status } =
    props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia height="140" alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" style = {{marginBottom : '8%'}}>
          {name}
        </Typography>
        <Typography variant="body1" color="text-secondary" style = {{marginBottom : '5%'}}>
          {store_name}
        </Typography>
        <Typography variant="body2" color="text-secondary" style = {{marginBottom : '5%'}}>
          Quantity: {quantity}
        </Typography>
        
        {request_status?  <Typography variant="body2" color="text-secondary" style = {{marginBottom : '3%'}}>
          Status: {request_status}
        </Typography>: null }

        {available !== "Not Applicable" ? available ? (
          <Typography variant="body2" color="green">
            Currently Available
          </Typography>
        ) : (
          <Typography variant="body2" color="red">
            Currently Unavailable
          </Typography>
        ) : null}
      </CardContent>
      {available !== "Not Applicable" ? <CardActions>
        <Link style = {{textDecoration : "None"}}>Order</Link>
        <Link style = {{textDecoration : "None"}}>Store Profile</Link>
      </CardActions> : <CardActions>
        <Link style = {{textDecoration : "None", textAlign : 'Center'}}>Delete</Link>
      </CardActions>}
      
    </Card>
  );
}
