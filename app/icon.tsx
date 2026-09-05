import { ImageResponse } from "next/og";
export const size={width:64,height:64};export const contentType="image/png";
export default function Icon(){return new ImageResponse(<div style={{width:64,height:64,borderRadius:16,background:"#111",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,fontWeight:900}}>B</div>,size)}
