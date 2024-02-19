"use client";
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { Menu } from '@headlessui/react'



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function MenuComponent(){
    return(
        <Paper sx={{width: 320, maxWidth: '100%'}}>
            <MenuList>
                <MenuItem>
                <Typography variant='body1' color='text.secondary'> Idk </Typography>
                </MenuItem>

            </MenuList>

        </Paper>
    );
  }

    function MenuDropdown() {
        return(
            <Menu>
                 <Menu.Button>Account</Menu.Button>
                <Menu.Items>
                    <Menu.Item>
                    {({ active }) => (
                <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
                >
                Account settings
                </a>
          )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        )
    }


  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="/old-dominion-monarchs.svg"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a href="/user/account-settings">Account</a>
        </Popover.Group>
      </nav>
    </header>
  );
}