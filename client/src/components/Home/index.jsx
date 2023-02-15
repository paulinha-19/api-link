import React, { useState } from 'react';
import { Table, Box, Backdrop, TableBody, TableContainer, TableHead, TableRow, Paper, styled, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useQuery } from "react-query";
import { getAllLinks } from '../../services/requests';
import { CustomModal } from '../index';
import { AddLink, EditLink, DeleteLink } from '../index';

export const Home = () => {
  const { data, isLoading, error } = useQuery(
    "getAllLinks",
    getAllLinks,
    {
      retry: 5
    }
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <TableContainer component={Paper} sx={{ marginTop: 5 }}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#181717" }}>
          <StyledTableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="center">Url</StyledTableCell>
            <StyledTableCell align="center">Titulo</StyledTableCell>
            <StyledTableCell align="center">Criado</StyledTableCell>
            <StyledTableCell align="center">Atualizado</StyledTableCell>
            <StyledTableCell align="center">Ações</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow
              key={item.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="center">{item.url}</StyledTableCell>
              <StyledTableCell align="center">{item.title}</StyledTableCell>
              <StyledTableCell align="center">{item.createdAt}</StyledTableCell>
              <StyledTableCell align="center">{item.updatedAt}</StyledTableCell>
              <StyledTableCell align="center">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <AddLink />
                  <EditLink />
                  <DeleteLink />
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
