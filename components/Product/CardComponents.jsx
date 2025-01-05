import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Image from 'next/image';

const getLuminance = (hex) => {
  hex = hex.replace('#', '');
  
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export default function CardComponents({ product }) {
  const randomBgColor = `${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  const randomTextColor = getLuminance(randomBgColor) > 0.5 ? '000000' : 'FFFFFF'; 

  const imageUrl = `https://placehold.co/600x400/${randomBgColor}/${randomTextColor}?text=${product.name}`;

  const handleAddToCart = () => {
    // addToCart(product);
  };

  const handleViewDetails = () => {
    // window.location.href = `/product/${product.id}`;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <div style={{ position: 'relative', height: '140px' }}>
          <Image
            src={imageUrl}
            alt={product.name || 'Product Image'}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" style={{ color: `#${randomTextColor}` }}>
            {product.name}
          </Typography>
          <Typography variant="body2" style={{ color: `#${randomTextColor}` }}>
            {product.description}
          </Typography>
          <div className="flex justify-between gap-2 mt-2">
            <Typography variant="h6" color="primary">
              ${product.price}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {product.category}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleViewDetails}>
          View Details
        </Button>
        <Button size="small" color="secondary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
