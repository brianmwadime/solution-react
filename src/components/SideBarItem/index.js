import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';

const SideBarItem = ({ href, icon, title, isActive }) => {

  return (
    <>
      <li>
        <a aria-label={title} title={title} href={href} className={cn(
          "flex flex-row space-x-4 hover:no-underline hover:bg-gray_601 hover:rounded-[5px] cursor-pointer mr-6 text-white ml-6 py-[10px] px-[10px]",
          { 'bg-gray_601 rounded-[5px]': isActive }
        )}>
          {icon}
          <span className="hidden md:block">{title}</span>
        </a>
      </li>
    </>
  );

}

SideBarItem.propTypes = {
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

export { SideBarItem };