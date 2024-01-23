import React, { useState } from "react";
import "../stylesheet/pages.css";
import { BsTrash3Fill } from "react-icons/bs";
import {GoBell} from "react-icons/go"

const Notify = ({ datas }) => {
 

  const [activeButton, setActiveButton] = useState("all");
  //  const { data, isLoading } = useGetHook("member/get/all/notifications");


  //  const { handlePost } = usePostHook();
  //  const onSuccess = () => {
  //    toast.success('Announcement added successfully')
  //  }
  //  const handleSubmit = async (id) => {
  //   const endpoint = `admin/read/notification?notification_id=${id}`;
  //    handlePost(endpoint, `Application/json`, onSuccess)
  //  };

      
   

  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   if (data?.data) {
  //     setNotifications(data.data);
  //   }
  // }, [data]);

  const notifications =[]
  
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="notify">
      <div className="not">
        <div className="notify_head">
          <div className="notify_left">
            <button
              onClick={() => handleButtonClick("all")}
              className={activeButton === "all" ? "active" : ""}
            >
              All <span>0</span>
            </button>
            <button
              onClick={() => handleButtonClick("unread")}
              className={activeButton === "unread" ? "active" : ""}
            >
              Unread
            </button>
          </div>
          <button className="mark">Mark all as read</button>
        </div>

            {notifications.length > 0 ? (
          <div className="notify_body"> {
              
              notifications.map((item, index) => (
               <div
              
               key={item.id}
               className={`notification ${
                 (activeButton === "unread" && item.status === "Unread") ||
                 (activeButton === "all" && item.status === "Unread")
                   ? "unread-notification"
                   : "all-notification"
               }`}
             >
              <span><GoBell /></span>
                <div>                  
                  <div >
                    <h3>
                    {item.body} <span>{item.title}</span>
                  </h3>
                  <p>{item.created_at} ago</p>
                  </div><BsTrash3Fill />
                </div>
               
              </div>
            ))} </div>): (
              <div className="notify_body">
              <p>No Notification</p>
              </div>
            )}
           
          </div>
        
     
    </div>
  );
};

export default Notify;
