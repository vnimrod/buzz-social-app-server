import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../../../shared/form-elements/Input';
import Button from '../../../shared/form-elements/Button';
import { addEducation } from '../../../store/actions/profile';
import './AddEducation.css';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    college: '',
    degree: '',
    fieldofstudy: '',
  });

  const { college, degree, fieldofstudy } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history, true)
  };

  return (
    <form className="AddEducation" onSubmit={onSubmit}>
      <span className="AddEducation__add-span">Add Your Education</span>
      <div className="AddEducation__Input">
        <small>College</small>
        <Input
          id="college"
          element="input"
          type="text"
          value={college}
          onChange={onChange}
          placeholder="College"
        />
        <small>Degree</small>
        <Input
          id="degree"
          element="input"
          type="text"
          value={degree}
          onChange={onChange}
          placeholder="Degree"
        />
        <small>Field Of Study</small>
        <Input
          id="fieldofstudy"
          element="input"
          type="text"
          value={fieldofstudy}
          onChange={onChange}
          placeholder="Field Of Study"
        />
        <div className="AddEducation__input__bottom-buttons">
          <Button type="submit">Add Education</Button>
          <Button button="button" to="/profile">
            Back to Profile
          </Button>
        </div>
      </div>
    </form>
  );
};

export default connect(null, { addEducation })(AddEducation);
