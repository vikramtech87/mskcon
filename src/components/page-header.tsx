import Link from "next/link";
import React from "react";
import Container from "./container";

const PageHeader = () => {
  return (
    <div className="bg-secondary">
      <Container>
        <div className="flex py-8 font-medium">
          MSKCon
          <nav className="ml-auto">
            <ul className="flex gap-8">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/auth/sign-in">Sign in</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;
