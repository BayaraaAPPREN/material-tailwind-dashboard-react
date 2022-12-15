import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination flex justify-end'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item flex'>
            <a onClick={() => paginate(number)}  className='page-link border bg-green-600 text-white mr-[2px] border-green-600 px-2 cursor-pointer hover:bg-slate-300'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;