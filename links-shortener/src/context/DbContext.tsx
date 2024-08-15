import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import useFetchCallback from "@/hooks/useFetchCallback";
import { TUrls, urlsArraySchema } from "@/schemas/dbSchema";
import { getAllAuthroized } from "@/supabase/db/selects";
import { TCrud } from "@/supabase/supabase";
import updateUrls from "@/supabase/db/update";
import insertUrl from "@/supabase/db/inserts";
import { deleteSelectedUrl } from "@/supabase/db/delete";
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
  const get = useFetchCallback<TUrls>(getAllAuthroized, urlsArraySchema);
  const insert = useFetchCallback<TCrud>(insertUrl);
  const update = useFetchCallback<TCrud>(updateUrls);
  const del = useFetchCallback<TCrud>(deleteSelectedUrl);

  useEffect(() => {
    get.execute(user?.id);
  }, []);

  // refresh data when user changes
  useEffect(() => {
    get.execute(user?.id);
  }, [insert.data, update.data, del.data]);

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
};
export { DbProvider };
export default useDb;
