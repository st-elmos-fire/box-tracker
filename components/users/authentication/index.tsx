import React, {
  useState,
  useId,
  useEffect,
  Key,
  Dispatch,
  SetStateAction
} from 'react';

// Import components
import { Button, Card, CardBody, InputFactory } from 'components';

// Import hooks
import { useInput } from 'lib/hooks';

// Import Stylesheet
import styles from './styles.module.scss';

type LoginProps = {
  email: string;
  password: string;
};

// Prop Types
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The path to the logo image (won't be displayed if empty)
   */
  logoUrl?: string;
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
  logoUrl,
  email = '',
  password = '',
  disableLogin = false,
  onLogin,
  buttonLabel = 'Login',
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
          {logoUrl && (
            <picture>
              <img src={logoUrl} alt="Logo" className={styles['logo']} />
            </picture>
          )}
          <h2 className={styles['title']}>Login to What&rsquo;s in the box</h2>
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
          <Button
            type="submit"
            className={styles['submit-button']}
            label={buttonLabel}
            disabled={disableLogin}
            onClick={() => {
              onLogin &&
                onLogin({
                  email: emailInput.value as string,
                  password: passwordInput.value as string
                });
            }}
          />
          {textButton.label && (
            <Button
              type="button"
              className={styles['forgot-password-button']}
              label={textButton.label}
              variant="text"
              onClick={textButton.onClick}
            />
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default Authentication;
