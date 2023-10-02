import React, { useEffect, useState } from "react";
import db from "./../../data/db.json";
// import Home from "@/components/modules/Home";
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
 
const Home = dynamic(() => import('@/components/modules/Home'), { ssr: false })
const Pagination = dynamic(() => import('@/components/modules/Pagination'), { ssr: false })
function index() {
  const router = useRouter()
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-1");
  const [homes, setHomes] = useState([...db.homes]);
  const [shownHomes, setShownHomes]=useState([]);

  const {pageId:pageId}=router.query

  useEffect(() => {
    const newHomes = db.homes.filter((home) => home.title.includes(search));
    setShownHomes(newHomes);
    console.log(pageId)
  }, [search]);

  useEffect(() => {
    switch (sort) {
      case "price": {
        const newHomes = [...homes].sort((a, b) => a.price - b.price);
        setHomes(newHomes);
        break;
      }
      case "room": {
        const newHomes = [...homes].sort((a, b) => a.roomCount - b.roomCount);
        setHomes(newHomes);
        break;
      }
      case "meterage": {
        const newHomes = [...homes].sort((a, b) => a.meterage - b.meterage);
        setHomes(newHomes);
        break;
      }
      default: {
        setHomes([...db.homes]);
      }
    }
  }, [sort]);

  return (
    <div className="home-section" id="houses">
      <div className="home-filter-search">
        <div className="home-filter">
          <select defaultValue={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="-1">انتخاب کنید</option>
            <option value="price">بر اساس قیمت</option>
            <option value="room">بر اساس تعداد اتاق</option>
            <option value="meterage">بر اساس اندازه</option>
          </select>
        </div>
        <div className="home-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو کنید"
          />
        </div>
      </div>

      <div className="homes">
        {shownHomes.map((home) => (
          <Home key={home.id} {...home} />
        ))}
      </div>
          <Pagination
          items={homes}
          itemsCount={6}
          setShownHomes={setShownHomes}
          pathName={`/homes`}
          />
      
    </div>
  );
}

export default index;
