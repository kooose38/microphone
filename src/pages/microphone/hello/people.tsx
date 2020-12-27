import { GetServerSideProps } from "next";
import Link from "next/link";

export interface peopleProps {
   names: string[],
}

const People = ({ names }: peopleProps) => {
   return (
      <div>
         <Link href="/microphone/hello">
            <a>index</a>
         </Link>
         {
            names?.map((n, i) =>
               <h2 key={i.toString()}>{n}</h2>
            )
         }
      </div>
   )
};

export default People;

export const getServerSideProps: GetServerSideProps<peopleProps> = async (ctx) => {
   return {
      props: {
         names: ["taro", "ziro"]
      }
   }
};