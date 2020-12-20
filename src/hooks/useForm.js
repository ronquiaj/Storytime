import { useState } from 'react';

export default function useForm(inputVal) {
    const [val, changeVal] = useState(inputVal);

    const setVal = e => {
        changeVal(e.target.value);
    }

    const reset = () => {
        changeVal("");
    }

    return [val, setVal, reset];
}
