import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
const read=(p)=>Object.fromEntries(fs.readFileSync(p,"utf8").split(/\r?\n/).map(x=>x.match(/^([A-Z0-9_]+)=(.*)$/)).filter(Boolean).map(x=>[x[1],x[2]]));
const pub=read("C:/tmp/pnr-023l-remote-application-and-hosted-proof/.env.local");
const sec=read("C:/tmp/pnr-023l-remote-application-and-hosted-proof/.env.test.local");
if(new URL(pub.NEXT_PUBLIC_SUPABASE_URL).hostname!=="uvskssaecdhxcgytkasc.supabase.co") throw new Error("TARGET_REFUSED");
const client=createClient(pub.NEXT_PUBLIC_SUPABASE_URL,sec.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const users=await client.auth.admin.listUsers({page:1,perPage:1000}); if(users.error) throw new Error("AUTH_QUERY_FAILED");
const auth=users.data.users.filter(x=>String(x.email||"").includes("031-field-20260729-01")).length;
const checks=await Promise.all([
  client.from("users").select("id",{head:true,count:"exact"}).ilike("email","%031-field-20260729-01%"),
  client.from("stables").select("id",{head:true,count:"exact"}).ilike("name","%031-FIELD-20260729-01%"),
  client.from("horses").select("id",{head:true,count:"exact"}).ilike("name","%031-FIELD-20260729-01%")
]);
if(checks.some(x=>x.error)) throw new Error("APPLICATION_QUERY_FAILED");
const application=checks.reduce((n,x)=>n+(x.count||0),0);
const objects=await client.storage.from("test-evidence").list("",{search:"031-FIELD-20260729-01",limit:100}); if(objects.error) throw new Error("STORAGE_QUERY_FAILED");
const storage=objects.data.length;
pub.NEXT_PUBLIC_SUPABASE_URL=null;pub.NEXT_PUBLIC_SUPABASE_ANON_KEY=null;sec.SUPABASE_SERVICE_ROLE_KEY=null;
console.log(JSON.stringify({run:"031-FIELD-20260729-01",auth,application,storage,final:[auth,application,storage],cleared:true}));
if(auth||application||storage) process.exit(2);
