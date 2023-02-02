import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Border from "../../Utilities/Border";
import "./GenerateResume.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function GenerateResume() {
  const navigate = useNavigate();

  let [personalDetails, setPersonalDetails] = useState({});
  let [educationDetails, setEducationDetails] = useState([]);
  let [skillsDetails, setSkillsDetails] = useState([]);
  let [workExperienceDetails, setWorkExperienceDetails] = useState([]);
  let [projectsDetails, setProjectsDetails] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("details")) {
      var resumeDetails = JSON.parse(localStorage.getItem("details"));
      // personal details
      if (
        JSON.stringify(personalDetails) !==
        JSON.stringify(resumeDetails["personalDetails"])
      ) {
        setPersonalDetails(resumeDetails["personalDetails"]);
      }
      // educational details
      if (
        JSON.stringify(educationDetails) !==
        JSON.stringify(resumeDetails["education"])
      ) {
        setEducationDetails(resumeDetails["education"]);
      }
      // skills details
      if (
        JSON.stringify(skillsDetails) !==
        JSON.stringify(resumeDetails["skills"])
      ) {
        setSkillsDetails(resumeDetails["skills"]);
      }
      // work experience details
      if (
        JSON.stringify(workExperienceDetails) !==
        JSON.stringify(resumeDetails["workExperience"])
      ) {
        setWorkExperienceDetails(resumeDetails["workExperience"]);
        console.log(workExperienceDetails);
      }
      // project details
      if (
        JSON.stringify(projectsDetails) !==
        JSON.stringify(resumeDetails["projects"])
      ) {
        setProjectsDetails(resumeDetails["projects"]);
      }
    } else {
      navigate("/");
    }
  });

  // format the date printed on resume
  function formatDate(dateString) {
    if (dateString) {
      let date = dateString?.split("-");
      const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };
      let year = date[0];
      let month = months[date[1]];
      return `${month} ${year}`;
    }
    return "";
  }

  // download the resume in pdf format
  function downloadResume() {
    const input = document.getElementById("my-resume");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight+55);
      pdf.save(`${personalDetails.name}_Resume.pdf`);
    });
  }

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center vw-50 mb-5">
      {/* HEADER SECTION WITH APP NAME AND DOWNLOAD BUTTON */}
      <div className="d-flex flex-column mb-3 align-items-center">
        <p className="fs-2 mb-0">Resume Builder</p>
        <p className="fs-6 mb-0 fst-italic">
          *Resume generated with the details provided on the previous screen
        </p>
        <div className="d-flex">
          <button className="btn btn-primary" onClick={() => downloadResume()}>
            Download Resume
          </button>
        </div>
      </div>

      {/* ACTUAL RESUME DISPLAYED */}
      <div className="col-lg-7 col-sm-10 col-7 border rounded-2 border-dark">
        <div className="py-2 px-4" id="my-resume">
          {/* PERSONAL DETAILS SECTION */}
          <p className="fs-2 mb-1 fw-semibold text-center name">
            {personalDetails["name"] || "NAME"}
          </p>
          <div className="d-flex justify-content-center content">
            <p>{personalDetails["address"] || "address"}</p>
            <p>&nbsp;|&nbsp;</p>
            {personalDetails["email"] ? (
              <a className="primary" role="button">
                {personalDetails["email"]}
              </a>
            ) : (
              <p>{"email"}</p>
            )}
            <p>&nbsp;|&nbsp;</p>
            <p>{personalDetails["contactNumber"] || "phone number"}</p>
          </div>

          {/* EDUCATION DETAILS SECTION */}
          <div>
            <p className="fw-semibold text-uppercase mb-0">Education</p>
            <Border />
            {educationDetails?.map((education) => {
              return (
                <div className="d-flex justify-content-between mb-1">
                  <div>
                    <p className="fw-semibold mb-0">
                      {education.universityName}
                    </p>
                    <p className="fst-italic mb-0">
                      &nbsp; &nbsp;{education.level} in {education.courseName}
                    </p>
                  </div>
                  <div>
                    <p className="fst-italic mb-0">
                      {formatDate(education.endDate)}
                    </p>
                    <p className="fst-italic mb-0">
                      <span className="fw-bold">GPA: </span>
                      {education.gpa}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SKILLS DETAILS SECTION */}
          <div className="pt-3">
            <p className="fw-semibold text-uppercase mb-0">Skills</p>
            <Border />
            <table>
              <tbody>
                {skillsDetails?.map((skill) => {
                  return (
                    <tr>
                      <td className="fw-semibold mb-0">
                        {skill.skillLabel}: &nbsp;{" "}
                      </td>
                      <td className="mb-0">{skill.skillSet}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* WORK EXPERIENCE SECTION */}
          <div className="pt-3">
            <p className="fw-semibold text-uppercase mb-0">Work Experience</p>
            <Border />
            {workExperienceDetails?.map((workExp) => {
              return (
                <div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="fw-semibold mb-0">{workExp.companyName}</p>
                      <p className="fst-italic mb-0">{workExp.role}</p>
                    </div>
                    <div className="fst-italic">
                      <p
                        className={`mb-0 ${
                          !workExp.isCurrentEmployer ? "dates" : ""
                        }`}
                      >
                        {formatDate(workExp.startDate)} -{" "}
                        {workExp.isCurrentEmployer
                          ? "Present"
                          : formatDate(workExp.endDate)}
                      </p>
                      <p className="mb-0">{workExp.location}</p>
                    </div>
                  </div>
                  <ul className="mb-1">
                    {workExp.description?.split("\n").map((x) => {
                      return <li>{x}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* PROJECTS SECTION */}
          {projectsDetails?.length ? (
            <div className="pt-3">
              <p className="fw-semibold text-uppercase mb-0">Projects</p>
              <Border />
              {projectsDetails?.map((project) => {
                return (
                  <div>
                    <div>
                      <p className="fw-semibold mb-0">{project.projectName}</p>
                      {/* <p className="fst-italic mb-0">{workExp.role}</p> */}
                    </div>

                    <ul className="mb-1">
                      {project.description?.split("\n").map((x) => {
                        return <li>{x}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default GenerateResume;
