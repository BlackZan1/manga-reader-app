import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Spin } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import MainHeader from '../Header/MainHeader/MainHeader';

import './Login.scss';
import { useLocalStorage } from '../../hooks/localStorage.hook';

const Login = ({ onSubmitHandler, onSuccessSubmit, error }) => {
    let { set } = useLocalStorage('ani.ma_U');

    return (
        <div className='auth'>
            <MainHeader />

            <div className='auth-form'>
                <h1>Log<span style={{color: 'deeppink'}}>in</span></h1>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={(values) => {
                        const errors = {};

                        if(!values.email) errors.email = 'Required';
                        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email';

                        if(!values.password) errors.password = 'Required';
                        else if(values.password.length < 9) errors.password = 'Password must be more than 9 symbols';
                        else if(values.password.length > 28) errors.password = 'Password must be less than 28 symbols';
                    
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmitHandler(values).then(res => {
                            setSubmitting(false);

                            if(res.error) return;

                            set({ t: res.token });

                            onSuccessSubmit();
                        })
                    }}
                >
                    {({ 
                        values, 
                        errors, 
                        touched, 
                        handleChange, 
                        handleBlur, 
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Input 
                                size="large" 
                                name='email' 
                                onBlur={handleBlur} 
                                placeholder="Your email" 
                                type='email' 
                                prefix={<AiOutlineMail />} 
                                value={values.email} 
                                onChange={handleChange} 
                                style={{borderColor: !!errors.email && !!touched.email ? 'crimson' : '#d9d9d9'}}
                            />

                            <Input.Password 
                                name='password' 
                                onBlur={handleBlur} 
                                placeholder="Your password" 
                                value={values.password} 
                                onChange={handleChange} 
                                style={{borderColor: !!errors.password && !!touched.password ? 'crimson' : '#d9d9d9'}}
                            />

                            <Button 
                                type="primary"
                                htmlType="submit" 
                                size={'large'}
                                style={{width: 100, height: 40, background: isSubmitting ? '#fff' : '#1890ff'}}
                            >
                                {
                                    isSubmitting ? <Spin /> : 'Login'
                                }
                            </Button>

                            {
                                error && <div className='auth-error'>
                                    {
                                        error
                                    }
                                </div>
                            }

                            <p>Not registered? <NavLink to={'/signup'}>Create an account</NavLink></p>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;