import { Microphone } from "../../../../models/microphone";
import { GetServerSideProps, NextPageContext } from "next";
import { openDB } from "../../../openDB";
import Link from "next/link";

export interface HelloIndexProps {
   microphones?: Microphone[],
}

const HelloIndex = ({ microphones }: HelloIndexProps) => {
   return (
      <div>
         <Link href="/microphone/hello/people">
            <a>people</a>
         </Link>
         <pre>{JSON.stringify(microphones, null, 4)}</pre>
      </div>
   )
};

export default HelloIndex;

export const getServerSideProps: GetServerSideProps<HelloIndexProps> = async (ctx: NextPageContext) => {
   const db = await openDB();
   const microphones = await db.all<Microphone[]>(`SELECT * FROM microphone`);

   await new Promise(acc => {
      setTimeout(acc, 3000);
   });

   return {
      props: {
         microphones: microphones
      }
   }
};