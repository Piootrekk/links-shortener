import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import useFetchCallback from "@/hooks/useFetchCallback";
import { TUrls, urlsArraySchema } from "@/schemas/dbSchema";
import {
  insertLink,
  updateLink,
  deleteLink,
  TCrud,
  userLinks,
} from "@/Api/crudAuth";

import { User } from "@supabase/supabase-js";

type DbContextType = {
  get: ReturnType<typeof useFetchCallback<TUrls>>;
  insert: ReturnType<typeof useFetchCallback<TCrud>>;
  update: ReturnType<typeof useFetchCallback<TCrud>>;
  del: ReturnType<typeof useFetchCallback<TCrud>>;
  user: User | null | undefined;
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
  const { user } = useAuth();
  const get = useFetchCallback<TUrls>(userLinks, urlsArraySchema);
  const insert = useFetchCallback<TCrud>(insertLink);
  const update = useFetchCallback<TCrud>(updateLink);
  const del = useFetchCallback<TCrud>(deleteLink);

  useEffect(() => {
    if (user !== null && user !== undefined) get.execute();
  }, [insert.data, update.data, del.data]);

  if (user === null) return <>{children}</>;
  else {
    return (
      <DbContext.Provider
        value={{
          get,
          insert,
          update,
          del,
          user,
        }}
      >
        {children}
      </DbContext.Provider>
    );
  }
};
export { DbProvider };
export default useDb;
