import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Loading from "../../utilities/Loading";
import Card from "./../../components/card/Card";
import API from "./../../lib/API";
import "./style.edit.css";

const Edit = () => {
  const [data, setData] = useState([]); // ডেটা
  const [loading, setLoading] = useState(true); // লোডিং স্টেট
  const [page, setPage] = useState(1); // পেজ ট্র্যাক
  const [hasMore, setHasMore] = useState(true); // ডেটা থাকা না থাকার স্টেট
  const observer = useRef(); // Intersection Observer রেফারেন্স

  // ডেটা লোড করা
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/articlesAdmin?page=${page}`);
        if (res.data.length > 0) {
          setData((prevData) => [...prevData, ...res.data]); // নতুন ডেটা যোগ
        } else {
          setHasMore(false); // আর কোনো ডেটা না থাকলে
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("ডাটা লোড করা যায়নি!");
        console.error(err);
      }
    };
    fetchData();
  }, [page]);

  // Intersection Observer দিয়ে শেষ কার্ড ট্র্যাক করা
  const lastCardRef = (node) => {
    if (loading) return; // লোডিং চলাকালীন কোনো কাজ করবে না
    if (observer.current) observer.current.disconnect(); // পূর্ববর্তী অবজারভার ডিসকানেক্ট
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); // পেজ ইনক্রিমেন্ট
      }
    });
    if (node) observer.current.observe(node); // নতুন নোড অবজার্ভ
  };

  // কার্ড তৈরি
  const card = data.map((d, index) => {
    if (data.length === index + 1) {
      // শেষ কার্ডের জন্য রেফারেন্স যুক্ত
      return (
        <div ref={lastCardRef} key={d._id}>
          <Card
            title={d.title}
            writer={d.writer}
            pera={d.cardData.pera}
            date={d.date}
            isPublic={d.public}
            id={d._id}
          />
        </div>
      );
    } else {
      return (
        <div key={d._id}>
          <Card
            title={d.title}
            writer={d.writer}
            pera={d.cardData.pera}
            date={d.date}
            isPublic={d.public}
            id={d._id}
          />
        </div>
      );
    }
  });

  return (
    <div className="container">
      {loading && page === 1 ? ( // প্রথমবার লোডিং
        <div style={{ margin: "3rem" }}>
          <Loading />
        </div>
      ) : (
        <div className="card_container">
          {data.length === 0 ? ( // ডেটা না থাকলে বার্তা
            <h1 style={{ padding: "2rem 2rem" }}>কোন পোস্ট পাওয়া যায়নি!</h1>
          ) : (
            card
          )}
        </div>
      )}
      {loading && page > 1 && <div style={{ margin: "2rem" }}><Loading /></div>} {/* ইনফিনিটি স্ক্রল লোডিং */}
      <ToastContainer />
    </div>
  );
};

export default Edit;
