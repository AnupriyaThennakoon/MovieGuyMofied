import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Modal } from 'react-bootstrap'; // Import Modal for confirmation dialog
import { useDispatch, useSelector } from 'react-redux';
import Alertmsg from '../components/Alert';
import Buffer from '../components/buffer';
import { ListUsers, deleteUser } from '../actions/userActions'; // Import deleteUser action

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userListb = useSelector((state) => state.userListb);
  const { loading, users, error } = userListb;

  const userSignin = useSelector((state) => state.userSignin);
  const { userDetails } = userSignin;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(ListUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userDetails]);

  const deleteHandler = (id) => {
    setShowDeleteDialog(true);
    setDeleteUserId(id);
  };

  const confirmDeleteHandler = () => {
    // Dispatch the deleteUser action
    dispatch(deleteUser(deleteUserId));
    // Close the confirmation dialog
    setShowDeleteDialog(false);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <h1> Users </h1>
      {loading ? (
        <Buffer />
      ) : error ? (
        <Alertmsg variant='danger'>{error}</Alertmsg>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Reg ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fa fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fa fa-check' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                    disabled={user.isAdmin}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Confirmation dialog for delete */}
      <Modal show={showDeleteDialog} onHide={closeDeleteDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDeleteDialog}>
            Cancel
          </Button>
          <Button variant='danger' onClick={confirmDeleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
