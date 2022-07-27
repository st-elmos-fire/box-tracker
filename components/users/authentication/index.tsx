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

// Import Stylesheet
import styles from './styles.module.scss';

type LoginProps = {
  email: string;
  password: string;
  codeChallenge: string;
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
   * Pre-fill code challenge?
   */
  codeChallenge?: string;
  /**
   * Should the form show the password field?
   * @default true
   */
  showPassword?: boolean;
  /**
   * Should the form show the code challenge field?
   * @default false
   */
  showCodeChallenge?: boolean;
  /**
   * Should the continue button be disabled or enabled?
   * @default true
   */
  disableLogin?: boolean;
  /**
   * Send the form data to the parent component
   */
  onFormUpdated?: Dispatch<SetStateAction<LoginProps>>;
  /**
   * On Login button click
   */
  onLogin?: (data: Record<Key, unknown>) => void;
  /**
   * On code confirmation button click
   */
  onCodeConfirmation?: (data: Record<Key, unknown>) => void;
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
  codeChallenge = '',
  showPassword = true,
  showCodeChallenge = false,
  disableLogin = true,
  onFormUpdated,
  onLogin,
  onCodeConfirmation,
  buttonLabel = 'Continue',
  textButton = {},
  loginError = '',
  ...props
}) => {
  const [emailInputValue, setEmailInputValue] = useState(email);
  const [passwordInputValue, setPasswordInputValue] = useState(password);
  const [codeChallengeInputValue, setCodeChallengeInputValue] =
    useState(codeChallenge);
  const [errorMessage, setErrorMessage] = useState(loginError);

  useEffect(() => {
    setErrorMessage(loginError);
  }, [loginError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const emailValue = name === 'email' ? value : emailInputValue;
    const passwordValue = name === 'password' ? value : passwordInputValue;
    const codeChallengeValue =
      name === 'codeChallenge' ? value : codeChallengeInputValue;

    setEmailInputValue(emailValue);
    setPasswordInputValue(passwordValue);
    setCodeChallengeInputValue(codeChallengeValue);
    setErrorMessage('');

    if (onFormUpdated) {
      onFormUpdated({
        email: emailValue,
        password: passwordValue,
        codeChallenge: codeChallengeValue
      });
    }
  };

  const formId = `${useId()}-form`;
  const emailId = `${useId()}-email`;
  const passwordId = `${useId()}-password`;
  const codeChallengeId = `${useId()}-code-challenge`;

  return (
    <Card className={styles['authentication']}>
      <CardBody overflowY="visible" className={styles['body']}>
        <div className={styles['header']}>
          {logoUrl && (
            <img src={logoUrl} alt="Logo" className={styles['logo']} />
          )}
          <h2 className={styles['title']}>Login to Defence Engage</h2>
        </div>
        <form
          className={styles[`form`]}
          {...props}
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {showCodeChallenge ? (
            <InputFactory
              id={codeChallengeId}
              name="codeChallenge"
              labelText="Code Challenge"
              type="text"
              onChange={handleChange}
            />
          ) : (
            <>
              <InputFactory
                id={emailId}
                labelText="Email"
                name="email"
                type="email"
                value={emailInputValue}
                onChange={handleChange}
              />
              {showPassword ? (
                <InputFactory
                  id={passwordId}
                  labelText="Password"
                  name="password"
                  type="password"
                  value={passwordInputValue}
                  onChange={handleChange}
                />
              ) : (
                <div className={styles['welcome-back-message']}>
                  <p>Welcome back to Defence Engage.</p>

                  <p>
                    Please continue to sign in with your Microsoft Mobile
                    Authenticator
                  </p>
                </div>
              )}
            </>
          )}
          {errorMessage && (
            <p className={styles['error-message']}>{errorMessage}</p>
          )}
          <Button
            type="submit"
            className={styles['submit-button']}
            label={buttonLabel}
            variant="create"
            disabled={disableLogin}
            onClick={() => {
              if (!showCodeChallenge) {
                onLogin &&
                  onLogin({
                    email: emailInputValue,
                    password: passwordInputValue
                  });
              } else {
                onCodeConfirmation &&
                  onCodeConfirmation({
                    codeChallenge: codeChallengeInputValue
                  });
              }
            }}
          />
          {textButton.label && (
            <Button
              type="button"
              className={styles['resend-code-button']}
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
