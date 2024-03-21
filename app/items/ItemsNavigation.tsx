import type { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthButton } from "@/features/auth/AuthButton";
import { UserDropdown } from "@/features/auth/UserDropdown";
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";
import { DesktopVerticalMenu } from "@/features/navigation/DesktopVerticalMenu";
import { MobileDropdownMenu } from "@/features/navigation/MobileDropdownMenu";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { auth } from "@/lib/auth/helper";
import { displayName } from "@/lib/format/displayName";
import { SiteConfig } from "@/site-config";

import { ITEMS_LINKS } from "./items-links";

export const ItemsNavigation = async (props: PropsWithChildren) => {
  const user = await auth();
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div className="flex h-full flex-col lg:flex-row lg:overflow-hidden">
      {/* Desktop ONLY Navigation bar */}
      <div className="flex size-full max-w-[240px] flex-col border-r border-border px-2 py-4 max-lg:hidden">
        <div className="flex items-center gap-2">
          <Image
            src={SiteConfig.appIcon}
            alt="app logo"
            width={42}
            height={42}
          />
          <Link href="/" className="text-xl font-bold">
            {SiteConfig.title}
          </Link>
        </div>
        <div className="h-6" />
        <ScrollArea className="h-screen w-full">
          <DesktopVerticalMenu links={ITEMS_LINKS} />
        </ScrollArea>
        <div className="flex-1" />
        {isDev && user && (
          <UserDropdown>
            <Button variant="outline" size="sm">
              <Avatar className="mr-2 size-6">
                {!user.image && (
                  <AvatarFallback>
                    {user.email ? user.email.slice(0, 2).toUpperCase() : "??"}
                  </AvatarFallback>
                )}
                {user.image && (
                  <Image
                    src={user.image}
                    alt={displayName(user)}
                    width={24}
                    height={24}
                    className="aspect-square size-full"
                  />
                )}
              </Avatar>
              <span className="max-lg:hidden">{user.name}</span>
            </Button>
          </UserDropdown>
        )}
      </div>
      {/* Main container */}
      <div className="flex-1">
        {/* Header */}
        <header className="w-full border-b bg-background max-lg:sticky max-lg:top-0 max-lg:z-40">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex items-center gap-2 lg:hidden">
              <Image
                src={SiteConfig.appIcon}
                alt="app logo"
                width={32}
                height={32}
              />
              <Link href="/" className="text-lg font-bold ">
                {SiteConfig.title}
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4">
              {/* Mobile header */}
              <nav className="flex items-center space-x-1 lg:hidden">
                {isDev && <AuthButton />}
                <ThemeToggle />
                <MobileDropdownMenu links={ITEMS_LINKS} />
              </nav>
              {/* Desktop header */}
              <nav className="flex items-center space-x-1 max-lg:hidden">
                <ContactFeedbackPopover>
                  <Button variant="outline" size="sm">
                    Feedback
                  </Button>
                </ContactFeedbackPopover>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>

        {/* Content of the page */}
        <main className="py-4 lg:max-h-[calc(100vh_-_64px)] lg:flex-1 lg:overflow-auto lg:py-8">
          {props.children}
        </main>
      </div>
    </div>
  );
};
