import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../../shared/form-elements/Button';
import trashIcon from '../../assets/trash__icon.PNG';
import { deleteEducation } from '../../store/actions/profile';

import './Education.css';

const Education = ({ education, deleteEducation, deleteNull }) => {
  return (
    <div className="Education">
      {education.map((edu) => {
        return (
          <Fragment>
            <div className="Education__items">
              {education === null ? null : (
                <Fragment>
                  <div className="Education__keys">
                    <span>
                      <strong>College:</strong>
                    </span>
                    <span>
                      <strong>Degree:</strong>
                    </span>
                    <span>
                      <strong>Field Of Study:</strong>
                    </span>
                  </div>
                  <div className="Education__values">
                    <span>{edu.college}</span>
                    <span>{edu.degree}</span>
                    <span>{edu.fieldofstudy}</span>
                  </div>
                </Fragment>
              )}
              {deleteNull === null ? null : (
                <div className="Education__items__trash-icon">
                  <Button
                    onClick={() => deleteEducation(edu._id)}
                    style={{ border: 'none' }}
                    type="button"
                  >
                    <img src={trashIcon} />
                  </Button>
                </div>
              )}
            </div>
            <hr className="hr" />
          </Fragment>
        );
      })}
    </div>
  );
};

export default connect(null, { deleteEducation })(Education);
