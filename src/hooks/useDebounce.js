import { useState, useEffect } from "react";

import React from 'react'

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncevalue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncevalue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce
