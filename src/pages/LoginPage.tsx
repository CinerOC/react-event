import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loginUser } from '../store/authorization';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../const/const';
import TestingProfiles from '../components/TestingProfiles';
import { useMode } from '../theme';

const LoginPage = () => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const errorMessage = useAppSelector((store) => store.auth.errorMessage);
  const [theme] = useMode();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // Проверка на минимальную длину пароля
    if (passwordValue.length < 5) {
      setPasswordError('Пароль не менее 5 символов');
    } else {
      setPasswordError(null);
    }
  };

  const handleInputLoginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const email = e.target.value;
    setLogin(email);

    // Регулярное выражение для проверки формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Введите корректный email-адрес');
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = () => {
    if (!emailError) {
      dispatch(loginUser({ login, password }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoute.Profile, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  console.log('Login page render');

  return (
    <Box
      width={'100%'}
      display={'flex'}
      borderLeft={`1px solid ${theme.palette.grey[300]}`}
      borderRight={`1px solid ${theme.palette.grey[300]}`}
    >
      <Box display={'flex'} width={'100%'}>
        <Box
          marginLeft={'4rem'}
          marginTop={'64px'}
          sx={{
            maxWidth: '480px',
            display: 'flex',
            flexDirection: 'column',
            [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
              marginLeft: '2rem',
            },
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              marginTop: '2.5rem',
              marginLeft: '1rem',
            },
          }}
        >
          <Typography variant="h4">Авторизация</Typography>
          <Typography
            variant="h5"
            sx={{
              marginTop: 'calc(9rem + 0.047 * (100vw - 192rem))',
              marginBottom: '35px',
            }}
          >
            Вход
          </Typography>
          <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Логин"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                variant="outlined"
                value={login}
                placeholder="Введите e-mail"
                onChange={(e) => {
                  handleInputLoginChange(e);
                }}
                error={!!emailError || !!errorMessage}
                helperText={emailError || errorMessage}
                sx={{ fontSize: '20rem' }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">
                Пароль
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  handleInputPasswordChange(e);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? 'hide the password'
                          : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {(passwordError || errorMessage) && (
                <Typography color="error" variant="caption">
                  {passwordError || errorMessage}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ marginTop: '4rem' }}
            disabled={!login || !password || !!emailError || !!passwordError}
          >
            Войти
          </Button>
        </Box>
      </Box>
      <Box>
        <Divider orientation="vertical" />
      </Box>
      <Box display={'flex'} width={'100%'}>
        <Box
          marginLeft={'4rem'}
          marginTop={'64px'}
          sx={{
            [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
              marginLeft: '2rem',
            },
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              marginTop: '2.5rem',
              marginLeft: '1rem',
            },
          }}
        >
          <Typography variant="h4">Тестовые профили</Typography>
          <TestingProfiles />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
