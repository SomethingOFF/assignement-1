import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthWrapperProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  label,
  description,
  children,
}) => {
  return (
    <Card className="border-none max-w-[600px] w-full select-none p-2">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="text-xl">{label} ^_^</CardTitle>
        <CardDescription className="sm:text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthWrapper;
