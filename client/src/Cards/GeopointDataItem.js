import React from 'react'

const GeopointDataItem = (props) => {
    return (
        <div>
            <li>
                <div>
                    {props.date}
                    {props.lat}
                    {props.lng}
                </div>
            </li>
        </div>
    )
}

export default GeopointDataItem
