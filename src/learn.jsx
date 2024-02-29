import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

function Learn() {
    const history = useNavigate();
    const [uname, setname] = useState('');
    const [ui, setid] = useState();
    const [data, setdata] = useState([]);
    const [cat, setcat] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history('/');
        } else {
            axios.get('http://127.0.0.1:8000/home/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setname(response.data.username);
                setid(response.data.userid);
            })
            .catch(error => {
                console.error('Home:', error);
                if (error.response && error.response.status === 401) {
                    history('/');
                }
            });
        }
    }, []); 
    const f =()=>{
        axios.get('http://127.0.0.1:8000/co/')
            .then((res)=>{
                console.log(res.data)
                setdata(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/cat/')
    
        .then((res) => {
            
        f()
        setcat(res.data);
        })
        .catch((err) => {
            console.log('cat:', err);
        });
    }, []); 
    function logout() {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/logout/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                localStorage.removeItem('token');
                history('/');
            })
            .catch(error => {
                console.error('Logout:', error);
            });
        } else {
            console.error('Token not available');
        }
    }
     
    function getcat(c) {
        axios.post('http://127.0.0.1:8000/co/', { 'cn': c })
        .then((res) => {
            setdata(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="bg-black">
            <div className="flex absolute top-4 right-6 gap-6">
                <Button onClick={logout} className='bg-lime-500 py-3 px-4 text-xl rounded border border-lime-500 hover:text-lime-500 hover:bg-slate-950'>Logout</Button>
                <a href='/profile' className='bg-lime-500 py-1 px-4 text-xl border border-lime-500 hover:text-lime-500 hover:bg-slate-950 rounded'>Hi.. {uname}!</a>
            </div>

            <div className="flex gap-10 ">
                <div>
                    <Card className="w-[18rem] h-[700px] border border-black flex flex-col items-center gap-6 bg-slate-950 text-lime-500">
                        <CardTitle className="mt-7 w-[90%] ease-in-out hover:text-center  hover:border-lime-500 hover:text-lime-500 hover:border-2 p-2 rounded" onClick={() => getcat('all')}>All</CardTitle>
                        {cat.map((v, i) => (
                            <a href="#" className="w-[100%] ease-in  hover:text-center hover:border-lime-500 hover:text-lime-500 hover:border-2 p-2 rounded"><CardTitle  onClick={() => getcat(v.catname)} key={i}>{v.catname}</CardTitle></a>
                        ))}
                    </Card>
                </div>

                <ScrollArea className="h-screen">
                    <div className="flex gap-4 flex-wrap mt-16">
                        {data.map((v, i) => (
                            <Card key={i} className="w-[20rem] bg-slate-950 text-lime-500 border-2 border-lime-500">
                                <CardHeader className="flex items-center flex-col bottom-2">
                                    <img className="w-[10rem] h-[9rem]" src={`http://127.0.0.1:8000${v.cimg}`} />
                                    <CardTitle>{v.corname}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{v.cdes1}</CardDescription>
                                </CardContent>
                                <CardFooter className="flex flex-wrap justify-evenly ">
                                    <CardDescription className="bg-lime-200 p-1 px-6 rounded text-black"> {v.dur}</CardDescription>
                                    <CardDescription className="bg-lime-200 p-1 px-4 rounded text-black"> {v.author}</CardDescription>
                                </CardFooter>
                                <div className="flex justify-center pb-4">
                                <a href={`/home/learn/cd/${v.courseid}`}><Button className="bg-lime-500 text-black border-lime-500 border hover:text-lime-500 hover:bg-slate-950 rounded">Learn</Button></a>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

export default Learn;
