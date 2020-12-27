import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Microphone } from "../../models/microphone";

interface CardProps {
   microphone: Microphone,
};

const CardMicrphone = ({ microphone }: CardProps) => {
   return (
      <Card>
         <CardActionArea>
            <CardMedia
               component="img"
               alt={microphone.brand}
               height="200"
               image={microphone.imageUrl}
               title={microphone.model}
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                  {microphone.model + " " + microphone.brand}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
          </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   )
};

export default CardMicrphone;