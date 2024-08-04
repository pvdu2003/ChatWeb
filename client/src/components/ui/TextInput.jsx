import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function TextInput({
  id,
  name,
  label,
  type,
  autoComplete,
  onChange,
}) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      type={type}
      autoComplete={autoComplete}
      autoFocus
      onChange={onChange}
    />
  );
}
TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string.isRequired,
};
