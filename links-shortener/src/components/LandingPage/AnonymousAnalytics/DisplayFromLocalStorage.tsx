import useLocalStorage from "@/hooks/useLocalStorage";
import { key, anonLinksSchema } from "@/schemas/localStorageSchema";


const DisplayFromLocalStorage = () => {
    const {value, setValue, error} = useLocalStorage(key, [], anonLinksSchema)
    return (

  )
};

export default DisplayFromLocalStorage;
