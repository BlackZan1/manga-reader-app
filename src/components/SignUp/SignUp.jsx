import React from 'react';
import './SignUp.scss';
import { Input, Button, Spin } from 'antd';
import MainHeader from '../Header/MainHeader/MainHeader';
import { NavLink } from 'react-router-dom';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Formik } from 'formik';

const SignUp = ({ onSubmitHandler, onSuccessSubmit, error }) => {
    return (
        <div className='auth'>
            <MainHeader />

            <div className='auth-form signup'>
                <h1>Sign <span style={{color: 'deeppink'}}>Up</span></h1>

                <Formik
                    initialValues={{ email: '', password: '', username: '', rPassword: '' }}
                    validate={(values) => {
                        const errors = {};

                        if(!values.email) errors.email = 'Required';
                        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email';

                        if(!values.password) errors.password = 'Required';
                        else if(values.password.length < 9) errors.password = 'Password must be more than 9 symbols';
                        else if(values.password.length > 28) errors.password = 'Password must be less than 28 symbols';
                    
                        if(!values.username) errors.username = 'Required';

                        if(values.rPassword !== values.password) errors.rPassword = 'Passwords should be the same';

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmitHandler(values).then(res => {
                            setSubmitting(false);

                            console.log(res);

                            if(res.error) return;

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
                                placeholder="Your email" 
                                type='email'
                                name='email'
                                prefix={<AiOutlineMail />} 
                                value={values.email}
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                style={{borderColor: !!errors.email && !!touched.email ? 'crimson' : '#d9d9d9'}}
                            />

                            <Input 
                                size="large" 
                                placeholder="Your username" 
                                type='text'
                                name='username' 
                                prefix={<AiOutlineUser />} 
                                value={values.username}
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                style={{borderColor: !!errors.username && !!touched.username ? 'crimson' : '#d9d9d9'}}
                            />

                            <Input.Password
                                name='password'
                                onBlur={handleBlur} 
                                placeholder='Your password'
                                value={values.password} 
                                onChange={handleChange} 
                                style={{borderColor: !!errors.password && !!touched.password ? 'crimson' : '#d9d9d9'}}
                            />

                            <Input.Password 
                                placeholder='Confirm your password'
                                name='rPassword'
                                value={values.rPassword}
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                style={{borderColor: !!errors.rPassword && !!touched.rPassword ? 'crimson' : '#d9d9d9'}}
                            />

                            <Button 
                                type="primary"
                                htmlType="submit" 
                                size={'large'}
                                style={{width: 100, height: 40, background: isSubmitting ? '#fff' : '#1890ff'}}
                            >
                                {
                                    isSubmitting ? <Spin /> : 'Sign up'
                                }
                            </Button>

                            {
                                error && <div className='auth-error'>
                                    {
                                        error
                                    }
                                </div>
                            }

                            <p>Have an account? <NavLink to={'/login'}>Login</NavLink></p>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUp;