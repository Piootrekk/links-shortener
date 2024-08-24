import { createContext, useContext, useEffect } from "react";
import useFetchCallback from "@/hooks/useFetchCallback";
import { TUrls, urlsArraySchema } from "@/schemas/dbSchema";
import {
  insertLink,
  updateLink,
  deleteLink,
  TCrud,
  userLinks,
} from "@/Api/crudAuth";
import { useAuth } from "./AuthContext";

type DbContextType = {
  get: ReturnType<typeof useFetchCallback<TUrls>>;
  insert: ReturnType<typeof useFetchCallback<TCrud>>;
  update: ReturnType<typeof useFetchCallback<TCrud>>;
  del: ReturnType<typeof useFetchCallback<TCrud>>;
};

const DbContext = createContext<DbContextType | undefined>(undefined);

const useDb = () => {
  const context = useContext(DbContext);
  if (context === undefined) {
    throw new Error("useDb must be used within an DbProvider");
  }
  return context;
};

const DbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const get = useFetchCallback<TUrls>(userLinks, urlsArraySchema);
  const insert = useFetchCallback<TCrud>(insertLink);
  const update = useFetchCallback<TCrud>(updateLink);
  const del = useFetchCallback<TCrud>(deleteLink);
  const { user } = useAuth();
  useEffect(() => {
    if (get.data) get.execute(user?.session.access_token);
  }, [insert.data, update.data, del.data]);

  return (
    <DbContext.Provider
      value={{
        get,
        insert,
        update,
        del,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
export { DbProvider };
export default useDb;
