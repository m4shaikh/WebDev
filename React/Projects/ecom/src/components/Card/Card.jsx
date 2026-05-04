import './Card.css'
import { FiStar } from 'react-icons/fi';
const Card = ({image,title,prevPrice,newPrice,reviews}) => {
  return (
    <div className="card">
      <div className="image-container">
        <img src={image} alt={title}/>
      </div>
      <div className="title">
        {title}
      </div>
      <div className="reviews"><div><FiStar/><FiStar/><FiStar/><FiStar/></div>{reviews}</div>
      <div className='price'>
        <div className="prev-price">{prevPrice}</div>
        <div className="new-price">{newPrice}</div>
      </div>
    </div>
  );
};

export default Card;