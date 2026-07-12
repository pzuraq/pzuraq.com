import { Link } from 'react-router';
import { component, useSignal } from 'signalium/react';

import NavLink from '~/components/NavLink';
import SocialLinks from '~/components/SocialLinks';
import ThemeToggle from '~/components/ThemeToggle';

export default component(function Nav() {
  const menuOpen = useSignal(false);

  return (
    <nav className="w-full p-4 md:p-8 md:pr-0 2xl:w-80 lg:w-64 md:w-36 md:fixed md:h-screen font-cursive text-center flex flex-col-reverse md:flex-col overflow-y-auto overflow-x-hidden">
      <Link to="/art" className="-mt-8 -mb-4 mx-4 md:m-0 hover:scale-105">
        <img
          src="/assets/store-day.png"
          alt="A peaceful little bookstore"
          className="w-full dark:hidden pixel aspect-square"
        />
        <img
          src="/assets/store-night.png"
          alt="A peaceful little bookstore"
          className="w-full hidden dark:block pixel aspect-square"
        />
      </Link>

      <div className="flex-grow -mt-10 md:mt-0">
        <Link to="/" className="lg:text-4xl text-3xl">
          pzuraq
        </Link>
        <br />
        <a
          href="http://ipa-reader.xyz/?text=z%C9%99-r%C3%A4k&voice=Joanna"
          className="lg:text-xl text-lg hover:text-ochre-500"
        >
          /zə-räk/
        </a>

        <div
          className={`text-2xl md:text-base flex md:flex flex-col justify-center mt-4 items-center ${
            menuOpen.value ? '' : 'hidden'
          }`}
        >
          <NavLink href="/" match={/^\/(blog\/.*)?$/} className="main-nav-link">
            <div className="square" />
            blog
          </NavLink>
          <NavLink href="/favs" className="main-nav-link">
            <div className="square" />
            favs
          </NavLink>
          <NavLink href="/about" className="main-nav-link">
            <div className="square" />
            about
          </NavLink>
        </div>
      </div>

      <SocialLinks className="pt-8 hidden md:flex md:flex-col lg:flex-row" />

      <div className="md:hidden flex justify-between p-4">
        <button
          onClick={() => menuOpen.update((open) => !open)}
          aria-label="Toggle menu"
          className="menu-btn"
        >
          <i className={menuOpen.value ? 'icon-close' : 'icon-menu'} />
        </button>

        <ThemeToggle />
      </div>
    </nav>
  );
});
