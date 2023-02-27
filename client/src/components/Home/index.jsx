import React from 'react';
import { Table, Box, TableBody, TableContainer, TableHead, TableRow, Paper, styled, CircularProgress } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useQuery } from "react-query";
import { getAllLinks } from '../../services/requests';
import { formatDataTime } from '../../utils/dataTime';
import { EditLink, DeleteLink, AddAll } from '../index';
import { CustomAlert } from '../Custom/CustomAlert';

export const Home = () => {
  const { data, isLoading, error } = useQuery(
    "getLinks",
    getAllLinks,
    {
      retry: 3
    },
    {
      refetchOnWindowFocus: false
    }
  );

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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  if (isLoading) return <Box sx={{ display: "flex", justifyContent: "center" }}><CircularProgress /></Box>

  if (error) return <CustomAlert severity="error" variant="filled" titleAlert="Erro" children={error.message} />

  return (
    <Box>
      <AddAll />
      <TableContainer component={Paper}>
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
            {data?.map((item) => (
              <StyledTableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell align="center">{item.url}</StyledTableCell>
                <StyledTableCell align="center">{item.title}</StyledTableCell>
                <StyledTableCell align="center"> {formatDataTime(item.createdAt)}</StyledTableCell>
                <StyledTableCell align="center">{formatDataTime(item.updatedAt)}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <EditLink id={item.id} url={item.url} title={item.title} />
                    <DeleteLink id={item.id} />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
