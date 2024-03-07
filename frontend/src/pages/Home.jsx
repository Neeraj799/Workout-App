import React, { useEffect, useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts')
            const json = await response.json()

            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [workouts])

    const handleDeleteWorkout = (e) => {
        setWorkouts((prevWorkouts) => {
            prevWorkouts.filter((workout) => workout._id !== e.id)
        })
    }

    return (
        < div className='home' >
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} onDelete={handleDeleteWorkout} />
                ))}
            </div>
            <WorkoutForm />
        </div >
    )
}

export default Home
