import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';


export default function BasicTable(props) {

    const {rows, columns, totalValue, usedIn} = props; 
    let orderLink; 
  return (
    <TableContainer component={Paper} style = {{fontFamily : 'Lato'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            {columns.map(column => {
                return (<TableCell align="right">{column}</TableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          
          {usedIn === "Listings" ? rows.map((row) => {
              
            orderLink = `/order/${row.id}`; 
            return (<TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right"><Link to ={orderLink} style = {{textDecoration : 'None',color : '#07646b'}}>Details</Link>
              </TableCell>

            </TableRow>
            )
          }) : 

          usedIn === "Orders" ? 

          rows.map((row) => {

            let viewOrderLink = `/vieworder/${row.id}`
            return (
            <TableRow
              key = {row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.date.slice(0,10)}</TableCell>
                        <TableCell align="right">{row.order_status}</TableCell>
                        <TableCell align = "right"><Link to = {viewOrderLink}  style = {{textDecoration : 'None',color : '#07646b'}} target="_blank" rel="noopener noreferrer">Details</Link></TableCell>

            </TableRow>
            )
          })
          :  
          rows.map((row) => {

            let viewOrderLink = `/vieworder/${row.id}`
            let storeProfileLink = `/profile/${row.store_email}`
            return (
            <TableRow
              key = {row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">${row.item_value}</TableCell>
                        <TableCell align="right">
                            {usedIn === "Store Financials" ? 
                            row.shelter_name : <Link  style = {{textDecoration : 'None',color : '#07646b'}} to = {storeProfileLink} target="_blank" rel="noopener noreferrer">
                            {row.store_name}
                        </Link>  
                        }
                            
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.date.slice(0,10)}</TableCell>
                        <TableCell align="right">{row.order_status}</TableCell>
                        <TableCell align = "right"><Link to = {viewOrderLink}  style = {{textDecoration : 'None',color : '#07646b'}} target="_blank" rel="noopener noreferrer">Details</Link></TableCell>
            </TableRow>
            )})
     

        }

            {usedIn === "Financials" || usedIn === "Store Financials" ? 
            <TableRow
            key = "total"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
          <TableCell align = "left">
              <span style = {{fontWeight : 'bold'}}>Total Donation Value {usedIn === "Financials" ? "Received" : "Dispatched"}</span>
          </TableCell>
          <TableCell align = "right">
          <span style = {{fontWeight : 'bold'}}>${totalValue}</span>
          </TableCell>

          </TableRow> : null
        
            }
             
        </TableBody>
      </Table>
    </TableContainer>
  );
}