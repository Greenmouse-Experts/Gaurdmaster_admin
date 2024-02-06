import React from "react";
import { BiLogoGmail } from "react-icons/bi";
import {
  FaPhoneAlt,
  FaAddressBook,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";
import profile from "../../assets/user.png";
import { FaXTwitter } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { getSingleStudents } from "../../services/api/usersApi";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";

const Studentdetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getStudentDetails"],
    queryFn: () => getSingleStudents(id),
  });
  return (
    <div className="profile_left stu_det">
      <h2>Student Details</h2>
      {isLoading ? (
        <div className="flex justify-center py-12">
      <ClipLoader
        color={'#173c88'}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
      ) : (
        <>
          <div className="profile_head">
            <img src={data?.picture ? data?.picture : profile} alt="" />
            <div>
              <h3>{`${data?.firstName} ${data?.lastName}`}</h3>
              <div>
                {data?.isActive ? (
                  <div className="flex items-center gap-x-2">
                    <span className="bg-green-600 w-4 h-4 circle"></span>{" "}
                    <span className="fw-500 text-green-600">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    <span className="bg-orange-600 w-4 h-4 circle"></span>{" "}
                    <span className="fw-500 text-orange-600">Inactive</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="profile_body">
            <div>
              <span>
                <BiLogoGmail />
              </span>{" "}
              <div className="prof_card">
                <label htmlFor="email">Email</label>
                <h3>{data?.email}</h3>
              </div>
            </div>
            <div>
              <span>
                <FaPhoneAlt />
              </span>
              <div className="prof_card">
                <label htmlFor="phone">Phone</label>
                <h3>{data?.phone}</h3>
              </div>
            </div>
            <div>
              <span>
                <FaAddressBook />
              </span>
              <div className="prof_card">
                <label htmlFor="register">Address</label>
                <h3>{data?.address ? data?.address : "N/A"}</h3>
              </div>
            </div>
            <div>
              <span>
                <FaLinkedinIn />
              </span>
              <div className="prof_card">
                <label htmlFor="register">Linkedin</label>
                <h3>
                  {data?.linkedinUrl ? (
                    <a
                      href={data?.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  ) : (
                    "N/A"
                  )}
                </h3>
              </div>
            </div>
            <div>
              <span>
                <FaFacebookF />
              </span>
              <div className="prof_card">
                <label htmlFor="register">Facebook</label>
                <h3>
                  {data?.facebookUrl ? (
                    <a
                      href={data?.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  ) : (
                    "N/A"
                  )}
                </h3>
              </div>
            </div>
            <div>
              <span>
                <FaXTwitter />
              </span>
              <div className="prof_card">
                <label htmlFor="register">Twitter</label>
                <h3>
                  {data?.twitterUrl ? (
                    <a
                      href={data?.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  ) : (
                    "N/A"
                  )}
                </h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Studentdetails;
