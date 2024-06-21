import "./car-item-form.css";

const CarItemForm = (props) => {
  return (
    <div className="car-item-form-container">
      <a href={`/car-info/${props.id}`} className="car-info-link">
        <div className="image">
          <img src={props.imgUrl} alt={props.imgUrl} />
        </div>
        <div className="info">
          <p className="car-name">{props.name}</p>
          <div className="car-info-2row">
            <p className="car-price">{props.price}</p>
            <p className="car-year">{props.year}.</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CarItemForm;
