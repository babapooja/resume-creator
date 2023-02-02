import React, { Component } from "react";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import Education from "../Education/Education";
import WorkExperience from "../WorkExperience/WorkExperience";
import Skills from "../Skills/Skills";
import Projects from "../Projects/Projects";
import { useNavigate } from "react-router-dom";

class ResumeBuilder extends Component {
  resumeDetails = {};
  constructor(props) {
    super(props);
    this.state = { isExpandAll: true };
    this.navigate = this.props.navigate;
    this.initialize();
  }

  initialize() {
    if (localStorage.getItem("details")) {
      this.resumeDetails = JSON.parse(localStorage.getItem("details"));
    } else {
      this.resumeDetails = {
        personalDetails: {},
        education: [],
        skills: {},
        workExperience: [],
        projects: [],
      };
    }
  }

  updateResumeDetails(key, value) {
    this.resumeDetails[key] = value;
  }

  // expand collapse all button
  collapseExpand() {
    this.setState({
      isExpandAll: !this.state.isExpandAll,
    });
  }

  // Build Resume button
  buildResume() {
    localStorage.setItem("details", JSON.stringify(this.resumeDetails));
    this.navigate("/build-resume");
  }

  render() {
    return (
      <div className="container d-flex flex-column align-items-center mt-3">
        <div className="d-flex flex-column mb-3 align-items-center">
          <p className="fs-2 mb-0">Resume Builder</p>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary me-3"
              onClick={() => this.collapseExpand()}
            >
              {this.state.isExpandAll == true ? "Collapse" : "Expand"} All
              Sections
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.buildResume()}
            >
              Build Resume
            </button>
          </div>
        </div>
        <PersonalDetails
          details={this.resumeDetails.personalDetails}
          onPersonalDetailsChange={(value) =>
            this.updateResumeDetails("personalDetails", value)
          }
          isOpen={this.state.isExpandAll}
        />
        <Education
          details={this.resumeDetails.education}
          onEducationDetailsChange={(value) =>
            this.updateResumeDetails("education", value)
          }
          isOpen={this.state.isExpandAll}
        />
        <Skills
          details={this.resumeDetails.skills}
          onSkillsChange={(value) => this.updateResumeDetails("skills", value)}
          isOpen={this.state.isExpandAll}
        />
        <WorkExperience
          details={this.resumeDetails.workExperience}
          onWorkExperienceChange={(value) =>
            this.updateResumeDetails("workExperience", value)
          }
          isOpen={this.state.isExpandAll}
        />
        <Projects
          details={this.resumeDetails.projects}
          onProjectsChange={(value) =>
            this.updateResumeDetails("projects", value)
          }
          isOpen={this.state.isExpandAll}
        />
      </div>
    );
  }
}

export default function (props) {
  const navigate = useNavigate();
  return <ResumeBuilder {...props} navigate={navigate} />;
}
