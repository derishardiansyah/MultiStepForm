/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { setName, setEmail, setPhoneNumber } from '../../redux/personalSlice';

const Step1 = ({ onNextStep, theme }) => {
  const dispatch = useDispatch();
  const { name, email, phoneNumber } = useSelector((state) => state.personal);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [phoneNumberValidationError, setPhoneNumberValidationError] = useState('');
  const { t } = useTranslation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const indonesianPhoneNumberRegex = /^(08|\+?62)(\d{8,15})$/;

  const handleNameChange = (event) => {
    dispatch(setName(event.target.value));
    setNameError('');
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    dispatch(setEmail(emailValue));
    setEmailError('');

    if (!emailValue.match(emailRegex)) {
      setEmailError(t('invalidemail'));
    }
  };

  const handlePhoneChange = (event) => {
    const phoneNumberValue = event.target.value;
    dispatch(setPhoneNumber(phoneNumberValue));
    setPhoneNumberError('');

    if (!phoneNumberValue.match(indonesianPhoneNumberRegex)) {
      setPhoneNumberValidationError(t('invalidphonenumber'));
    } else {
      setPhoneNumberValidationError('');
    }
  };

  const handleFormSubmit = () => {
    setNameError('');
    setEmailError('');
    setPhoneNumberError('');

    if (!name) {
      setNameError(t('namerequired'));
    }

    if (!email) {
      setEmailError(t('emailrequired'));
    } else if (!email.match(emailRegex)) {
      setEmailError(t('invalidemail'));
      return;
    }

    if (!phoneNumber) {
      setPhoneNumberError(t('phonerequired'));
      return;
    }
    if (!phoneNumber || phoneNumberValidationError) {
      setPhoneNumberError(t('invalidphonenumber'));
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Form Submitted',
      text: 'Form submitted successfully!',
      timer: 2000,
    });

    onNextStep();
  };

  return (
    <>
      <div className={theme === 'light' ? 'outerDark' : 'outer'}>
        <div className={theme === 'light' ? 'form-step-container-Dark' : 'form-step-container'}>
          <FormLabel
            className={theme === 'light' ? 'heading-dark' : 'heading-text'}
            fontSize="40px"
            as="b"
            fontWeight={700}
          >
            {t('personalinfo')}
          </FormLabel>

          <Text
            className={theme === 'light' ? 'caption-text-dark' : 'caption-text'}
            marginRight="100px"
            textAlign="start"
            marginBottom="10px"
          >
            {t('captpersonalinfo')}
          </Text>

          <FormControl isInvalid={!!nameError} textAlign="left">
            <Box display="flex" justifyContent="space-between">
              <FormLabel>{t('name')}</FormLabel>
              {nameError && <FormErrorMessage>{nameError}</FormErrorMessage>}
            </Box>
            <Input type="text" placeholder="e.g. Stephen King" value={name} onChange={handleNameChange} />
          </FormControl>
          <br />

          <FormControl isInvalid={!!emailError} textAlign="left">
            <Box display="flex" justifyContent="space-between">
              <FormLabel>{t('email')}</FormLabel>
              {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
            </Box>
            <Input type="email" placeholder="e.g. stephenking@lorem.com" value={email} onChange={handleEmailChange} />
          </FormControl>
          <br />

          <FormControl isInvalid={!!phoneNumberError || !!phoneNumberValidationError} textAlign="left">
            <Box display="flex" justifyContent="space-between">
              <FormLabel>{t('phone')}</FormLabel>
              {(phoneNumberError || phoneNumberValidationError) && (
                <FormErrorMessage>{phoneNumberError || phoneNumberValidationError}</FormErrorMessage>
              )}
            </Box>
            <NumberInput>
              <NumberInputField
                placeholder="e.g. 123 456 7890"
                maxLength={15} // Updated the maxLength to 15, as Indonesian phone numbers can have up to 15 digits.
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
            </NumberInput>
          </FormControl>
          <div className="button-desktop">
            <Button type="button" onClick={handleFormSubmit} mt="30px">
              {t('nextstep')}
            </Button>
          </div>
        </div>
      </div>
      <div className="button-mobile-form">
        <Button bgColor="hsl(213, 96%, 18%)" color="white" onClick={handleFormSubmit}>
          {t('nextstep')}
        </Button>
      </div>
    </>
  );
};

export default Step1;
