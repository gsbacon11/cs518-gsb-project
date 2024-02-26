"use client";
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { Menu } from '@headlessui/react'



export default function Header() {

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
            <span className="sr-only">Your Company</span>
            <img
              className="h-10 w-auto"
              src="/old-dominion-monarchs.svg"
              alt=""
            />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a href="/user/">Home</a>
            <a href="/user/account-settings">Settings</a>
        </Popover.Group>
      </nav>
    </header>
  );
}