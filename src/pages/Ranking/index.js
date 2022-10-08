import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultAvatar from "~/assets/images/DefaultAvatar.svg"

const Ranking = () => {
  const [rankList, setRankList] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/user/ranking').then(res => {
      if(res.status === 200){
        setRankList(res.data)
        setLoading(false)
      }
    })
  },[])
  if(loading){
    return <div></div>
  }

  return(
    <div className="flex items-center justify-center w-screen bg-gradient-to-r from-[#3EADCF] to-[#ABE9CD]" 
    style={{ height: "calc(100vh - 60px)"}} >
      <div className="w-3/5 h-[90%] px-[50px] bg-[#f4f8fb] rounded-md pt-5">
        <div className="grid grid-cols-12 gap-x-5 ">
          <div className="col-span-4 flex flex-col items-center justify-center bg-white rounded-md"
            style={{boxShadow: "0 2px 8px 0 rgb(0,0 ,0, 0.05)"}}
            >
              <div className="relative">
                <img className="py-12" width={80} src={DefaultAvatar} alt="" />
                <div className="w-[30px] h-[30px] rounded-[50%] bg-[#ffe49b] flex justify-center items-center
                text-[#e0ae69] font-bold absolute top-[100px] left-[60px]"
                >1st</div>
              </div>
              <div className="text-xl font-semibold">{rankList[0].fullname}</div>
              <div className="mt-3 mb-10 bg-[#eef7f6] text-xl font-semibold w-3/5 h-[40px] flex
                justify-center items-center rounded-[30px] text-[#51d2de]"
              >{ rankList[0].total_point }</div>
          </div>

          <div className="col-span-4 flex flex-col items-center justify-center bg-white rounded-md"
            style={{boxShadow: "0 2px 8px 0 rgb(0,0 ,0, 0.05)"}}
            >
              <div className="relative">
                <img className="py-12" width={80} src={DefaultAvatar} alt="" />
                <div className="w-[30px] h-[30px] rounded-[50%] bg-[#cad3d8] flex justify-center items-center
                text-[#929ca1] font-bold absolute top-[100px] left-[60px]"
                >2nd</div>
              </div>
              <div className="text-xl font-semibold">{rankList[1].fullname}</div>
              <div className="mt-3 mb-10 bg-[#eef7f6] text-xl font-semibold w-3/5 h-[40px] flex
                justify-center items-center rounded-[30px] text-[#51d2de]"
              >{ rankList[1].total_point}</div>
          </div>

          <div className="col-span-4 flex flex-col items-center justify-center bg-white rounded-md"
            style={{boxShadow: "0 2px 8px 0 rgb(0,0 ,0, 0.05)"}}
            >
              <div className="relative">
                <img className="py-12" width={80} src={DefaultAvatar} alt="" />
                <div className="w-[30px] h-[30px] rounded-[50%] bg-[#e2b290] flex justify-center items-center
                text-[#db884c] font-bold absolute top-[100px] left-[60px]"
                >3rd</div>
              </div>
              <div className="text-xl font-semibold">{rankList[2].fullname}</div>
              <div className="mt-3 mb-10 bg-[#eef7f6] text-xl font-semibold w-3/5 h-[40px] flex
                justify-center items-center rounded-[30px] text-[#51d2de]"
              >{ rankList[2].total_point }</div>
          </div>
        </div>
        <div className="h-[250px] flex flex-col gap-y-2 mt-3 overflow-y-scroll">
          {rankList.slice(4).map((item, index) => (
            <div className="py-4 pr-12 flex items-center justify-between bg-white" style={{boxShadow: "0 2px 8px 0 rgb(0,0 ,0, 0.05)"}}>
              <div className="flex items-center">
                <span className="text-base font-semibold px-4">{ index + 4}</span>
                <img src={DefaultAvatar} alt=""></img>
                <span className="text-base font-semibold px-8">{item.fullname}</span>
              </div>
              <div className="bg-[#eef7f6] text-xl font-semibold w-1/5 h-[40px] flex
              justify-center items-center rounded-[30px] text-[#51d2de]"
              >{item.total_point}</div>
            </div>
          ))}
        </div>  
      </div>
    </div>
  )
}

export default Ranking