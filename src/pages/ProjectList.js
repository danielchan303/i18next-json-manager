import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "../component/AppBar";

const ProjectList = () => {
  const i18n = useSelector((state) => state.i18n);
  console.log("i18n", i18n);

  return (
    <>
      <AppBar />
      <main>
        <div className="card">
          <h1>Project List</h1>
          {i18n.map((project) => {
            const ownerId = project.owner;
            const projectId = project._id;
            const projectName = project.projectName;
            return (
              <div>
                <Link to={`/${ownerId}/${projectId}`}>{projectName}</Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default ProjectList;
