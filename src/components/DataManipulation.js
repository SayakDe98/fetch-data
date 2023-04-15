import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import './DataManipulation.module.css';

const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@')};
    }

    return { val: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }

    return { val: '', isValid: false };
};

const DataManipulation = () => {
    const [ data, setData ] = useState([]);
    const [ name, setName ] = useState('');
    const [ formIsValid, setFormIsValid ] = useState(false);
    const getDataUrl = 'http://localhost:5000/api/users';
    const postDataUrl = 'http://localhost:5000/api/register';
    const [ getUsersData, setGetUsersData ] = useState(false);
    const [ showRegister, setShowRegister ] = useState(false);
    const [ emailState, dispatchEmail ] = useReducer(emailReducer,{
        val: '',
        isValid: null
    }); 
    const [ passwordState, dispatchPassword ] = useReducer(passwordReducer,{
        val: '',
        isValid: null
    }); 

    const { isValid : emailIsValid } = emailState;
    const { isValid : passwordIsValid } = passwordState;

    const getData = async() => {
        try {
            const response = await axios.get(getDataUrl);
            const data = response.data;
            // console.log(data)
            setData(data);
        } catch (error) {
            console.log(error);
        }}
    useEffect(() => {
        getData();
    },[]);

    const nameChangeHandler = event => {
        setName(event.target.value);                  
    }
    const emailChangeHandler = event => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    }
    const passwordChangeHandler = event => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value});
    }

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("Checking form validity");
            setFormIsValid(emailIsValid && passwordIsValid && name)
        },500);
        return (() => {
            console.log("Cleanup function");
            clearTimeout(identifier);
        })
    },[ emailIsValid, passwordIsValid, name]);

    
        const postData = async() => {
            try {
                const registerData = { name, email: emailState.value, password: passwordState.value };
                await axios.post(postDataUrl, registerData);
            } catch(error) {
                console.log(error);
            }
        };

   const submitHandler = event => {
    event.preventDefault();
    postData();
    setName('');
    passwordState.value = '';
    emailState.value = '';
   }
  
   const getUsers = () => {
    setGetUsersData(!getUsersData);
   };

   const registerHandler = () => {
    setShowRegister(!showRegister);
   }

    return(
        <React.Fragment>
            <button onClick={getUsers}>Users</button>
            <button onClick={registerHandler}>Register</button>
            {getUsersData && data.map((user,i) => {
                const {name, email,_id} = user;
                return(
                        <React.Fragment key={_id}>
                        <h2 className="h2">Name: {name}</h2>
                        <h5>Email: {email}</h5>
                        </React.Fragment>
                   
                )
            })}
            {showRegister &&
            <div>
                <h1 >Sign Up</h1>
                <form onSubmit={submitHandler}>
                   
                        <input name='name'  value={name} label="name" onChange={nameChangeHandler} type='text' placeholder="John Doe"/>
                   
                        <input name='email' value={emailState.value} label="email" onChange={emailChangeHandler}  type='email' placeholder="john.doe@gmail.com"/>
                    
                        <input name='password' value={passwordState.value} label="password" type='password' onChange={passwordChangeHandler}  placeholder="password"/>
                    
                    <button type="submit" disabled={!formIsValid}>Register</button>
                </form>
            </div>
            }
        </React.Fragment>
    )
};

export default DataManipulation;