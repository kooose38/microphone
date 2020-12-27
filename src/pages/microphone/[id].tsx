import { GetStaticProps, GetStaticPaths } from "next";
import { Microphone } from "../../../models/microphone";
import { openDB } from "../../openDB";
import { useRouter } from "next/router";

export interface MicropDetailProps {
   microphone?: Microphone,
};

const MicrophoneDetail = ({ microphone }: MicropDetailProps) => {
   const router = useRouter();
   //true
   if (router.isFallback) {
      return (
         <div>...Loading</div>
      )
   }
   return (
      <ul>
         <li>{microphone?.id}</li>
         <li>{microphone?.brand}</li>
         <li>{microphone?.model}</li>
         <li>{microphone?.price}</li>
         <li>{microphone?.imageUrl}</li>
      </ul>
   )
};

export default MicrophoneDetail;


export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
   const db = await openDB();
   const microphones = await db.all<Microphone[]>(`SELECT * FROM microphone`);
   const paths = microphones.map(microphone => {
      return { params: { id: microphone.id.toString() } }
   })
   return {
      fallback: "blocking",
      paths: paths
   }
};

export const getStaticProps: GetStaticProps<MicropDetailProps> = async ({ params }) => {
   const db = await openDB();
   const microphone = await db.get<Microphone>(`SELECT * FROM microphone WHERE id=?`, [params?.id]);

   return {
      props: {
         microphone: microphone,
      }
   }
};