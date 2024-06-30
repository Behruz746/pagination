import { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";

function App() {
  // photo malumotlari keladigan state
  const [photos, setPhotos] = useState([]);
  // pagening nechinchiligini saqlaydigan state
  const [currentPage, setCurrentPage] = useState(1);
  // fetching true yoki false bo'lyotgani saqlaydigan state
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // servergan malumotni olish
    axios
      .get(
        // api page hardoyim ozgarishi uchun currentPage state qo'yilgan
        `https://jsonplaceholder.typicode.com/photos?_limit=40&_page=${currentPage}`
      )
      // malutlarni qaytatan olish orniga kelgan malumotni eski malumot bilan qo'shib olish
      .then((response) => setPhotos([...photos, ...response.data]))
      // fetching tuagnini bildirish uchun false berish
      .finally(() => setFetching(false));

    // farbir faching bo'lganida currentPagega + 1 bo'ladi
    setCurrentPage((prev) => prev + 1);
  }, [fetching]);

  useEffect(() => {
    // scroll eventi
    document.addEventListener("scroll", scrollYHandler);
    // scroll event functioni remove bo'ladi
    return function () {
      document.removeEventListener("scroll", scrollYHandler);
    };
  }, []);

  const scrollYHandler = (e) => {
    // scroll malumotlari
    // scrollHeight - barcha heightini beradi
    let scrollHeight = e.target.documentElement.scrollHeight;
    // scrollTop - qancha scroll bo'lganligini beradi
    let scrollTop = e.target.documentElement.scrollTop;
    // innerHeight - userga ko'rinib turgan window heightni oladi
    let innerHeight = window.innerHeight;

    // agar scroll bolganda innerHeight 100 kamroq px qolsa berilgan topshiriq ammalga oshadi
    // yani web site eng pasiga borganda
    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      // malumot fetching bo'ladi
      setFetching(true);
    }
  };

  return (
    <div className="App">
      {photos?.map((photo, idx) => (
        <div key={idx} className="card">
          <div className="title">
            {photo.id} {photo?.title}
          </div>
          <img
            width={150}
            height={150}
            loading="lazy"
            src={photo.thumbnailUrl}
            alt={photo.title}
          />
        </div>
      ))}

      {fetching && (
        <div className="leader__cotaienr">
          <div class="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;
