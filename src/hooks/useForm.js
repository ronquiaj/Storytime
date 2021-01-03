import { useState } from 'react';

export default function useForm(inputVal) {
    const [val, changeVal] = useState(inputVal);

    const setVal = e => {
        changeVal(e.target.value);
    }

    const setValNoE = input => {
        changeVal(input);
    }

    return [val, setVal, setValNoE];
}
