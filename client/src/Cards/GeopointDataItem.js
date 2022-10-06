import React from 'react'

const GeopointDataItem = (props) => {
    return (
        <div>


            <table>
                <tr>
                    <th>Latitude</th>
                    <th>Longtitude</th>
                </tr>

                <tr>
                    <td>{props.lat}</td>
                    <td>{props.lng}</td>
                </tr>

            </table>



        </div>
    )
}

export default GeopointDataItem
