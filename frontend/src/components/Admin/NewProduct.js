import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddLinkIcon from '@mui/icons-material/AddLink';
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  
  const [imageURL, setImageURL] = useState("");

  const stock = 999999;


 

  const categories = [
    "Telegram",
    "Whatsapp",
    "Facebook",
    "Instagram",
    "Maps",
    "Gmail",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const ImageByCtegory = (category) => {
    switch (category) {
      case "Telegram":
        return "https://techyuzer.com/wp-content/uploads/2022/07/Create-a-Telegram-Bot.png";
      case "Whatsapp":
        return "https://images.tenorshare.com/topics/whatsapp-tips/whatsapp-bot.jpg";
      case "Facebook":
        return "https://blog.hartleybrody.com/wp-content/uploads/2016/06/facebook-chatbot.png";
      case "Instagram":
        return "https://www.bestproxyreviews.com/wp-content/uploads/2020/10/Best-Instagram-Bots.jpg";
      case "Maps":
        return "https://cdn.wccftech.com/wp-content/uploads/2022/05/Google-Maps-2.jpg";
      case "Gmail":
        return "https://wallpapercave.com/wp/wp2054123.jpg";
      case "SmartPhones":
        return "https://wallpaperaccess.com/full/1650990.jpg";
      default:
        return "https://images.idgesg.net/images/article/2017/08/robot_gear_automation_thinkstock_606703118_3x2-100732427-large.jpg";
    }
  };


  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      category,
      Stock:999999,
      googleDriveLink,
      images:  imageURL?  [imageURL] : [ImageByCtegory(category)],
    };

    dispatch(createProduct(productData));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <AddLinkIcon />
              <input
                type="text"
                placeholder="Google Drive Link"
                value={googleDriveLink}
                onChange={(e) => setGoogleDriveLink(e.target.value)}
              />
            </div>


            <div>
              <AddLinkIcon />
              <input
                type="text"
                placeholder="Image URL(OPTIONAL)"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
