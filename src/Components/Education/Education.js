import { Component } from "react";

class Education extends Component {
  // educationDetails = [];
  details = {};
  constructor(props) {
    super(props);
    if (this.props.details.length) {
      this.state = {
        educationCount: this.props.details.length,
        educationDetails: this.props.details,
      };
    } else {
      this.state = {
        educationCount: 1,
        educationDetails: [],
      };
    }
    this.clearDetails();
  }

  clearDetails() {
    this.details = {
      universityName: null,
      level: null,
      courseName: null,
      startDate: null,
      endDate: null,
      gpa: null,
      courses: null,
    };
  }

  addAnotherForm() {
    let count = this.state.educationCount;
    count += 1;
    this.setState({
      educationCount: count,
    });
    this.clearDetails();
  }

  onInputChange(fieldName, inputVal, i = -1) {
    const educationDetails = this.state.educationDetails;
    if (i > -1 && educationDetails[i]) {
      this.details = { ...educationDetails[i] };
    } else {
      this.clearDetails();
    }
    this.details[fieldName] = inputVal;
    if (
      educationDetails.length &&
      this.state.educationCount == educationDetails.length
    ) {
      educationDetails.splice(i, 1, this.details);
    } else {
      educationDetails.push({ ...this.details });
    }
    this.setState({
      educationDetails,
    });
    this.props.onEducationDetailsChange(this.state.educationDetails);
  }

  render() {
    return (
      <div className="accordion col-9 mb-3" id="educationSection">
        {/* ACCORDIAN ITEM */}
        <div className="accordion-item">
          {/* ACCORDIAN HEADER */}
          <h2 className="accordion-header" id="educationHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#education"
              aria-expanded={this.props.isOpen}
              aria-controls="education"
            >
              Education Details
            </button>
          </h2>
          {/* ACCORDIAN BODY */}
          <div
            id="education"
            className={`accordion-collapse collapse ${
              this.props.isOpen ? "show" : ""
            }`}
            aria-labelledby="educationHeading"
            data-bs-parent="#educationSection"
          >
            <div className="accordion-body">
              {/* Form */}
              {[...Array(this.state.educationCount)].map((e, i) => {
                return (
                  <div className="border p-3 rounded  mb-3" key={i}>
                    {/* University Name */}
                    <div className="row mb-3">
                      <label className="form-label col-2">
                        {" "}
                        University Name
                      </label>
                      <div className="col-9">
                        <input
                          className="form-control col-4"
                          type="text"
                          value={this.state.educationDetails[i]?.universityName}
                          onChange={(event) => {
                            this.onInputChange(
                              "universityName",
                              event.target.value,
                              i
                            );
                          }}
                        />
                      </div>
                    </div>

                    {/* Level and course name */}
                    <div className="d-flex mb-3">
                      <div className="row col-4 me-2">
                        <label className="form-label col-6"> Level</label>
                        <div className="col-6">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.educationDetails[i]?.level}
                            onChange={(event) =>
                              this.onInputChange("level", event.target.value, i)
                            }
                          />
                        </div>
                      </div>
                      <div className="row col-6">
                        <label className="form-label col-4"> Course Name</label>
                        <div className="col-7">
                          <input
                            className="form-control col-4"
                            type="text"
                            value={this.state.educationDetails[i]?.courseName}
                            onChange={(event) =>
                              this.onInputChange(
                                "courseName",
                                event.target.value,
                                i
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* start date */}
                    <div className="row mb-3">
                      <label className="form-label col-2"> Start Date</label>
                      <div className="col-3">
                        <input
                          className="form-control"
                          type="month"
                          value={this.state.educationDetails[i]?.startDate}
                          onChange={(event) =>
                            this.onInputChange(
                              "startDate",
                              event.target.value,
                              i
                            )
                          }
                        />
                      </div>
                    </div>
                    {/* end date */}
                    <div className="row mb-3">
                      <label className="form-label col-2"> End Date</label>
                      <div className="col-3">
                        <input
                          className="form-control"
                          type="month"
                          value={this.state.educationDetails[i]?.endDate}
                          onChange={(event) =>
                            this.onInputChange("endDate", event.target.value, i)
                          }
                        />
                      </div>
                    </div>
                    {/* gpa */}
                    <div className="row mb-3">
                      <label className="form-label col-2">GPA</label>
                      <div className="col-2">
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.educationDetails[i]?.gpa}
                          onChange={(event) =>
                            this.onInputChange("gpa", event.target.value, i)
                          }
                        />
                      </div>
                    </div>
                    {/* courses */}
                    <div className="row mb-3">
                      <label className="form-label col-2">Courses</label>
                      <div className="col-9">
                        <textarea
                          className="form-control col-4"
                          type="text"
                          placeholder="Enter ',' (comma) separated courses you studied"
                          value={this.state.educationDetails[i]?.courses}
                          onChange={(event) =>
                            this.onInputChange("courses", event.target.value, i)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                className="btn btn-primary"
                onClick={() => this.addAnotherForm()}
              >
                Add Education
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Education;
