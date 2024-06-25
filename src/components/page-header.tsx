"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "./container";
import { Loader2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase/client";
import { useStore } from "@/store/useStore";
import PrimaryNav from "./primary-nav";

type Role = "Guest" | "User";

type Resource = {
  label: string;
  url: string;
};

type RestrictedResource = Resource & {
  roles: Role[];
};

const commonResources: Resource[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Contact Us",
    url: "/contact-us",
  },
  {
    label: "Accomodation",
    url: "/accomodation",
  },
];

const restrictedResources: RestrictedResource[] = [
  {
    label: "Sign In",
    roles: ["Guest"],
    url: "/auth/login",
  },
  {
    label: "Register",
    roles: ["Guest"],
    url: "/auth/register",
  },
  {
    label: "Sign Out",
    roles: ["User"],
    url: "/auth/logout",
  },
];

const PageHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { authStore, isAuthLoaded, isAuthenticated, setAuth } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser === null) {
        setAuth(undefined);
      } else {
        setAuth({
          email: authUser.email!,
          userId: authUser.uid,
          isEmailVerified: authUser.emailVerified,
        });
      }
    });

    return () => unsubscribe();
  }, [setAuth]);

  const currentRole: Role = isAuthenticated() ? "User" : "Guest";

  const filteredRestrictedResources = restrictedResources.filter((resource) =>
    resource.roles.includes(currentRole)
  );

  return (
    <div className="bg-secondary">
      <Container>
        <>
          <div className="flex py-4 sm:py-8 font-medium items-center">
            MSKCon
            <nav className="ml-auto hidden sm:block">
              <ul className="flex gap-8 items-center">
                <PrimaryNav />
                {isAuthLoaded() &&
                  filteredRestrictedResources.map((resource) => (
                    <li key={resource.label}>
                      <Link href={resource.url}>{resource.label}</Link>
                    </li>
                  ))}
                {!isAuthLoaded() && (
                  <Loader2 className="mr-2 h-4 w-4 text-muted-foreground animate-spin" />
                )}
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
                <PrimaryNav />
                {isAuthLoaded() &&
                  filteredRestrictedResources.map((resource) => (
                    <li key={resource.label}>
                      <Link href={resource.url}>{resource.label}</Link>
                    </li>
                  ))}
                {!isAuthLoaded() && (
                  <Loader2 className="mr-2 h-4 w-4 text-muted-foreground animate-spin" />
                )}
              </ul>
            </nav>
          )}
        </>
      </Container>
    </div>
  );
};

export default PageHeader;
