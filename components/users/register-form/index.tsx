import React, { useState, useId, useEffect } from 'react';

// Import components
import { Button, Card, CardBody, InputFactory } from 'components';

// Import hooks
import { useInput } from 'lib/hooks';

// Import Stylesheet
import styles from './styles.module.scss';

// Import Types
import ComponentStatuses from 'lib/types/component-statuses';
import type { InputValue } from 'lib/types/input-value';

export interface RegisterFormData {
  email: InputValue;
  password: InputValue;
  name: InputValue;
}

// Prop Types
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The name of the application
   */
  appName: string;
  /**
   * The logo JSX element
   */
  logo: JSX.Element;
  /**
   * The function to use to register the user
   */
  onRegister: (data: RegisterFormData) => void;
}

export const RegisterForm: React.FC<Props> = ({
  appName,
  logo,
  onRegister,
  ...props
}) => {
  const [errors, setErrors] = useState([
    {
      input: 'none',
      message: ''
    }
  ]);

  const emailInput = useInput('');
  const passwordInput = useInput('');
  const confirmPasswordInput = useInput('');
  const nameInput = useInput('');

  const formId = `${useId()}-form`;
  const emailId = `${useId()}-email`;
  const passwordId = `${useId()}-password`;
  const confirmPasswordId = `${useId()}-confirm-password`;
  const nameId = `${useId()}-name`;

  const formValidator = () => {
    const errorList = [];
    if (!emailInput.value) {
      errorList.push({
        input: 'email',
        message: 'Email is required'
      });
    }
    if (!passwordInput.value) {
      errorList.push({
        input: 'password',
        message: 'Password is required'
      });
    }
    if (!confirmPasswordInput.value) {
      errorList.push({
        input: 'confirmPassword',
        message: 'Confirm password is required'
      });
    }
    if (!nameInput.value) {
      errorList.push({
        input: 'name',
        message: 'Name is required'
      });
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
      errorList.push({
        input: 'confirmPassword',
        message: 'Passwords do not match'
      });
    }
    setErrors(errorList);
    return errorList;
  };

  const handleSubmit = () => {
    const errorList = formValidator();
    if (errorList.length === 0) {
      return onRegister({
        email: emailInput.value,
        password: passwordInput.value,
        name: nameInput.value
      });
    }
    return false;
  };

  const getInputStatus = (input: string) => {
    const error = errors.find((error) => error.input === input);
    if (error) {
      return {
        status: 'error' as ComponentStatuses,
        statusMessage: error.message
      };
    }
    return {
      status: 'default' as ComponentStatuses,
      statusMessage: ''
    };
  };

  useEffect(() => {
    formValidator();
  }, [
    emailInput.value,
    passwordInput.value,
    confirmPasswordInput.value,
    nameInput.value
  ]);

  return (
    <Card className={styles['register']}>
      <CardBody overflowY="visible" className={styles['body']}>
        <div className={styles['header']}>
          <div className={styles['logo']}>{logo}</div>
          <h2 className={styles['title']}>Sign up to {appName}</h2>
        </div>
        <form
          className={styles[`form`]}
          {...props}
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <>
            <InputFactory
              id={emailId}
              labelText="Email"
              name="email"
              type="email"
              {...getInputStatus('email')}
              required
              {...emailInput}
            />
            <InputFactory
              id={passwordId}
              labelText="Password"
              name="password"
              type="password"
              {...getInputStatus('password')}
              required
              {...passwordInput}
            />
            <InputFactory
              id={confirmPasswordId}
              labelText="Confirm Password"
              name="confirmPassword"
              type="password"
              {...getInputStatus('confirmPassword')}
              required
              {...confirmPasswordInput}
            />
            <InputFactory
              id={nameId}
              labelText="Name"
              name="name"
              type="text"
              {...getInputStatus('name')}
              required
              {...nameInput}
            />
          </>

          <Button
            type="submit"
            variant="primary"
            className={styles['register-button']}
            label="Sign Up"
            disabled={errors.length > 0}
            onClick={handleSubmit}
          />
          <Button
            type="button"
            className={styles['forgot-password-button']}
            label="Already have an account? Login"
            variant="text"
            onClick={() => {
              window.location.href = '/login';
            }}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
