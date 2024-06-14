"use client";

import Link from "next/link";
import React, { useState } from "react";
import Container from "./container";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const PageHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="bg-secondary">
      <Container>
        <>
          <div className="flex py-4 sm:py-8 font-medium items-center">
            MSKCon
            <nav className="ml-auto hidden sm:block">
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
            <div className="ml-auto sm:hidden">
              <Button
                className="m-0 p-0"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <nav className="sm:hidden pb-4">
              <ul className="flex flex-col gap-4">
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
          )}
        </>
      </Container>
    </div>
  );
};

export default PageHeader;
