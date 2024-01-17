
// make dashboard protected page
export {default} from "next-auth/middleware"
export const config ={matcher:["/dashboard"]}