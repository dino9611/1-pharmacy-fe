import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SquareButton from '../../UI/authInventory/squareButton';
import { withRouter } from 'react-router';
import { API_URL } from '../../../constants/api';
import DetailsModal from '../..//UI/adminInventory/detailsModal';

const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'username',
    label: 'Username',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 20,
    align: 'left',
  },
  {
    id: 'buttonUserDetails',
    label: 'User Details',
    minWidth: 170,
    align: 'left',
    format: 'buttonUserDetails'
  },
  {
    id: 'buttonTransactionsDetails',
    label: 'Transactions Details',
    minWidth: 170,
    align: 'left',
    format: 'buttonTransactionsDetails'
  },
];

const UserDatasTable = (props) => {
  const { history } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const [userDatas, setUserDatas] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/transactions/userDatas?page=${page}&limit=${rowsPerPage}`);
        setUserDatas(response.data.data);
        setTotal(response.data.meta.total[0].total_data);
      } catch (error) {
        toast.error(error.response.data.data.message || "Server Error", {
          position: "top-right",
          icon: "😵"
        });
      }
    };
    fetchdata();
  }, [page, rowsPerPage]);

  const [openModalUserDetails, setOpenModalUserDetails] = useState(false);
  const [userDetailsDatas, setUserDetailsDatas] = useState([]);

  const fetchUserDetailsData = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/admin/transactions/userDatas/user-details?id=${id}`);
      setOpenModalUserDetails(!openModalUserDetails);
      setUserDetailsDatas(response.data.data[0]);
    } catch (error) {
      toast.error(error.response.data.data.message || "Server Error", {
        position: "top-right",
        icon: "😵"
      });
    }
  };

  const RenderUserDetailsModal = () => {
    return (
      <DetailsModal
        isOpen={openModalUserDetails} 
        toggle={() => setOpenModalUserDetails(!openModalUserDetails)}
        title="User Details"
        size="md"
      >
        <p>
          Gender: {userDetailsDatas.gender}
        </p>
        <p>
          Birthdate: {userDetailsDatas.birthdate}
        </p>
        <p>
          Address: {userDetailsDatas.address}
        </p>
        <p>
          Verified: {userDetailsDatas.isVerified}
        </p>
      </DetailsModal>
    )
  }


  return (
    <Paper sx={{ width: '100%', boxShadow: "1px 5px 15px -5px gray" }}>
      <RenderUserDetailsModal/>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={9} style={{ backgroundColor: "var(--lighter-pink-color)", fontSize: 20, color: "whitesmoke" }}>
                Account Data
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth, backgroundColor: "seashell", color: "var(--pink-color)" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              userDatas.map((userData) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={userData.code}>
                    {columns.map((column) => {
                      const value = userData[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value
                          }
                          {column.format === 'buttonUserDetails' && (
                            <SquareButton 
                              label="View Details" 
                              style={{ width: 120, padding: 5 }}
                              onClick={() => fetchUserDetailsData(userData.id)}
                            ></SquareButton>
                          )}
                          {column.format === 'buttonTransactionsDetails' && (
                            <SquareButton 
                              label="View Details" 
                              style={{ width: 120, padding: 5 }}
                              onClick={() => {history.push(`/admin/userDatas/orderHistory/${userData.id}`)}}
                            ></SquareButton>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default withRouter(UserDatasTable);