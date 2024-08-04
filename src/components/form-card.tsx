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
      <div className="py-4 sm:pt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </FormContainer>
  );
};

export default FormCard;
