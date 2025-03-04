import React, { useEffect,useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useListForHomeQuery } from "../../api/product.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { useCreateCartMutation } from "../../api/cart.api";
import { toast } from "react-toastify";

const ProductDetails = ({ toogleCart }) => {
  const { slug, _id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState(""); // State for size

  const [activeIndex, setActiveIndex] = useState(null);         
  const toggleHelp = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  //call the  product api
  const { data, isLoading } = useListForHomeQuery({});
  //call the create cart api
  const [createCart] = useCreateCartMutation();

  const [selectSize, setSelectSize] = useState(false);

  const toggleSelectSize = () => {
    setSelectSize(!selectSize);
  };
  if(selectSize){
    document.body.classList.add('active_select_sizes')
  }
  else{
    document.body.classList.remove('active_select_sizes')

  }

  useEffect(() => {
    if (data) {
      const productsById = data?.result?.data || [];
      const foundProduct = productsById.find(
        (item) => item._id === _id || item.slug === slug
      );
      setProduct(foundProduct || null); // Set the found product
    }
  }, [data, _id, slug]);

  if (isLoading) return <LoadingComponent 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
    }} 
  />;

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size to add the product to the cart");
      return;
    }
    setLoading(true)

    try {
      // Optimistically add product to the cart by modifying the cache
      const response = await createCart({
        productId: product._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();

      toast.success("Product added to cart!");
      toogleCart(); // Update cart badge

    } catch (error) {
      toast.error(error.data?.message || "Failed to add product to cart.");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className="product_page">        
        <div className="details_grid">
          <div className="product_img_grid" >
            <img src={product.mainImage} alt="" />
            {product.images.map((item) => (
              <img src={item} alt="" />
            ))}
          </div>
          <div className="product_detail_box" >                
            <div className="product_details">
              <p className="price price__off">NRP.{product.price}.00</p>
              <p className="product__title">{product.title}</p>
              <div className="size__color">
                <p className="sizeeee">Prefer your size:</p>
                <div className="size__flex">
                  <div className="size__">
                    {product.sizes.map((item, index) => (
                      <button
                        key={index}
                        className={`size__option  ${
                          selectedSize === item.size ? "activeSize" : ""
                        }`}
                        onClick={() => setSelectedSize(item.size)}
                      >
                        {item.size}
                      </button>
                    ))}
                  </div>
                  
                </div>
                <p className="model__wearing__size">
                  <span>
                    {product.modelSize}
                  </span>
                </p>
                <p className="size__guideee" onClick={toggleSelectSize}>
                    View Size Guide
                  </p>
              </div>
              <div className="buyNow__cartBtn">
                <button
                  className="cart_btn cart__buy hoverBotton"
                  onClick={handleAddToCart}
                  style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity:loading? '0.5' : '1' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="desktop_decription">
              <div className={`faq-item ${activeIndex === 0 ? "active" : ""}`} onClick={() => toggleHelp(0)} >
                <div className="faq-question">Description </div>
                {activeIndex === 0 && (
                 <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
                )}
              </div>
              <div className={`faq-item ${activeIndex === 1 ? "active" : ""}`} onClick={() => toggleHelp(1)} >
                <div className="faq-question">Fit </div>
                {activeIndex === 1 && (
                  <p>{product?.fit}</p>
                )}
              </div>
              <div className={`faq-item ${activeIndex === 2 ? "active" : ""}`} onClick={() => toggleHelp(2)} >
                <div className="faq-question">Material and Care </div>
                {activeIndex === 2 && (
                  <p>{product?.materialCare}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mobile_decription container">
          <div className={`faq-item ${activeIndex === 0 ? "active" : ""}`} onClick={() => toggleHelp(0)} >
            <div className="faq-question">Description </div>
            {activeIndex === 0 && (
              <p>{product?.description}</p>
            )}
          </div>
          <div className={`faq-item ${activeIndex === 1 ? "active" : ""}`} onClick={() => toggleHelp(1)} >
            <div className="faq-question">Fit </div>
            {activeIndex === 1 && (
              <p>{product?.fit}</p>
            )}
          </div>
          <div className={`faq-item ${activeIndex === 2 ? "active" : ""}`} onClick={() => toggleHelp(2)} >
            <div className="faq-question">Material and Care </div>
            {activeIndex === 2 && (
              <p>{product?.materialCare}</p>
            )}
          </div>
        </div>
        
      </div>
    {selectSize && <div className="size_popup">
        <div className="overlay_popup" onClick={toggleSelectSize}>
          <div className="sizee_des">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Inventore cupiditate tempora fugit recusandae! Iusto quia
              assumenda error quo omnis neque consectetur quas magni reiciendis
              autem officiis labore nulla, eos beatae culpa provident alias nisi
              saepe nobis enim sit voluptatem dicta eum rem. Ex inventore
              laudantium consectetur obcaecati eaque, iusto quidem esse! Hic,
              neque obcaecati corporis totam deserunt velit sint dignissimos
              consequatur tempora quaerat quia libero. Officia magni dignissimos
              aut numquam inventore tempora quos fugit excepturi blanditiis rem
              sit, veritatis ullam, eum ad dicta doloribus ipsam mollitia!
              Laborum perferendis, vero aliquam maiores, dolorum vel possimus
              itaque sit magnam distinctio veniam consequuntur.
            </p>
            <button className="close_btnn" onClick={toggleSelectSize}>
              close
            </button>
          </div>
        </div>
      </div> }
      
    </>
  );
};

export default ProductDetails;
