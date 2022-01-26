import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Success = () => {

    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/marketplace')
        }, 5000)
    }, [])
    return (
        <>
            <div>
                <h1>Payment Success </h1>

            </div>
        </>
    )
}

export default Success;

