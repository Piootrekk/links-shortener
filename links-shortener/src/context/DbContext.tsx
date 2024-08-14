import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import useFetchCallback from "@/hooks/useFetchCallback";
import { TUrls, urlsArraySchema } from "@/schemas/dbSchema";
import { getAllAuthroized } from "@/supabase/db/selects";
import { TCrud } from "@/supabase/supabase";
import upldateUrls from "@/supabase/db/update";
import insertUrl from "@/supabase/db/inserts";
import { deleteSelectedUrl } from "@/supabase/db/delete";

type DbContextType = {
  get: ReturnType<typeof useFetchCallback<TUrls>>;
  insert: ReturnType<typeof useFetchCallback>;
  update: ReturnType<typeof useFetchCallback>;
  del: ReturnType<typeof useFetchCallback>;
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
  const update = useFetchCallback<TCrud>(upldateUrls);
  const del = useFetchCallback<TCrud>(deleteSelectedUrl);

  useEffect(() => {
    get.execute(user?.id);
  }, []);

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
