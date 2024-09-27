import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="space-y-4 flex flex-col items-center select-none">
      <div className="text-xl font-medium">Welcome to FileUploader</div>
      <Link to={"/file-upload"}>
        <Button>Check out!</Button>
      </Link>
    </div>
  );
};

export default HomePage;
