import React from "react"
import {Link} from "react-router-dom"

const Exercise = ({exercise, onDeleteExercise}) => {
    const {username, description, duration, date, _id} = exercise;
    // console.log(_id)

    return (
        <tr>
            <td>{username}</td>
            <td>{description}</td>
            <td>{duration}</td>
            <td>{date.substring(0, 10)}</td>
            <td>
                <Link
                    to={"/edit/" + _id}
                >
                    edit
                </Link> |
                <button
                    href="#"
                    onClick={() => onDeleteExercise(_id)}
                >
                    delete
                </button>
            </td>
        </tr>

    )
}

export default Exercise;