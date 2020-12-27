import Index from "./";
import { getStaticProps } from "./";
import { GetStaticPaths } from "next";
import { openDB } from "../openDB";


export default Index;

export const getStaticPaths: GetStaticPaths<{ currentPage: string }> = async () => {
   const db = await openDB();
   const { total } = await db.get(`SELECT count(*) as total FROM microphone`);
   const numberOgPage = Math.ceil(total / 5.0);  //3

   //new Array
   const paths = Array(numberOgPage).fill("").map((_, index) => {
      return { params: { currentPage: (index + 1).toString() } }
   });
   return {
      fallback: false,
      paths: paths,
   }
}

export { getStaticProps };