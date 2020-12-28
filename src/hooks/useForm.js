import { useState } from 'react';

export default function useForm(inputVal) {
    const [val, changeVal] = useState(inputVal);

    const setVal = e => {
        changeVal(e.target.value);
    }

    const reset = () => {
        changeVal("");
    }

    const setFile = e => {
        changeVal(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    return [val, setVal, reset, setFile];
}
