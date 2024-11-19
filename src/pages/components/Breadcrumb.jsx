import React from 'react';

const Breadcrumb = ({ title, links }) => {
  return (
    <div className="p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold text-gray-800 text-left">{title}</h1>
      <nav className="flex mt-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {links.map((link, index) => (
            <li key={index} className="inline-flex items-center">
              {link.href ? (
                <a
                  href={link.href}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-orange-500"
                >
                  {index > 0 && (
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 9l4-4-4-4"
                      />
                    </svg>
                  )}
                  {link.label}
                </a>
              ) : (
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                  {link.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
