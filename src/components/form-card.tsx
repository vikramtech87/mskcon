import React from "react";
import FormContainer from "./form-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type FormCardProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

const FormCard: React.FC<FormCardProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <FormContainer>
      <Card className="mt-4 sm:mt-20">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </FormContainer>
  );
};

export default FormCard;
