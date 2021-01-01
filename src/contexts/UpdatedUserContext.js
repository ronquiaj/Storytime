import { useState, createContext } from "react";

export const UpdatedUserContext = createContext();

export function UpdatedUserProvider(props) {
  const [updated, changeUpdated] = useState(false);

  // This function will be passed as a prop to all consumers, and triggering it will change the value of updated, which is used with useEffects to
  // trigger a page re-render

  const userUpdated = () => {
    changeUpdated(!updated);
    changeUpdated(!updated);
  };

  return (
    <UpdatedUserContext.Provider value={{ updated, userUpdated }}>
      {props.children}
    </UpdatedUserContext.Provider>
  );
}
