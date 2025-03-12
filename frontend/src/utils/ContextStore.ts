import { createContext } from "react";
import { ContextData, ContextStoreData } from "../modules/shared/Types";

const ContextStore = createContext<ContextStoreData<ContextData>>({
    context: {} as ContextData,
    setContext: () => {}
})

export default ContextStore