"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";

export interface StoryblokLink {
  id?: string;
  url?: string;
  linktype?: "story" | "url" | "email";
  cached_url?: string;
  target?: "_blank" | "_self";
}

export interface NavItemBlock {
  _uid: string;
  component: "nav_item";
  label: string;
  link: StoryblokLink;
  _editable?: string;
}

export interface NavDropdownBlock {
  _uid: string;
  component: "nav_dropdown";
  label: string;
  sub_items: NavItemBlock[];
  _editable?: string;
}

export type NavigationItem = NavItemBlock | NavDropdownBlock;

export default function Navigation({ items }: { items: NavigationItem[] }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenDropdown(null);
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <ul ref={menuRef} className="flex gap-6 items-center text-sm font-medium text-gray-600 dark:text-gray-300">
      {items.map((item) => {
        
        // Render a flat navigation link
        if (item.component === "nav_item") {
          const href = item.link.linktype === "story" 
            ? `/${item.link.cached_url}` 
            : item.link.url;
            
          return (
            <li key={item._uid} {...storyblokEditable(item)}>
              <Link 
                href={href || "#"} 
                target={item.link.target || "_self"}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          );
        }

        // Render an interactive dropdown and recursively map its children
        if (item.component === "nav_dropdown") {
          const isOpen = openDropdown === item._uid;

          return (
            <li key={item._uid} {...storyblokEditable(item)} style={{ position: 'relative' }}>
              <button 
                aria-haspopup="menu" 
                aria-expanded={isOpen}
                onClick={() => setOpenDropdown(isOpen ? null : item._uid)}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
                <svg 
                  width="12" height="12" viewBox="0 0 24 24" 
                  fill="none" stroke="currentColor" strokeWidth="2.5" 
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ 
                    transition: 'transform 0.2s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              {isOpen && (
                <div className="nav-dropdown-panel">
                  <Navigation items={item.sub_items} />
                </div>
              )}
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}
