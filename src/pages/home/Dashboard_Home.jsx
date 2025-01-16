import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import API from "./../../lib/API";
import Loading from "./../../utilities/Loading";
import "./style.dashboard_home.css";
const Dashboard_Home = () => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API("/api/admininfo")
      .then(res => {
        setData(res.data)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [])

  const {mostViewedPost} = data;

  return (<>
  { loading ? <Loading /> :
    <div className="contanier">
      <div className="card_div">
        <div className="card total">
          <h3>সর্বমোট পোস্ট</h3>
          <h4>{data.totalArticle}</h4>
        </div>
        <div className="card total">
          <h3>আজকে পরিদর্শক</h3>
          <h4>{data.dailyVisits}</h4>
        </div>  
        <div className="card total">
          <h3>সর্বমোট পরিদর্শক</h3>
          <h4>{data.totalVisits}</h4>
        </div>
      </div>
      <div>

     <div>

        <div className="section_card home_card">
            <h3 className="h3">{mostViewedPost ? "সবচেয়ে বেশি দেখা পোস্ট" : "কোনো পোস্ট পাওয়া যায়নি"}</h3>
            { 
            mostViewedPost ?   
            <Card 
            title={data?.mostViewedPost.title} 
            writer={data?.mostViewedPost.writer} 
            pera={data?.mostViewedPost.cardData.pera} 
            date={data?.mostViewedPost.date}
            isPublic={data?.mostViewedPost.public}
            id={data?.mostViewedPost._id}
            />
              : 
              null
            }
          </div>  

     </div>
     
      </div>
    </div>
}
    </>
  )
}

export default Dashboard_Home
