import JoditEditor from 'jodit-react';
import { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import API from "./../../lib/API";

import sound from "./../../utilities/sound";
import "./style.createPost.css"; // css

import { IoCloseSharp } from "react-icons/io5"; // icon
const CreatePost = () => {

  const [options, setOptions] = useState([]);


  useEffect(() => {
    API.get("/categorie")
      .then(res => {
        const {data} = res;
        const options = data.map(item => {
          return {
            value: item.english,
            label: item.bangla
          }
        })
        setOptions(options);
      })
      .catch(err => console.log(err))
  }, [])

// ================== State ==================

  const [open, setOpen] = useState(false);


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [checked, setChecked] = useState(true);
  


  // ================ card =================
  const [cardBody, setCardBody] = useState("");
  const editor2 = useRef(null);

  const config2 = useMemo(() => ({
    uploader: { insertImageAsBase64URI: true },
    readonly: false,
  }), []);



  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
// ================== Jodit Editor ==================
  const editor = useRef(null);
	const [content, setContent] = useState('');

  const config = useMemo(() => ({
    uploader: { insertImageAsBase64URI: true },
    readonly: false,
}), []);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  }


  // ================== Post Request ==================

  const handleClick = (e) => {

    // Validation
    if (title === "") {
      toast.error("শিরোনাম ফিল্ড খালি রাখা যাবে না!");
      sound.err()
      return;
  }
  if (writer === "") {
      toast.error("লেখক ফিল্ড খালি রাখা যাবে না!");
      sound.err()
      return;
  }
  if (cardBody === "") {
      toast.error("কার্ডের প্যারাগ্রাফ ফিল্ড খালি রাখা যাবে না!");
      sound.err()
      return;
  }
  if (content === "") {
      toast.error("পোস্টের কনটেন্ট খালি রাখা যাবে না!");
      sound.err()
      return;
  }
  if (selectedOptions.length === 0) {
      toast.error("অন্তত একটি ক্যাটাগরি নির্বাচন করতে হবে!");
      sound.err()
      return;
  }

  const data = {
    title,
    categories: selectedOptions,
    article : content,
    writer,
    images : [],
    cardData: {
      header: title,
      img: "img",
      pera: cardBody
    },
    public: checked,
  }

    e.stopPropagation();
    setOpen(false);
    API.post("/article/", JSON.stringify(data),
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
   )
    .then(res =>{ 
      setContent("");
      setSelectedOptions([]);
      setTitle("");
      setWriter("")
      setCardBody("");
      toast.success(res.data.message);
      sound.mess()
    })
    .catch(err => {
      toast.error(err.response.data.error);
      sound.err()
    })
  }


 

  return (
    <div className="contanier">

      <div className="section_card">


        <h3 className="h3">শিরোনাম</h3>
        <input type="text" className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder='Write a title!'/>

        <h3 className="h3">লেখক</h3>

        <input type="text" className="input" placeholder="Write your name!" value={writer} onChange={e => setWriter(e.target.value)} />

        <h3 className='h3'>ক্যাটাগরি বাছাই করুন</h3>
        <Select 
          options={options} 
          value={selectedOptions}
          onChange={e => setSelectedOptions(e)}
          isMulti={true}
        />

      </div>

      <div className="section_card">
        <h3 className="h3">কার্ডের প্যারাগ্রাফ</h3>
        
        <JoditEditor
          ref={editor2}
          config={config2}
          onChange={(newContent) => setCardBody(newContent)}
        />

      </div>

      <div className={`section_card ${open ? 'editor' : ''}`} onClick={() => setOpen(true)}>
        <h3 className='h3'>পোস্ট লিখুন</h3>

        {open ? <span className='close_icon' onClick={handleClose
        }>
            <IoCloseSharp className='_icon'/>
          </span> : null  
        }

        <JoditEditor
          ref={editor}
          config={config}
          onChange={(newContent) => setContent(newContent)}
        />
        

        <div className="checkbox-wrapper-4">
      <input
        className="inp-cbx"
        id="morning"
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label className="cbx" htmlFor="morning">
        <span>
          <svg width="12px" height="10px">
            <use xlinkHref="#check-4"></use>
          </svg>
        </span>
        <span>প্রকাশ করুন</span>
      </label>
      <svg className="inline-svg">
        <symbol id="check-4" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>



        <button className='btn' onClick={handleClick}>পোস্ট করুন</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreatePost
