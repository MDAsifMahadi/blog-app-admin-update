import PropTypes from 'prop-types';
import { FaEdit, FaRegCalendarAlt } from "react-icons/fa";
import { FaFeatherPointed } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import "./style.card.css";




const Card = ({title = "", writer = "", pera ="", isPublic, date, id}) => {
  
  const navigae = useNavigate()
  
  const handleClickEdit = e => {
    e.stopPropagation();
    navigae(`/edit/post/${id}`);
  }
 

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
  

const mainDate = formatMongoDateToBangla(date); 

  

  return (
    <article className='card post' onClick={()=>navigae(`/article/${id}`)}>
     <div className='card__header'>
     <h2 className="title">{title}</h2>
      {
        isPublic ? <p className="isPublic">
          <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.99 4.59V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1h-2v2h6c.55 0 1 .45 1 1v3h1c.89 0 1.64.59 1.9 1.4A8 8 0 0 0 20 12c0-3.35-2.08-6.23-5.01-7.41M8.99 16v-1l-4.78-4.78C4.08 10.79 4 11.39 4 12c0 4.07 3.06 7.43 6.99 7.93V18c-1.1 0-2-.9-2-2" opacity="0.3"/><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1.01 17.93C7.06 19.43 4 16.07 4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4"/></svg>
          Public</p> : <p className="isPublic">
          <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a6.5 6.5 0 0 0-6.5 6.5V9H3v14h18V9h-2.5V7.5A6.5 6.5 0 0 0 12 1m4.5 6.5V9h-9V7.5a4.5 4.5 0 0 1 9 0M7 12.504h2.004V15H7zM7 16.5h2.004v2.504H7z"/></svg>
            Private</p>
      }
      <p className="writer__name">
        <FaFeatherPointed className="feather" />{writer}
      </p>
     </div>

      <div dangerouslySetInnerHTML={{__html : pera}} className='pera' />
      <p className="date"><FaRegCalendarAlt className="calendar" />{mainDate}</p>
      <span className='mini-btn card_btn' onClick={handleClickEdit}><FaEdit /> Edit</span>
    </article>
  )
}
Card.propTypes = {
  title: PropTypes.string,
  writer: PropTypes.string,
  pera: PropTypes.string,
  isPublic: PropTypes.bool,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;

