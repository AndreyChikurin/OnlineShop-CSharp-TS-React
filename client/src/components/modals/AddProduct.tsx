import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import { NewProduct } from 'src/models/Product';
import { Service } from 'src/Service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styles } from './Styles';
import './AdminPanel.css';
import ProductComponent from './ProductComponent';
import { IAddButton } from '../Interfaces/IAddButtons';
import AddButton from './Buttons/AddButton';

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const service: Service = new Service();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [categoryTypeId, setCategoryTypeId] = useState('');

  const watch={
    name: name,
    price: price,
    imgUrl: imgUrl,
    quantity: quantity,
    categoryTypeId: categoryTypeId,
    setName: setName,
    setPrice: setPrice,
    setImgUrl: setImgUrl,
    setQuantity: setQuantity,
    setCategoryTypeId: setCategoryTypeId,
  }

  const newProduct = new NewProduct(name, price, imgUrl, quantity, categoryTypeId);
  const buttonText:IAddButton = {text:"Add a product"};

  return (
    <div>
      <AddButton store={buttonText} handleClick={handleOpen}/>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...styles }}>
          <form onSubmit={async () => await service.saveProduct(newProduct)}>
            <br />
            <Typography gutterBottom variant="h5" component="div">
              Add a product
            </Typography>
            <ProductComponent
              watch={watch}
            />
            <Grid container direction={'column'} spacing={3}>
              <Grid item>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
            <Box className="saveButton">
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
