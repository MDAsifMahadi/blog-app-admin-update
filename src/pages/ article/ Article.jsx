import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../lib/API";
import Loading from "../../utilities/Loading";
import "./style.Article.css"; // css style

// icons
import { FaFeatherPointed } from "react-icons/fa6";
import { MdDateRange, MdRemoveRedEye } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

const  Article = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    API.get(`/onearticleadmin/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [id]);

const formatMongoDateToBangla = (mongoDate) => {
    const date = new Date(mongoDate);
  
    // Intl.DateTimeFormat ব্যবহার করে বাংলায় ফরম্যাট করা
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  
    return formattedDate;
  }


  return (
    <article className="blog__page">
     {
      loading ? <Loading /> :
      <>
         <h2 className="h2">{data.title}</h2>

         <h3 className="writer__name article_data"><FaFeatherPointed className="feather"/>  {data.writer}</h3>
         <h3 className="writer__name article_data"><MdRemoveRedEye className="feather "/>  {data.view} Views</h3>
         <h3 className="writer__name article_data"><MdDateRange className="feather "/> {formatMongoDateToBangla(data.date)}</h3>

         <div className="category_div">
          {
            data.categories.map(catagory => (
              <span key={Math.random().toString()} className="writer__name article_data article_category">
                <TbCategoryPlus className="feather "/> {catagory.label}
              </span>
            ))
          }
         </div>

         <div dangerouslySetInnerHTML={{ __html: data.article }} />
      </>
     }
    </article>
  )
}

export default  Article;
