import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import AddIcon from '@mui/icons-material/Add';
export default function MediaCard2(props) {
  const { name, icon, type } =
    props;



    const calculateHeight = () => {
      let height;
      if (type === "orders"){
          height = 210;
      }
      else if (type === "listings"){
          height = 204;
      }
      else {
          height = 250;
      }
      return height; 
  }

  return (
    <Card sx={{ minWidth : 100, maxWidth: props.width ? props.width : 345, minHeight : props.height? props.height : calculateHeight()}} style = {{marginRight : '10%'}}id = "card2">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" style = {{textAlign: 'center'}}>
          {name}
        </Typography>
        {icon === "view_all" ? 
        <div className = "view_all_icon">
        <NextPlanIcon color = 'primary' fontSize = '130%' style = {{marginTop : '20%', marginLeft : '40%', marginRight : '40%', transform: 'scale(2.8)'}}/>
    </div>: 
    <div className = "view_all_icon">
        <AddIcon color = 'primary' fontSize = '130%' style = {{marginTop : '20%', marginLeft : '40%', marginRight : '40%', transform: 'scale(2.8)'}}/>
    </div>
        }
        
        </CardContent>
    </Card>
  );
}
