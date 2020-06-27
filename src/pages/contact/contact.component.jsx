import React, { useState } from 'react';
import './contact.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { firestoreUtils } from '../../firebase/firebase.utils';

const ContactPage = () => {
  
  const currentUser = useSelector(selectCurrentUser);

  const [ formData , setFormData ] = useState({ title: '', message: ''});
  
  const inputChangeEventHandler = (event) => {
    const { name , value } = event.target;
    setFormData({...formData, [name]: value });
  };

  const submitEventHandler = event => {
    event.preventDefault();

    firestoreUtils.addMessageToDb( currentUser.id, formData.title, formData.message ).then(
      () => {
        setFormData({ title: '', message: ''});
        toast.success('Your request has been successfully submitted');
      }
    ).catch( error => {
      console.error(error);
      toast.error('There was an error and your request could not be processed, please try again later');
    });
  };

  return <div id="contact-page-container">
      <div className={`contact-form ${ currentUser ? '' : 'disabled' }`}>
      <h2 className="title">Contact Us</h2>
          <span>Fill out the form below to contact us</span>
          <form onSubmit={submitEventHandler}>
              <FormInput name="title"
                          label="title"
                          type="test"
                          value={formData.title}
                          onChange={inputChangeEventHandler}
                          required
                          pattern=".*[\S+].*" />
              <FormInput name="message"
                        label="message"
                        type="text"
                        value={formData.message}
                        onChange={inputChangeEventHandler}
                        required
                        pattern=".*[\S+].*" />
              <div className="buttons-container">
                  <CustomButton type="submit">
                      Submit
                  </CustomButton>
              </div>
          </form>
      </div>
      {
        currentUser ? null :
          <div className="sign-in-required">
            <h2>
              In order to send us a message you need to be signed in
            </h2>
          </div>
      }
    </div>
};

export default ContactPage;