import React from 'react'


function Input({className,type,placeHolder,id}) {
    return (
        <input
            className={className}
            type={type}
            id={id}
            placeholder={placeHolder}
        />
    )
}
export default Input