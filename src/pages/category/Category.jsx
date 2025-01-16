import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../utilities/Loading';
import API from "./../../lib/API";
import sound from "./../../utilities/sound";
import "./style.category.css"; // CSS style 




const Category = () => {

    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({
        bangla : "",
        english : ""
    });
    const [categorys, setCategorys] = useState([]);

  //  ================ Category  post==============

  const handlePostNewCategory = () => {
  
    if(newCategory.bangla === "") {
      toast.error("বাংলায় লিখুন");
      sound.err()
      return
    }
    if(newCategory.english === "") {
      toast.error("ইংরেজিতে লিখুন");
      sound.err()
      return
    }
    
    API.post("/categorie", JSON.stringify(newCategory), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        toast.success(res.data.message);
        sound.mess();
        setNewCategory({
          bangla : "",
          english : ""
        })
        setLoading(true)
      })
      .catch(err => {
        toast.error(err.response.data.error);
        sound.err();
      })
  }

  // ================ Category  delete==============

    const handleDeleteCategory = (e) => {
    
    let confirm = window.confirm("Are you sure to delete it?");

    if (confirm === true) {
      API.delete(`/categorie/${e.target.id}`)
        .then(res => {
          setLoading(true)
          toast.success(res.data.message);
          sound.mess();
        })
        .catch(err => {
          toast.error(err.response.data.error);
          sound.err();
        })
      } else { 
          toast.warning("You pressed Cancel!");
          sound.err();
      }
    }
   


    //  ================ Category  get==============

  useEffect(() => {
    API.get("/categorie")
      .then(res => {
        const {data} = res;
        setCategorys(data);
        setLoading(false)
        
      })
      .catch(err => console.log(err))
  }, [loading])


  return (
    <div className='contanier'>
            <div className="section_card">
        <h3 className='h3'>ক্যাটাগরি যুক্ত করুন</h3>
        <input type="text" value={newCategory.bangla} onChange={e => setNewCategory({...newCategory, bangla : e.target.value})} placeholder="বাংলায় লিখুন" className='input' />

        <input type="text" value={newCategory.english} onChange={e => setNewCategory({...newCategory, english : e.target.value})} placeholder="ইংরেজিতে লিখুন" className='input' />
        <button className='btn' onClick={handlePostNewCategory}>যুক্ত করুন</button>

        <h3 className='h3 mt'>সমস্ত ক্যাটাগরি</h3>
       

       {
        loading ? <Loading /> : <div className="list">
        {
          categorys.map(c => (
            <div className='li' key={Math.random().toString()}>
              <span>বাংলা : <span className='name'>{c.bangla}</span></span>
              <span>ইংরেজি : <span className='name'>{c.english}</span></span>
              <span className='mini-btn' id={c._id} onClick={handleDeleteCategory}>Delete</span>
            </div>
          ))
        }
      </div>

       }

      </div>
      <ToastContainer/>
    </div>
  )
}

export default Category;
