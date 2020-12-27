import { Microphone } from "../../models/microphone";
import { GetStaticProps, NextPageContext } from "next";
import { openDB } from "../openDB";
import Link from "next/link";
import CardMicrphone from "../components/CardMicrphone";
import { Grid } from "@material-ui/core";

export interface IndexProps {
   microphones?: Microphone[],
};

const Index = ({ microphones }: IndexProps) => {
   return (
      <Grid container spacing={3}>
         {
            microphones?.map(microphone =>
               <Grid key={microphone.id} container item xs={12} sm={4} spacing={3}>
                  <Link href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
                     <a>
                        <CardMicrphone microphone={microphone} />
                     </a>
                  </Link>
               </Grid>
            )
         }
      </Grid>
   )
};

export default Index;

interface MyNextPageContext extends NextPageContext {
   params: {
      currentPage: string,
   }
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({ params }: MyNextPageContext) => {
   const currentPage = params?.currentPage as string;
   const currentPageNumber = +(parseInt(currentPage, 10) || 0) as number;

   const min = currentPageNumber * 5;
   const max = (currentPageNumber + 1) * 5;

   const db = await openDB();
   const microphones = await db.all<Microphone[]>(
      `SELECT * FROM microphone WHERE id > ? AND id <= ? `,
      min,
      max
   );

   return {
      props: {
         microphones: microphones
      }
   }
};