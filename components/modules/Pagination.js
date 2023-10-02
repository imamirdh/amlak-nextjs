import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Pagination({
  items,
  itemsCount,
  setShownHomes,
  pathName,
}) {
  const router = useRouter();
  const { pageId: pageId } = router.query;
  const [pagesCount, setPagesCount] = useState(null);

  useEffect(() => {
    console.log(items);
    let endIndex = itemsCount * pageId;
    let startIndex = endIndex - itemsCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShownHomes(paginatedItems);
    console.log(paginatedItems);
    let pageNumber = Math.ceil(items.length / itemsCount);
    setPagesCount(pageNumber);
  }, [pageId, items]);

  return (
    <div>
      <ul className="pagination__list">
        {Array(pagesCount)
          .fill(0)
          .map((item, index) => (
            <>
              {index + 1 === Number(pageId) ? (
                <li className="pagination__item active">
                  <Link href={`${pathName}/${index + 1}`} className="">
                    {index + 1}
                  </Link>
                </li>
              ) : (
                <li className="pagination__item ">
                  <Link href={`${pathName}/${index + 1}`} className="">
                    {index + 1}
                  </Link>
                </li>
              )}
            </>
          ))}
        {/* <li className="pagination__item">
          <a href="#" className=""></a>
        </li>
        <li className="pagination__item">
          <a href="#" className="">
            2
          </a>
        </li>
        <li className="pagination__item active">
          <a href="#" className="">
            1
          </a>
        </li> */}
      </ul>
    </div>
  );
}
