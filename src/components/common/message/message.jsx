import React from "react"
import PropTypes from "prop-types"

const Message = ({payload}) => {
    let position = "col"
    let color = "#D6D6D2"
    if (payload.name === "user") {
        position = "col text-end"
        color = "#A0CFA8"
    }
    return ( 
        <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className={position}>
                        <span className="badge text-dark p-3" style={{ backgroundColor: color }}>{payload.message}</span>
                    </div>
                </div>
            </div>
     )
}
Message.propTypes = {
    value: PropTypes.object
}
 
export default Message
