import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'

interface Hold {
    id?: number
    pxs?: string
    pys?: string
    createdAt: Date
    updatedAt: Date
}

interface Problem {
    id: number
    name: string
    grade: string
    setter: string
    date: Date
    rate: number
    done: number
    feet: boolean
    createdAt: Date
    updatedAt: Date
}

const nodejs = 'http://192.168.1.6:5121'
const socket = io(nodejs, {
    withCredentials: true,
})

const randomChar = () => (Math.random() + 1).toString(36).substring(7)
const randomNumber = (max: number) => Math.floor(Math.random() * max) + 1

const App = () => {
    const [users, setUsers] = useState(0)
    const [holds, setHolds] = useState<Hold[]>([])
    const [problems, setProblems] = useState<Problem[]>([])

    useEffect(() => {
        //Sockets
        socket.on('user:traffic', (_users) => {
            setUsers(_users)
            console.log('User connected : ', _users)
        })

        socket.on('holds:create', (_hold: Hold) => {
            setHolds((holds) => [...holds, _hold])
            console.log('Hold created : ', _hold)
        })

        socket.on('holds:delete', (_id: Hold['id']) => {
            setHolds((holds) => holds.filter((hold) => hold.id !== Number(_id)))
            console.log('Hold deleted : ', _id)
        })

        socket.on('holds:list', (_holds: Hold[]) => {
            setHolds(_holds)
            console.log('Holds listed : ', _holds)
        })

        socket.on('problems:create', (_problem: Problem) => {
            setProblems((problems) => [...problems, _problem])
            console.log('Problem created : ', _problem)
        })

        socket.on('problems:delete', (_id: Problem['id']) => {
            setProblems((problems) =>
                problems.filter((problem) => problem.id !== Number(_id))
            )
            console.log('Problem deleted : ', _id)
        })

        socket.on('problems:list', (_problems: Problem[]) => {
            setProblems(_problems)
            console.log('Problems listed : ', _problems)
        })

        //Fetchs
        getAllHold()
        getAllProblems()

        return () => {
            socket.off('user:traffic')
            socket.off('holds:create')
            socket.off('holds:delete')
            socket.off('holds:list')
            socket.off('problems:create')
            socket.off('problems:delete')
            socket.off('problems:list')
        }
    }, [])

    const addProblem = () => {
        const data = {
            name: randomChar(),
            grade: randomChar(),
            setter: randomChar(),
            date: new Date(),
            rate: randomNumber(5),
            done: randomNumber(100),
            feet: true,
        }

        fetch(`${nodejs}/api/problems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const getAllProblems = async () => {
        try {
            const res = await fetch(`${nodejs}/api/problems`)
            const _problems = await res.json()
            setProblems(_problems)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const deleteAllProblems = () => {
        fetch(`${nodejs}/api/problems`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const deleteProblem = (id: Problem['id']) => {
        fetch(`${nodejs}/api/problems/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const addHold = () => {
        const data = { pxs: randomChar(), pys: randomChar() }

        fetch(`${nodejs}/api/holds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const getAllHold = async () => {
        try {
            const res = await fetch(`${nodejs}/api/holds`)
            const _holds = await res.json()
            setHolds(_holds)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const deleteAllHolds = () => {
        fetch(`${nodejs}/api/holds`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const updateHold = (id: number, data: Hold) => {
        fetch(`${nodejs}/api/holds/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const getHold = (id: number) => {
        fetch(`${nodejs}/api/holds/${id}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const deleteHold = (id: Hold['id']) => {
        fetch(`${nodejs}/api/holds/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <div className="App">
            <h1>Le Pierrier</h1>
            <div className="data">
                <div className="holds">
                    <h2>Holds</h2>
                    <div>
                        <button onClick={addHold}>Add</button>
                        <button onClick={deleteAllHolds}>Delete all</button>
                    </div>
                    <hr />
                    {holds.length > 0 ? (
                        <div>
                            {holds.map((hold: Hold) => (
                                <p key={hold.id}>
                                    <strong>{hold.id}</strong> {' - '}[{' '}
                                    {hold.pxs}, {hold.pys} ] {' - '}
                                    <button onClick={() => deleteHold(hold.id)}>
                                        Delete
                                    </button>
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p>No holds...</p>
                    )}
                    <hr />
                </div>
                <div className="problems">
                    <h2>Problems</h2>
                    <div>
                        <button onClick={addProblem}>Add</button>
                        <button onClick={deleteAllProblems}>Delete all</button>
                    </div>
                    <hr />
                    {problems.length > 0 ? (
                        <div>
                            {problems.map((problem: Problem) => (
                                <p key={problem.id}>
                                    <strong>{problem.id}</strong> {' - '}
                                    {problem.name}
                                    {' - '}
                                    <button
                                        onClick={() =>
                                            deleteProblem(problem.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p>No problems...</p>
                    )}
                    <hr />
                </div>
            </div>

            <div>
                <p>{users} user(s) connected</p>
            </div>
        </div>
    )
}

export default App
