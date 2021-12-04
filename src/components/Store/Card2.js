import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import AddIcon from '@mui/icons-material/Add';
export default function MediaCard2(props) {
  const { name, icon, type } =
    props;

    const calculateHeight = () => {
        let height;
        if (type === "orders"){
            height = 197;
        }
        else if (type === "listings"){
            height = 175;
        }
        else {
            height = 172;
        }
        return height; 
    }

  return (
    <Card sx={{ minWidth : 100, maxWidth: 345, minHeight : calculateHeight()}} id = "card2">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" style = {{textAlign: 'center'}}>
          {name}
        </Typography>
        {icon === "view_all" ? 
        <div className = "view_all_icon">
        <NextPlanIcon color = 'primary' fontSize = '110%' style = {{marginTop : '20%', marginLeft : '40%', marginRight : '40%', transform: 'scale(2.8)'}}/>
    </div>: 
    <div className = "view_all_icon">
        <AddIcon color = 'primary' fontSize = '120%' style = {{marginTop : '15%', marginLeft : '40%', marginRight : '40%', transform: 'scale(2.8)'}}/>
    </div>
        }
        
        </CardContent>
    </Card>
  );
}
