import React, { useState } from 'react';
import { Table, TablePagination, Box, TableBody, TableContainer, TableHead, TableRow, Paper, styled, CircularProgress } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useQuery } from "react-query";
import { getAllLinks } from '../../services/requests';
import { formatDataTime } from '../../utils/dataTime';
import { EditLink, DeleteLink, AddAll } from '../index';
import { CustomAlert } from '../Custom/CustomAlert';

export const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              <StyledTableCell>Url</StyledTableCell>
              <StyledTableCell>Titulo</StyledTableCell>
              <StyledTableCell >Criado</StyledTableCell>
              <StyledTableCell >Atualizado</StyledTableCell>
              <StyledTableCell align="right">Ações</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <StyledTableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell >{item.url}</StyledTableCell>
                <StyledTableCell>{item.title}</StyledTableCell>
                <StyledTableCell > {formatDataTime(item.createdAt)}</StyledTableCell>
                <StyledTableCell >{formatDataTime(item.updatedAt)}</StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <EditLink id={item.id} url={item.url} title={item.title} />
                    <DeleteLink id={item.id} />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}
