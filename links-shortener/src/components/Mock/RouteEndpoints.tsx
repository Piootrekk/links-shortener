import router from "@/router/router";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const RouteEndpoints = () => {
  const routes = router.routes;
  return (
    <div>
      <h1 className="text-3xl font-bold">Route Endpoints</h1>
      <Button variant={"link"} onClick={() => console.log(routes)}>
        Log Routes
      </Button>
      {routes[0].children!.map((route) => (
        <Link to={route.path!} key={route.path}>
          <p>{route.path}</p>
        </Link>
      ))}
    </div>
  );
};

export default RouteEndpoints;
