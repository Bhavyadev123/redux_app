import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact, deleteContact } from '../src/redux/actions';
import './App.css';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person'; // Import Person Icon
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', mobile: '', email: '' });
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      dispatch(updateContact(formData));
      toast.success('Contact updated successfully!');
    } else {
      dispatch(addContact({ ...formData, id: Date.now() }));
      toast.success('Contact added successfully!');
    }
    setFormData({ id: '', firstName: '', lastName: '', mobile: '', email: '' });
  };

  // Handle edit
  const handleEdit = (contact) => {
    setFormData(contact);
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    toast.error('Contact deleted successfully!');
  };

  return (
    <div className="App">
      <ToastContainer />
      <h2>Contact App Using Redux</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{formData.id ? 'Update' : 'Add'} Contact</button>
      </form>

      <ul>
        {contacts.length === 0 ? (
          <p className="no-contacts">No contacts available</p>
        ) : (
          contacts.map((contact, index) => (
            <li key={contact.id}>
              <div className="contact-item">
                <span className="serial-number">{index + 1}.</span>
                <div className="contact-details">
                  <p><PersonIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} /> {contact.firstName} {contact.lastName}</p>
                  <p>
                    <PhoneIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                    {contact.mobile}
                  </p>
                  <p>
                    <EmailIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                    {contact.email}
                  </p>
                </div>
              </div>
              <div className="contact-actions">
                <button onClick={() => handleEdit(contact)} className="editbtn">Edit</button>
                <button onClick={() => handleDelete(contact.id)} className="deletebtn">Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
