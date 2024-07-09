import React, { useState, useEffect } from 'react';
import './index.css'
import toast from 'react-stacked-toast';
import axios from 'axios';
import { io } from 'socket.io-client';


function IndexView() {
    const base_url="http://127.0.0.1:3005/api"
    const socket_url="ws://127.0.0.1:3005"
    const [socket, setSocket] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [name, setName] = useState(null);
    const [scoreBroad, setScoreBroad] = useState([]);


    const handleClickLogin = async() => {
       if(name==null)
       {    toast.error({
                title: 'Error!',
                description: 'Plaese enter your name',
            });
            return;
       }
       try {
            const user=await axios.post(`${base_url}/login`,{name:name})
        
            toast.success({
                title: 'Success!',
                description: 'Login successfully',
            });
            sessionStorage.setItem('user',user.data)
            setDataUser(user.data.data)
       } catch (error) {
            toast.error({
                title: 'Error!',
                description: 'Something went wrong',
            });
       }

    }

    const handleEnterName = (e) => {
       setName(e.target.value)
    }
    const updateMyScore =async () => {  
        console.log(dataUser)
        if(dataUser==null||dataUser.tokens==null)
        {
            sessionStorage.clear()
            toast.error({
                title: 'Error!',
                description: 'Please login first',
            });
            setDataUser(null)
            return;
        }
        axios.post(`${base_url}/scores/update`,{name:dataUser.name},{headers:{'authorization':`Bearer ${dataUser.tokens}`}}).then(res=>{
            toast.success({
                title: 'Success!',
                description: 'Update score successfully',
            });
        }).cath(err=>{
            toast.error({
                title: 'Error!',
                description: 'Something went wrong',
            });
        })  
        

    }
 

    useEffect(() => {
        if (socket) {
            socket.on('updateScores', (message) => {
                setScoreBroad(message);
            });
        }
    }, [socket]);



    useEffect(() => {
        try {
            axios.get(`${base_url}/scores/top10`).then(res=>{
                setScoreBroad(res.data.scores)
            })
            
            //check user login
            const user=sessionStorage.getItem('user')
            if(user!=null)
            {
                setDataUser(user)
            }
            const newSocket = io(socket_url); 
            setSocket(newSocket);
            return () => {
                if (newSocket.readyState === 1) { 
                    newSocket.close();
                }
            }
        } catch (error) {
            toast.error({
                title: 'Error!',
                description: 'Something went wrong',
            });
        }
       
    }, []);



    return (
        <>
            <div className="container">
            {!dataUser ?
                <div className="row mb-3 mt-3" >
                    <div className="col-md-4">
                        <input type="text" className="form-control" onChange={handleEnterName} placeholder="Enter your name"/>
                    </div>
                    <div className="col-md-4">
                       <a id="login" className="btn btn-primary" href="#" onClick={handleClickLogin} role="button">Login</a>
                    </div>
                </div>:<div className="col-md-4 mt-3">
                       <a  id="update" className="btn btn-primary" onClick={updateMyScore} href="#" role="button">+1 my Score</a>
                    </div>
            }
                
                <div className="row  mt-3">
                    <div className="col-md-12">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                            {scoreBroad.map((item,index)=>{
                                return <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.score}</td>
                                </tr>
                            })}
                        
                       
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
        </>
    );
}

export default IndexView;
