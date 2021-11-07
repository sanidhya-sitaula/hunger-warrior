import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function MediaCard(props) {
  const { name, store_email, available, store_name, quantity, date_posted } =
    props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia height="140" alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style = {{marginBottom : '8%'}}>
          {name}
        </Typography>
        <Typography variant="body1" color="text-secondary" style = {{marginBottom : '5%'}}>
          {store_name}
        </Typography>
        <Typography variant="body2" color="text-secondary" style = {{marginBottom : '5%'}}>
          Quantity: {quantity}
        </Typography>

        {available ? (
          <Typography variant="body2" color="green">
            Currently Available
          </Typography>
        ) : (
          <Typography variant="body2" color="red">
            Currently Unavailable
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Link>Order</Link>
        <Link>Store Profile</Link>
      </CardActions>
    </Card>
  );
}
