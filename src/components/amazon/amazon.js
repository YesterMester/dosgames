import React from 'react';
import { Tile, Button, Grid, Column } from '@carbon/react';
import { Link } from 'gatsby';

const AmazonProductComponent = ({ product }) => {

  const handleBuyNowClick = () => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Amazon Products',
        event_label: product.title,
        value: product.buyLink,
      });
    }
  };

  return (
    <Tile className="amazon-product-tile">
      <Grid>
        {/* <Column lg={4} sm={4} md={4} xlg={4}>
          <Link to={product.buyLink} target='_blank' onClick={handleBuyNowClick}>
            <img src={product.image} alt={product.title} className="amazon-product-image" />
          </Link>
        </Column> */}
        <Column lg={12} sm={4} md={4} xlg={12}>
          <h4>{product.title}</h4>
          <p>{product.description}</p>
          <div className="amazon-product-buttons">
            <Button kind="primary" href={product.buyLink} target="_blank" style={{ marginRight: '1rem' }} onClick={handleBuyNowClick}>
              Buy Now
            </Button>
            <Button kind="secondary" href={product.readMoreLink}>
              Read More
            </Button>
          </div>
        </Column>
      </Grid>
    </Tile>
  );
};

export default AmazonProductComponent;