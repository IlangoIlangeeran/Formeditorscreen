import React, { useState } from 'react';

const FormEditor = () => {
  // State to store dynamic form fields
  const [fields, setFields] = useState([]);

  // Add new field to the form
  const addField = (fieldType) => {
    const newField = {
      id: Date.now(),
      type: fieldType,
      label: '',
      options: [],
    };
    setFields([...fields, newField]);
  };

  // Update field label
  const updateLabel = (id, label) => {
    setFields(fields.map(field => field.id === id ? { ...field, label } : field));
  };

  // Update field options (for select dropdowns)
  const updateOptions = (id, options) => {
    setFields(fields.map(field => field.id === id ? { ...field, options: options.split(',') } : field));
  };

  // Remove field from form
  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Form Editor</h2>
      
      {/* Buttons to Add New Fields */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => addField('text')}>Add Text Field</button>
        <button style={styles.button} onClick={() => addField('textarea')}>Add Textarea</button>
        <button style={styles.button} onClick={() => addField('number')}>Add Number Field</button>
        <button style={styles.button} onClick={() => addField('select')}>Add Select Dropdown</button>
      </div>

      {/* Display Added Fields */}
      <div style={{ marginTop: '20px' }}>
        {fields.map((field) => (
          <div key={field.id} style={styles.fieldContainer}>
            <div style={styles.field}>
              <label style={styles.label}>Label: </label>
              <input
                type="text"
                style={styles.input}
                placeholder="Enter field label"
                value={field.label}
                onChange={(e) => updateLabel(field.id, e.target.value)}
              />
            </div>

            {/* Render different types of fields */}
            {field.type === 'text' && (
              <div style={styles.field}>
                <label style={styles.label}>{field.label || 'Text Input'}</label>
                <input type="text" style={styles.input} placeholder="Text input" disabled />
              </div>
            )}

            {field.type === 'textarea' && (
              <div style={styles.field}>
                <label style={styles.label}>{field.label || 'Textarea'}</label>
                <textarea style={styles.textarea} placeholder="Textarea" disabled></textarea>
              </div>
            )}

            {field.type === 'number' && (
              <div style={styles.field}>
                <label style={styles.label}>{field.label || 'Number Input'}</label>
                <input type="number" style={styles.input} placeholder="Number input" disabled />
              </div>
            )}

            {field.type === 'select' && (
              <div style={styles.field}>
                <label style={styles.label}>{field.label || 'Select Dropdown'}</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter options, comma separated"
                  onChange={(e) => updateOptions(field.id, e.target.value)}
                />
                <select style={styles.select} disabled>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Remove Field Button */}
            <button style={styles.removeButton} onClick={() => removeField(field.id)}>
              Remove Field
            </button>
          </div>
        ))}
      </div>

      {/* Preview Form */}
      <h3 style={styles.previewHeading}>Form Preview</h3>
      <form style={styles.form}>
        {fields.map((field) => (
          <div key={field.id} style={styles.previewField}>
            <label style={styles.label}>{field.label}</label>
            {field.type === 'text' && <input type="text" style={styles.input} />}
            {field.type === 'textarea' && <textarea style={styles.textarea} rows="3"></textarea>}
            {field.type === 'number' && <input type="number" style={styles.input} />}
            {field.type === 'select' && (
              <select style={styles.select}>
                {field.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit" style={styles.submitButton}>Submit Form</button>
      </form>
    </div>
  );
};

export default FormEditor;

// Inline CSS styles
const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  fieldContainer: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  field: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  removeButton: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  previewHeading: {
    marginTop: '40px',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    padding: '20px',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
  },
  previewField: {
    marginBottom: '20px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
