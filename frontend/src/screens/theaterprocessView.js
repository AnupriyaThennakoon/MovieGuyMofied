import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'; // Import Alert component for displaying validation errors
import FormC from '../components/Form_layout';
import { useDispatch, useSelector } from 'react-redux';
import { recordTheaterinfo } from '../actions/cartActions';
import Checkoutnavigator from '../components/checkoutnavigator';

const TheaterprocessView = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { theaterDetails } = cart;

  const [place, setPlace] = useState(theaterDetails.place);
  const [contactno, setContactNo] = useState(theaterDetails.contactno);
  const [contactNoError, setContactNoError] = useState(''); // State for validation error message

  const dispatch = useDispatch();

  const validateContactNo = (contactNo) => {
    const isValid = /^\d{10}$/.test(contactNo); // Validate it as a 10-digit number
    return isValid;
  };

  const submithandler = (e) => {
    e.preventDefault();

    if (validateContactNo(contactno)) {
      setContactNoError(''); // Clear any previous validation error
      dispatch(recordTheaterinfo({ place, contactno }));
      history.push('/paymentprocess');
    } else {
      setContactNoError('Please enter a valid 10-digit contact number.');
    }
  };

  return (
    <FormC>
      <Checkoutnavigator s1 s2 />
      <h2> Your Details</h2>

      <Form onSubmit={submithandler}>
        <Form.Group controlId="place">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your place"
            value={place}
            required
            onChange={(e) => setPlace(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="contactno">
          <Form.Label>Contact No</Form.Label>
          <Form.Control
            type="text" // Use type "text" to accept numeric input without HTML5 validation
            placeholder="Enter your contact number"
            value={contactno}
            required
            onChange={(e) => setContactNo(e.target.value)}
          />
          {contactNoError && <Alert variant="danger">{contactNoError}</Alert>}
        </Form.Group>
        
        <br></br>

        <Button type="submit" variant="primary">
          Next
        </Button>
      </Form>
    </FormC>
  );
};

export default TheaterprocessView;
