import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function MediaCard(props) {
  const {
    name,
    store_email,
    available,
    store_name,
    quantity,
    date_posted,
    request_status,
    id,
    handleDelete,
    type,
    request_date,
    order_status,
  } = props;

  const orderLink = `viewOrder/${id}`;

  if (type === "order") {
    return (
      <Link className="orderLink" to={orderLink}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia height="140" alt="green iguana" />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ marginBottom: "8%" }}
            >
              {type === "order" ? (
                <Link className="orderLink" to={orderLink}>
                  {name}{" "}
                </Link>
              ) : (
                name
              )}
            </Typography>
            <Typography
              variant="body1"
              color="text-secondary"
              style={{ marginBottom: "5%" }}
            >
              {store_name}
            </Typography>
            <Typography
              variant="body2"
              color="text-secondary"
              style={{ marginBottom: "5%" }}
            >
              Quantity: {quantity}
            </Typography>

            {type === "order" ? (
              <Typography
                variant="body2"
                color="text-secondary"
                style={{ marginBottom: "5%" }}
              >
                Status : {order_status}
              </Typography>
            ) : null}
            {type === "order" && date_posted ? (
              <Typography
                variant="body2"
                color="text-secondary"
                style={{ marginBottom: "3%" }}
              >
                Order Date:{" "}
                {new Date(date_posted.seconds * 1000).toString().slice(0, 15)}
              </Typography>
            ) : null}

            {type === "request" && request_date ? (
              <Typography
                variant="body2"
                color="text-secondary"
                style={{ marginBottom: "3%" }}
              >
                Request Date:{" "}
                {new Date(request_date.seconds * 1000).toString().slice(0, 15)}
              </Typography>
            ) : null}

            {request_status ? (
              <Typography
                variant="body2"
                color="text-secondary"
                style={{ marginBottom: "3%" }}
              >
                Status: {request_status}
              </Typography>
            ) : null}

            {available !== "Not Applicable" ? (
              available === true ? (
                <Typography variant="body2" color="green">
                  Currently Available
                </Typography>
              ) : (
                <Typography variant="body2" color="red">
                  Currently Unavailable
                </Typography>
              )
            ) : null}
          </CardContent>
          {available !== "Not Applicable" ? (
            <CardActions>
              <Link
                className="order-link"
                style={{ textDecoration: "None" }}
                to={`/order/${id}`}
              >
                Order
              </Link>
            </CardActions>
          ) : (
            <CardActions>
              {type === "request" ? (
                <a
                  className="order-link"
                  onClick={() => handleDelete(id)}
                  style={{ textDecoration: "None", textAlign: "Center" }}
                >
                  Delete
                </a>
              ) : null}
            </CardActions>
          )}
        </Card>
      </Link>
    );
  } else {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia height="140" alt="green iguana" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ marginBottom: "8%" }}
          >
            {type === "order" ? (
              <Link className="orderLink" to={orderLink}>
                {name}{" "}
              </Link>
            ) : (
              name
            )}
          </Typography>
          <Typography
            variant="body1"
            color="text-secondary"
            style={{ marginBottom: "5%" }}
          >
            {store_name}
          </Typography>
          <Typography
            variant="body2"
            color="text-secondary"
            style={{ marginBottom: "5%" }}
          >
            Quantity: {quantity}
          </Typography>

          {type === "order" ? (
            <Typography
              variant="body2"
              color="text-secondary"
              style={{ marginBottom: "5%" }}
            >
              Status : {order_status}
            </Typography>
          ) : null}
          {type === "order" && date_posted ? (
            <Typography
              variant="body2"
              color="text-secondary"
              style={{ marginBottom: "3%" }}
            >
              Order Date:{" "}
              {new Date(date_posted.seconds * 1000).toString().slice(0, 15)}
            </Typography>
          ) : null}

          {type === "request" && request_date ? (
            <Typography
              variant="body2"
              color="text-secondary"
              style={{ marginBottom: "3%" }}
            >
              Request Date:{" "}
              {request_date.seconds
                ? new Date(request_date.seconds * 1000).toString().slice(0, 15)
                : request_date.slice(0, 10)}
            </Typography>
          ) : null}

          {request_status ? (
            <Typography
              variant="body2"
              color="text-secondary"
              style={{ marginBottom: "3%" }}
            >
              Status: {request_status}
            </Typography>
          ) : null}

          {available !== "Not Applicable" ? (
            available === true ? (
              <Typography variant="body2" color="green">
                Currently Available
              </Typography>
            ) : (
              <Typography variant="body2" color="red">
                Currently Unavailable
              </Typography>
            )
          ) : null}
        </CardContent>
        {available !== "Not Applicable" ? (
          <CardActions>
            <Link
              className="order-link"
              style={{ textDecoration: "None" }}
              to={`/order/${id}`}
            >
              Order
            </Link>
          </CardActions>
        ) : (
          <CardActions>
            {type === "request" ? (
              <a
                className="order-link"
                onClick={() => handleDelete(id)}
                style={{ textDecoration: "None", textAlign: "Center" }}
              >
                Delete
              </a>
            ) : null}
          </CardActions>
        )}
      </Card>
    );
  }
}
