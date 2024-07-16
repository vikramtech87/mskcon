"use client";

import Container from "@/components/container";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ProfileFormData } from "@/schemas/profile";
import { auth, db } from "@/services/firebase/client";
import { useStore } from "@/store/useStore";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { Loader2, Menu, User2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "Guest" | "User";

type Resource = {
  label: string;
  url: string;
  roles: Set<Role>;
  key: string;
};

const Header = () => {
  const {
    setAuth,
    authStore,
    isAuthLoaded,
    setProfileLoading,
    setProfile,
    setMealLoading,
    setMeal,
    setWorkshopLoading,
    setWorkshop,
  } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser === null) {
        setAuth(undefined);
      } else {
        setAuth({
          authUser,
        });
      }
    });

    return () => unsubscribe();
  }, [setAuth]);

  useEffect(() => {
    setProfileLoading();
    const userId = authStore.authState?.authUser.uid;
    if (userId === undefined) {
      setProfile();
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "profile", userId), (doc) => {
      if (!doc.exists()) {
        setProfile();
        return;
      }

      setProfile(doc.data() as ProfileFormData | undefined);
    });

    return () => unsubscribe();
  }, [authStore, setProfileLoading, setProfile]);

  useEffect(() => {
    setMealLoading();
    const userId = authStore.authState?.authUser.uid;
    if (userId === undefined) {
      setMeal();
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "meal", userId), (doc) => {
      if (!doc.exists()) {
        setMeal();
        return;
      }

      const { preference } = doc.data() as { preference: "veg" | "non-veg" };

      setMeal(preference);
    });

    return () => unsubscribe();
  }, [authStore, setMealLoading, setMeal]);

  useEffect(() => {
    setWorkshopLoading();
    const userId = authStore.authState?.authUser.uid;
    if (userId === undefined) {
      setWorkshop();
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "workshop", userId), (doc) => {
      if (!doc.exists()) {
        setWorkshop();
        return;
      }

      const { workshopId } = doc.data() as { workshopId: string };
      setWorkshop({ workshopId });
    });

    return () => unsubscribe();
  }, [authStore, setWorkshopLoading, setWorkshop]);

  const authEmail = authStore.authState?.authUser.email ?? undefined;
  const userRole: Role = authEmail === undefined ? "Guest" : "User";

  const everyOne: Set<Role> = new Set(["Guest", "User"] as Role[]);
  const onlyUser: Set<Role> = new Set(["User"] as Role[]);

  const resources: Resource[] = [
    {
      label: "Home",
      roles: everyOne,
      url: "/",
      key: "home",
    },
    {
      label: "Schedule",
      roles: everyOne,
      url: "/schedule",
      key: "schedule",
    },
    {
      label: "Contact Us",
      roles: everyOne,
      url: "/contact-us",
      key: "contact-us",
    },
    {
      label: "Accomodation",
      roles: everyOne,
      url: "/accomodation",
      key: "accomodation",
    },
    {
      label: "Posters",
      roles: onlyUser,
      url: "/registration/profile",
      key: "posters",
    },
  ];

  const filteredResources = resources.filter((resource) =>
    resource.roles.has(userRole)
  );

  return (
    <>
      <MobileNav
        filteredResources={filteredResources}
        isAuthLoaded={isAuthLoaded()}
        authEmail={authEmail}
      />
      <DesktopNav
        filteredResources={filteredResources}
        isAuthLoaded={isAuthLoaded()}
        authEmail={authEmail}
      />
    </>
  );
};

type NavProps = {
  filteredResources: Resource[];
  authEmail?: string;
  isAuthLoaded: boolean;
};

type AuthNavProps = {
  authEmail?: string;
  isAuthLoaded: boolean;
};

const MobileNav = ({
  filteredResources,
  authEmail,
  isAuthLoaded,
}: NavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-secondary sm:hidden">
      <Container>
        <nav className="flex flex-col space-y-8 py-2">
          <div className="font-medium text-secondary-foreground flex items-center justify-between">
            <div>MSKCon</div>
            <Button
              variant="ghost"
              className="sm:hidden p-0"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          {isMobileMenuOpen && (
            <>
              <ul className="flex flex-col space-y-4">
                {filteredResources.map((resource) => (
                  <li key={resource.key}>
                    <Link href={resource.url}>{resource.label}</Link>
                  </li>
                ))}
              </ul>
              <MobileAuthNav
                isAuthLoaded={isAuthLoaded}
                authEmail={authEmail}
              />
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

const MobileAuthNav = ({ authEmail, isAuthLoaded }: AuthNavProps) => {
  const isAuthenticated = authEmail !== undefined;

  if (!isAuthLoaded) {
    return <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />;
  }

  if (!isAuthenticated) {
    return (
      <ul className="flex flex-col space-y-4">
        <li>
          <Link href="/auth/login">Login</Link>
        </li>
        <li>
          <Link
            href="/auth/register"
            className={buttonVariants({ variant: "default" })}
          >
            Register
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex flex-col space-y-4">
      <li className="text-muted-foreground">{authEmail}</li>
      <li>
        <Link href="/auth/logout">Logout</Link>
      </li>
      <li>
        <Link
          href="/registration/next"
          className={buttonVariants({ variant: "default" })}
        >
          Continue registration
        </Link>
      </li>
    </ul>
  );
};

const DesktopNav = ({
  authEmail,
  isAuthLoaded,
  filteredResources,
}: NavProps) => {
  const isAuthenticated = authEmail !== undefined;

  return (
    <header className="bg-secondary hidden sm:block text-sm font-medium">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="font-bold text-secondary-foreground">
            <div>
              <Link href="/">MSKCon</Link>
            </div>
          </div>

          <ul className="flex space-x-4 md:space-x-6 lg:space-x-8 py-4">
            {filteredResources.slice(1).map((resource) => (
              <li key={resource.key}>
                <Link href={resource.url}>{resource.label}</Link>
              </li>
            ))}
          </ul>

          <DesktopAuthNav isAuthLoaded={isAuthLoaded} authEmail={authEmail} />
        </nav>
      </Container>
    </header>
  );
};

const DesktopAuthNav = ({ isAuthLoaded, authEmail }: AuthNavProps) => {
  const isAuthenticated = authEmail !== undefined;

  if (!isAuthLoaded) {
    return <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />;
  }

  if (!isAuthenticated) {
    return (
      <ul className="flex space-x-4 items-center">
        <li>
          <Link href="/auth/login">Login</Link>
        </li>
        <li>
          <Link
            href="/auth/register"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Register
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="flex space-x-4">
      <div className="hidden md:block">
        <Link
          href="/registration/next"
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          Complete registration
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User2 size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{authEmail}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="md:hidden">
            <Link className="block w-full" href="/registration/next">
              Complete registration
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="block w-full" href="/auth/logout">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
