import ListCategories from '../ListCategories';
import { Grid, MenuItem, TextField} from '@mui/material';
import './AdminPanel.css';
import { IWatch } from '../Interfaces/IWatch';

export default function ProductComponent(props: IWatch) {

 return(
    <Grid container direction={'column'} spacing={3}>
      <Grid item>
        <TextField
          required
          label="Name"
          variant="outlined"
          value={props.watch.name}
          onChange={e => props.watch.setName(e.target.value)}
          inputProps={{ maxLength: 50 }}
          className="width500"
        />
      </Grid>
      <Grid item>
        <TextField
          required
          label="Price, $"
          variant="outlined"
          value={props.watch.price}
          onChange={e => props.watch.setPrice(Number(e.target.value))}
          type="number"
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          className="width500"
        />
      </Grid>
      <Grid item>
        <TextField
          required
          label="Quantity"
          variant="outlined"
          type="number"
          value={props.watch.quantity}
          onChange={e => props.watch.setQuantity(Number(e.target.value))}
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          className="width500"
        />
      </Grid>
      <Grid item>
        <TextField
          required
          label="Img"
          variant="outlined"
          value={props.watch.imgUrl}
          onChange={e => props.watch.setImgUrl(e.target.value)}
          className="width500"
        />
      </Grid>
      <Grid item>
        <TextField
          required
          select
          label="Select"
          value={props.watch.categoryTypeId}
          onChange={e => props.watch.setCategoryTypeId(e.target.value)}
          helperText="Please select a category"
          className="width500"
        >
          {ListCategories().map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      </Grid>
 );
};
