import React, { useState, useId, useEffect } from 'react';

// Import components
import { Button, Card, CardBody, InputFactory } from 'components';

// Import hooks
import { useInput } from 'lib/hooks';

// Import Stylesheet
import styles from './styles.module.scss';

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
   * If the email address is already available, this will be the value of the email input
   */
  email?: string;
  /**
   * If the password is already available, this will be the value of the password input
   */
  password?: string;
  /**
   * Should the continue button be disabled or enabled?
   * @default true
   */
  disableLogin?: boolean;
  /**
   * On Login button click
   */
  onLogin?: ({ email, password }: { email: string; password: string }) => void;
  /**
   * Text to display on the button
   * @default Continue'
   */
  buttonLabel?: string;
  /**
   * Props for an additional text button (button doesn't show up if not provided)
   * @default {}
   */
  textButton?: {
    label?: string;
    onClick?: () => void;
  };
  /**
   * If there is an error, display it here
   */
  loginError?: string;
}

// Render component
export const Authentication: React.FC<Props> = ({
  appName,
  logo,
  email = '',
  password = '',
  disableLogin = false,
  onLogin,
  textButton = {},
  loginError = '',
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState(loginError);

  const emailInput = useInput(email);
  const passwordInput = useInput(password);

  useEffect(() => {
    setErrorMessage(loginError);
  }, [loginError]);

  const formId = `${useId()}-form`;
  const emailId = `${useId()}-email`;
  const passwordId = `${useId()}-password`;

  return (
    <Card className={styles['authentication']}>
      <CardBody overflowY="visible" className={styles['body']}>
        <div className={styles['header']}>
          <div className={styles['logo']}>{logo}</div>
          <h2 className={styles['title']}>Login to {appName}</h2>
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
              {...emailInput}
            />
            <InputFactory
              id={passwordId}
              labelText="Password"
              name="password"
              type="password"
              {...passwordInput}
            />
          </>
          {errorMessage && (
            <p className={styles['error-message']}>{errorMessage}</p>
          )}
          <div className={styles['main-buttons']}>
            <Button
              type="submit"
              className={styles['submit-button']}
              label="Login"
              disabled={disableLogin}
              onClick={() => {
                onLogin &&
                  onLogin({
                    email: emailInput.value as string,
                    password: passwordInput.value as string
                  });
              }}
            />
            <Button
              type="submit"
              variant="secondary"
              className={styles['register-button']}
              label="Register"
              disabled={disableLogin}
              onClick={() => {
                window.location.href = '/register';
              }}
            />
          </div>
          <Button
            type="button"
            className={styles['forgot-password-button']}
            label="I've forgotten my password"
            variant="text"
            onClick={textButton.onClick}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default Authentication;
