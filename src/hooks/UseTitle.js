import { useEffect } from "react";


export const UseTitle = (title) => {

   useEffect(()=>{

    document.title=`${title}-BookVerse`;
   },[title])

  return null;
}

